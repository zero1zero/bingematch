package test

import db.DataSource
import db.Database
import org.junit.Test
import kotlin.test.assertEquals

class PostgresTest {

    @Test
    fun connect() {
        val database = Database(DataSource())
        val session = database.newSession()

        session.select("select 1") { result ->
            assertEquals(result.resultCount, 1)
        }
    }
}