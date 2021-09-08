import auth.JwtConfig
import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.databind.node.ArrayNode
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
import queue.Queue
import routing.etc.SharedSqlSession
import routing.lists
import routing.show
import routing.user
import show.Show
import test.PostgresTest
import user.User
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
    }

    install(SharedSqlSession) {
        db = deps.database()
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
                    UserIdPrincipal(it)
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

                call.respond(HttpStatusCode.Accepted)
            }
        }
        route("/startup") {
            get("/") {

                PostgresTest(deps.database()).connect()

                //all good!
                call.respond(HttpStatusCode.Accepted)
            }
        }

        @Suppress("UNCHECKED_CAST")
        install(ContentNegotiation) {
            register(ContentType.Application.Json, JacksonConverter(objectMapper.apply {
//                enable(SerializationFeature.INDENT_OUTPUT)
                dateFormat = DateFormat.getDateInstance()

                val module = SimpleModule()

                val messages : List<Class<out Message>> = setOf(
                    User::class,
                    Queue::class,
                    Show::class,
                ).stream().flatMap {
                    it.java.declaredClasses.asList().stream()
                        .filter { innerClass ->
                            !innerClass.name.endsWith("Builder")
                        }
                }.map { it as Class<out Message> }
                    .toList()

                messages.forEach { clazz ->
                    module.addSerializer(clazz, ProtoSerializer())
                    module.addDeserializer(clazz, ProtoDeserializer(clazz))

                }

                //anything that is in list form
//                module.addDeserializer(List::class.java, ListProtoDeserializer<Show.Genre>(Show.Genre::class.java))

                registerModule(module)
            }))
        }

        //register routing
        user(deps.userStore())
        lists(deps.lists(), deps.queues())
        show(deps.catalog(), deps.genres())
    }
}

@Suppress("UNCHECKED_CAST")
class ListProtoDeserializer<T>(private val clazz : Class<out Message>) : StdDeserializer<List<T>>(List::class.java) {

    private val parser = JsonFormat.parser()

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): List<T> {

        val node = p.readValueAsTree<ArrayNode>()

        return node.map {
            val message : Message.Builder = clazz.getMethod("newBuilder").invoke(null) as Message.Builder
            parser.merge(it.toString(), message)
            message.build()
        }.toList() as List<T>
    }
}

class ProtoSerializer : JsonSerializer<Message>() {

    private val printer = JsonFormat.printer()
        .includingDefaultValueFields()
        .omittingInsignificantWhitespace()
        .printingEnumsAsInts()

    override fun serialize(value: Message, gen: JsonGenerator, serializers: SerializerProvider) {
        gen.writeRawValue(printer.print(value))
    }
}

@Suppress("UNCHECKED_CAST")
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

