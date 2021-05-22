package routing

import TestDeps
import UserTestUtil
import catalog.tmdbIdToInternalId
import io.ktor.http.*
import io.ktor.server.testing.*
import module
import objectMapper
import org.junit.BeforeClass
import org.junit.Test
import queue.Queue
import show.Show
import kotlin.test.assertEquals

class QueueTest {

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
        withTestApplication({ module(TestDeps()) }) {

            handleRequest(HttpMethod.Get, "/queue") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
                val queued = objectMapper.readValue(response.content, Queue.QueuedItems::class.java)

                assertEquals(40, queued.itemsCount)
            }
        }
    }
}
