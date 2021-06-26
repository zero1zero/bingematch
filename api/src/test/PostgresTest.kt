package test

import ProdDataSource
import db.Database
import org.junit.Test
import kotlin.test.assertEquals

class PostgresTest {

    @Test
    fun connect() {
        val database = Database(ProdDataSource())
        val session = database.newSession()

        session.select("select 1") { result ->
            assertEquals(result.resultCount, 1)
        }
    }
}