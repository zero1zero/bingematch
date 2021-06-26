package routing

import TestDeps
import UserTestUtil
import catalog.Type
import catalog.tmdbIdToInternalId
import io.ktor.http.*
import io.ktor.server.testing.*
import module
import objectMapper
import org.junit.BeforeClass
import org.junit.Test
import show.Show
import kotlin.test.assertEquals

class ShowsTest {

    companion object {

        private lateinit var userUtil: UserTestUtil

        @BeforeClass
        @JvmStatic
        fun setup() {
            userUtil = UserTestUtil()
        }
    }

    @Test
    fun testGetShow() {
        //mortal kombat
        val id = tmdbIdToInternalId(9312, Type.Movie)

        withTestApplication({ module(TestDeps()) }) {

            handleRequest(HttpMethod.Get, "/show/$id") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
                val show = objectMapper.readValue(response.content, Show.Detail::class.java)

                assertEquals(id, show.id)
                assertEquals(show.title, "Mortal Kombat")
            }
        }
    }
}
