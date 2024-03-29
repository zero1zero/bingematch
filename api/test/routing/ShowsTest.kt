package routing

import TestDeps
import UseTestApp
import catalog.Type
import catalog.tmdbIdToInternalId
import io.ktor.http.*
import io.ktor.server.testing.*
import module
import objectMapper
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import show.Show
import user.User
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@ExtendWith(UseTestApp::class)
class ShowsTest {

    val showsType = objectMapper.typeFactory.constructCollectionType(List::class.java, Show.Detail::class.java)

    @Test
    fun testGetShow() {
        //mortal kombat
        val gend = tmdbIdToInternalId(9312, Type.Movie)

        withTestApplication({ module(TestDeps()) }) {

            for (id in arrayOf(gend, "prbuqq7yq")) {
                for (i in 1..2) {
                    handleRequest(HttpMethod.Get, "/show/$id") {
                        addHeader(HttpHeaders.Authorization, "Bearer : ${UseTestApp.token()}")
                    }.apply {
                        assertEquals(HttpStatusCode.OK, response.status())
                        val show = objectMapper.readValue(response.content, Show.Detail::class.java)

                        assertEquals(id, show.id)
                    }
                }
            }
        }
    }

    @Test
    fun testGetShows() {
        //mortal kombat
        val gend = tmdbIdToInternalId(9312, Type.Movie)

        withTestApplication({ module(TestDeps()) }) {
            val ids = arrayOf(gend, "r9wf9pr3")
            handleRequest(HttpMethod.Get, "/show?id=${ids.joinToString(separator = ",")}") {
                addHeader(HttpHeaders.Authorization, "Bearer : ${UseTestApp.token()}")
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
                val shows : List<Show.Detail> = objectMapper.readValue(response.content, showsType)

                shows.forEach {
                    assertEquals(gend, it.id)
                }
            }
        }
    }

    @Test
    fun generes() {
        withTestApplication({ module(TestDeps()) }) {

            handleRequest(HttpMethod.Get, "/genres") {
                addHeader(HttpHeaders.Authorization, "Bearer : ${UseTestApp.token()}")
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
                val genres = objectMapper.readValue(response.content, List::class.java) as List<Show.Genre>

                assertTrue(genres.isNotEmpty())
            }
        }
    }
}
