import auth.JwtConfig
import cache.Cache
import cache.RedisCache
import catalog.Catalog
import catalog.MetadataSource
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
import queue.Queues
import routing.queue
import routing.user
import store.AWSUtil
import store.UserStore
import test.ApplicationTest
import test.RedisCacheTest
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

        //all users stuff
        user(storage)
        queue(queue)
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

