import auth.JwtConfig
import db.Database
import org.junit.jupiter.api.extension.BeforeAllCallback
import org.junit.jupiter.api.extension.ExtensionContext
import org.junit.jupiter.api.extension.ExtensionContext.Store.CloseableResource
import org.slf4j.LoggerFactory
import kotlin.test.assertEquals

class UseTestApp: BeforeAllCallback, CloseableResource {

    private val log = LoggerFactory.getLogger(UseTestApp::class.java)

    companion object {
        private var started = false
        val userUtil: UserTestUtil = UserTestUtil()

        fun token(): String {
            return JwtConfig.makeToken(userUtil.getTestUser())
        }
    }

    override fun beforeAll(context: ExtensionContext) {
        if (!started) {
            started = true

            log.info("Starting up test app")

            val database = Database(EmbeddedDataSource())
            val session = database.newSession()
            session.use {
                val statement = session.connection.createStatement()
                val version = statement.executeQuery("select version()")
                version.next()

                //lets just be triple sure we only truncate my local machine
                assertEquals("PostgreSQL 13.3 on x86_64-apple-darwin20.4.0, compiled by Apple clang version 12.0.5 (clang-1205.0.22.9), 64-bit", version.getString(1))

                //clear all tables
                try {
                    statement.execute("truncate table users, catalog_sync, queue")
                } catch (e : Exception) {
                    println(e)
                }
            }


//            io.ktor.server.netty.EngineMain.main()

//            val engine = TestApplicationEngine(createTestEnvironment()) {
//
//            }
//            withTestApplication({ module(TestDeps()) }) {
//
//            }
//
//
//            engine.start()
//            try {
//                return engine.test()
//            } finally {
//                engine.stop(0L, 0L)
//            }
            // Your "before all tests" startup logic goes here
            // The following line registers a callback hook when the root test context is shut down
//            context.root.getStore(ExtensionContext.Namespace.GLOBAL).put("any unique name", this)
        }
    }

    override fun close() {
        // Your "after all tests" logic goes here
//                engine.stop(0L, 0L)
    }
}