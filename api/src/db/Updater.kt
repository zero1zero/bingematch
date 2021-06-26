package db

import kotlinx.coroutines.runBlocking
import liquibase.Contexts
import liquibase.LabelExpression
import liquibase.Liquibase
import liquibase.database.DatabaseFactory
import liquibase.database.jvm.JdbcConnection
import liquibase.resource.ClassLoaderResourceAccessor
import javax.sql.DataSource

open class Updater(private val dataSource: DataSource) {

    open fun update() {
        runBlocking {
            val database = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(JdbcConnection(dataSource.connection))
            val liquibase = Liquibase("/changelog.sql", ClassLoaderResourceAccessor(), database)

            liquibase.update(Contexts(), LabelExpression())
        }
    }
}