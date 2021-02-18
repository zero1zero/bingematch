import auth.JwtConfig
import cache.Cache
import cache.RedisCache
import catalog.Catalog
import catalog.MetadataSource
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.databind.exc.InvalidFormatException
import com.fasterxml.jackson.databind.exc.ValueInstantiationException
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import etc.PasswordUtil
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.auth.jwt.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.jackson.*
import io.ktor.response.*
import io.ktor.routing.*
import org.junit.platform.engine.discovery.DiscoverySelectors.selectPackage
import org.junit.platform.launcher.core.LauncherDiscoveryRequestBuilder
import org.junit.platform.launcher.core.LauncherFactory
import org.junit.platform.launcher.listeners.SummaryGeneratingListener
import routing.user
import store.AWSUtil
import store.UserStore
import java.io.PrintWriter

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
fun Application.module() {

    //dependencies
    val passwordUtil = PasswordUtil()
    val awsUtil = AWSUtil()
    val storage = UserStore(passwordUtil, awsUtil.ddb)
    val metadata = MetadataSource()

    val cache : Cache = RedisCache()
    val catalog = Catalog(metadata, cache)

    environment.monitor.subscribe(ApplicationStarted){
        println("LET'S ROCKKKKK")
    }
    environment.monitor.subscribe(ApplicationStopped){
        println("Game over, man")
        cache.close()
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
        route("/ready") {
            get("/") {
                call.respond(HttpStatusCode.Accepted)
            }
        }
        route("/test") {
            get("/") {

                val listener = SummaryGeneratingListener()
                val request = LauncherDiscoveryRequestBuilder.request()
                    .selectors(selectPackage("test"))
                    .build()
                val launcher = LauncherFactory.create()
                launcher.discover(request)
                launcher.registerTestExecutionListeners(listener);
                launcher.execute(request);

                val summary = listener.summary

                summary.printTo(PrintWriter(System.out))

                //all good!
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

val objectMapper = ObjectMapper()

