import auth.JwtConfig
import catalog.CatalogStore
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.databind.exc.InvalidFormatException
import com.fasterxml.jackson.databind.exc.ValueInstantiationException
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import io.ktor.application.*
import io.ktor.auth.Authentication
import io.ktor.auth.UserIdPrincipal
import io.ktor.auth.jwt.jwt
import io.ktor.auth.principal
import io.ktor.features.CORS
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.StatusPages
import io.ktor.http.ContentType
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.jackson.JacksonConverter
import io.ktor.response.respond
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.routing.route
import io.ktor.routing.routing
import routing.user
import store.AWSUtil
import store.UserStore

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
fun Application.module() {

    //dependencies
    val passwordUtil = PasswordUtil()
    val awsUtil = AWSUtil()
    val storage = UserStore(passwordUtil, awsUtil.ddb)
    val metadata = MetadataSource()
    val catalog = CatalogStore(metadata)

    environment.monitor.subscribe(ApplicationStarted){
        println("LET'S ROCKKKKK")
    }
    environment.monitor.subscribe(ApplicationStopped){
        println("Game over, man")
        catalog.close()
    }

    install(Authentication) {
        /**
         * Setup the JWT authentication to be used in [Routing].
         * If the token is valid, the corresponding [User] is fetched from the database.
         * The [User] can then be accessed in each [ApplicationCall].
         */
        jwt {
            verifier(JwtConfig.verifier)
            realm = "bingematch.com"
            validate { it ->
                it.payload.getClaim("id").asString().let {
                    UserIdPrincipal(storage.getUser(it).getOrThrow().id)
                }
            }
        }
    }

    install(CORS) {
        host("localhost:3000")
        host("bingematch.com")
        header("Authorization")
        method(HttpMethod.Options)
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        allowNonSimpleContentTypes = true
    }

    install(CallLogging) {
        filter { call ->
            println(call.request.headers)
            true
        }
    }

    install(StatusPages) {
        exception<ValueInstantiationException> { cause ->
            call.respond(HttpStatusCode.BadRequest, cause.originalMessage)
        }

        exception<InvalidFormatException> { cause ->
            call.respond(HttpStatusCode.BadRequest, cause.originalMessage)
        }
    }

    install(ContentNegotiation) {
        register(ContentType.Application.Json, JacksonConverter(objectMapper.apply {
            enable(SerializationFeature.INDENT_OUTPUT)
            registerModule(JavaTimeModule())

            val module = SimpleModule()
            registerModule(module)
        }))
    }

    routing {
        route("/test") {
            get("/") {
                call.respond(HttpStatusCode.Accepted)
            }
        }

        //all users stuff
        user(storage)

    }
}

suspend fun principalNoMatch(userId: String, call: ApplicationCall): Boolean {

    val principal = call.principal<UserIdPrincipal>()

    if (principal == null || principal.name != userId) {
        call.respond(HttpStatusCode.Forbidden)
        return true
    }

    return false
}

data class UserWToken(
    @JsonProperty("user") val user: User,
    @JsonProperty("token") val token: String
)

val objectMapper = ObjectMapper()

