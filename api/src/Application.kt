import auth.JwtConfig
import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.databind.node.ObjectNode
import com.google.protobuf.Message
import com.google.protobuf.util.JsonFormat
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.auth.jwt.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.jackson.*
import io.ktor.response.*
import io.ktor.routing.*
import org.junit.platform.engine.discovery.DiscoverySelectors.selectClass
import org.junit.platform.launcher.core.LauncherDiscoveryRequestBuilder
import org.junit.platform.launcher.core.LauncherFactory
import org.junit.platform.launcher.listeners.SummaryGeneratingListener
import queue.Queue
import routing.queue
import routing.show
import routing.user
import show.Show
import test.PostgresTest
import test.RedisCacheTest
import user.User
import java.io.PrintWriter
import java.text.DateFormat
import kotlin.streams.toList

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

val objectMapper = ObjectMapper()

@Suppress("unused") // Referenced in application.conf
fun Application.module(deps : Dependencies = ProdDeps()) {
    environment.monitor.subscribe(ApplicationStarted){
        println("LET'S ROCKKKKK")
    }
    environment.monitor.subscribe(ApplicationStopped){
        println("Game over, man")
        deps.cache().close()
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
                    UserIdPrincipal(deps.userStore().getUser(it).getOrThrow().id)
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

    val listener = SummaryGeneratingListener()
    val request = LauncherDiscoveryRequestBuilder.request()
        .selectors(
            selectClass(RedisCacheTest::class.java),
            selectClass(PostgresTest::class.java)
        )
        .build()
    val launcher = LauncherFactory.create()
    launcher.discover(request)
    launcher.registerTestExecutionListeners(listener)
    launcher.execute(request)

    val summary = listener.summary

    summary.printTo(PrintWriter(System.out))

    //update our stuff
    deps.updater().update()

    routing {
        route("/ready") {
            get("/") {
                call.respond(HttpStatusCode.Accepted)
            }
        }
        route("/update") {
            get("/") {

                //update our stuff
                deps.updater().update()
            }
        }
        route("/startup") {
            get("/") {
                if (listener.summary.failures.size > 0) {
                    call.respond(HttpStatusCode.InternalServerError)
                }

                //all good!
                call.respond(HttpStatusCode.Accepted)
            }
        }

        install(ContentNegotiation) {
            register(ContentType.Application.Json, JacksonConverter(objectMapper.apply {
                enable(SerializationFeature.INDENT_OUTPUT)
                dateFormat = DateFormat.getDateInstance()

                val module = SimpleModule()

                val messages : List<Class<out Message>> = setOf(
                    User::class,
                    Queue::class,
                    Show::class
                ).stream().flatMap {
                    it.java.declaredClasses.asList().stream()
                }.map { it as Class<out Message> }
                    .toList()

                messages.forEach { clazz ->
                    module.addSerializer(clazz, ProtoSerializer())
                    module.addDeserializer(clazz, ProtoDeserializer(clazz))
                }
                registerModule(module)
            }))
        }

        //all users stuff
        user(deps.userStore())
        queue(deps.queues())
        show(deps.catalog())
    }
}

class ProtoSerializer : JsonSerializer<Message>() {

    private val printer = JsonFormat.printer()

    override fun serialize(value: Message, gen: JsonGenerator, serializers: SerializerProvider) {
        gen.writeRawValue(printer.print(value))
    }
}

class ProtoDeserializer<T>(private val clazz : Class<out Message>) : StdDeserializer<T>(clazz) {

    private val parser = JsonFormat.parser()

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): T {
        val message : Message.Builder = clazz.getMethod("newBuilder").invoke(null) as Message.Builder

        val node = p.readValueAsTree<ObjectNode>()

        parser.merge(node.toString(), message)

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

