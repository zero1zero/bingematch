import auth.JwtConfig
import cache.Cache
import cache.RedisCache
import catalog.Catalog
import catalog.MetadataSource
import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.module.SimpleModule
import com.google.protobuf.GeneratedMessageV3
import com.google.protobuf.Message
import com.google.protobuf.MessageOrBuilder
import com.google.protobuf.TypeRegistry
import com.google.protobuf.util.JsonFormat
import etc.PasswordUtil
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.auth.jwt.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.jackson.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.pipeline.*
import org.junit.platform.engine.discovery.DiscoverySelectors.selectClass
import org.junit.platform.launcher.core.LauncherDiscoveryRequestBuilder
import org.junit.platform.launcher.core.LauncherFactory
import org.junit.platform.launcher.listeners.SummaryGeneratingListener
import queue.Queue
import queue.Queues
import routing.queue
import routing.user
import store.AWSUtil
import store.UserStore
import test.ApplicationTest
import test.RedisCacheTest
import java.io.PrintWriter
import java.text.DateFormat
import kotlin.reflect.KClass

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
    val queue = Queues(catalog)

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
                    .selectors(
                        selectClass(ApplicationTest::class.java),
                        selectClass(RedisCacheTest::class.java)
                    )
                    .build()
                val launcher = LauncherFactory.create()
                launcher.discover(request)
                launcher.registerTestExecutionListeners(listener)
                launcher.execute(request)

                val summary = listener.summary

                summary.printTo(PrintWriter(System.out))

                //all good!
                call.respond(HttpStatusCode.Accepted)
            }
        }

        install(ContentNegotiation) {
            jackson {
                enable(SerializationFeature.INDENT_OUTPUT)
                dateFormat = DateFormat.getDateInstance()

                val module = SimpleModule()
                val messages : Set<KClass<out Message>> = setOf(
                    Queue.AllItems::class
                )

                messages.forEach { clazz ->
                    module.addSerializer(clazz.java, ProtoSerializer())
                    module.addDeserializer(clazz.java, ProtoDeserializer(clazz.java))
                }
                registerModule(module)
            }
        }

        //all users stuff
        user(storage)
        queue(queue)
    }
}

class ProtoSerializer : JsonSerializer<Message>() {

    override fun serialize(value: Message, gen: JsonGenerator, serializers: SerializerProvider) {
        JsonFormat.printer().print(value)
    }
}

class ProtoDeserializer<T>(val clazz : Class<out Message>) : JsonDeserializer<T>() {

    val parser = JsonFormat.parser()

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): T {
        val message : Message.Builder = clazz.getDeclaredConstructor().newInstance()
            .toBuilder()

            parser.merge(p.text, message)

        return message.build() as T
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

