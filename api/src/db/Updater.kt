package db

import kotlinx.coroutines.runBlocking
import liquibase.Contexts
import liquibase.LabelExpression
import liquibase.Liquibase
import liquibase.database.DatabaseFactory
import liquibase.database.jvm.JdbcConnection
import liquibase.exception.LiquibaseException
import liquibase.resource.ClassLoaderResourceAccessor
import org.slf4j.LoggerFactory
import java.sql.Connection
import java.sql.SQLException
import java.util.concurrent.CompletableFuture
import java.util.concurrent.Executors

open class Updater(val dataSource: DataSource) {

    open fun update() {
        runBlocking {
            val database = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(JdbcConnection(dataSource.connection))
            val liquibase = Liquibase("/changelog.sql", ClassLoaderResourceAccessor(), database)

            liquibase.update(Contexts(), LabelExpression())
        }
    }
}