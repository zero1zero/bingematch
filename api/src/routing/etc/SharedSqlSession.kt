package routing.etc

import db.Database
import io.ktor.application.*
import io.ktor.util.*
import io.ktor.util.pipeline.*
import org.apache.ibatis.session.SqlSession

class SharedSqlSession (configuration: Configuration) {

    val db : Database = configuration.db!! // Copies a snapshot of the mutable config into an immutable property.

    class Configuration {
        var db : Database? = null
    }

    // Implements ApplicationFeature as a companion object.
    companion object Feature : ApplicationFeature<ApplicationCallPipeline, Configuration, SharedSqlSession> {
        // Creates a unique key for the feature.
        override val key = AttributeKey<SharedSqlSession>("SharedSession")

        val session = AttributeKey<SqlSession>("SqlSession")

        // Code to execute when installing the plugin.
        override fun install(pipeline: ApplicationCallPipeline, configure: Configuration.() -> Unit): SharedSqlSession {

            // It is responsibility of the install code to call the `configure` method with the mutable configuration.
            val configuration = Configuration().apply(configure)

            // Create the plugin, providing the mutable configuration so the plugin reads it keeping an immutable copy of the properties.
            val feature = SharedSqlSession(configuration)

            val openSession = PipelinePhase("OpenSession")
            pipeline.insertPhaseAfter(ApplicationCallPipeline.Setup, openSession)

            val closeSession = PipelinePhase("CloseSession")
            pipeline.insertPhaseAfter(ApplicationCallPipeline.Call, closeSession)


            pipeline.intercept(openSession) {
                //todo only open session if authenticated. make sure to test new user signup when you do
                this.context.attributes.put(session, configuration.db!!.newSession())
            }

            pipeline.intercept(closeSession) {
                this.context.attributes[session].close()
            }
            return feature
        }
    }
}