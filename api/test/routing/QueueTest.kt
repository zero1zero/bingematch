package routing

import TestDeps
import UseTestApp
import auth.JwtConfig
import io.ktor.http.*
import io.ktor.server.testing.*
import module
import objectMapper
import org.junit.Assert.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import queue.Queue
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

@ExtendWith(UseTestApp::class)
class QueueTest {

    @Test
    fun testGetShow() {
        withTestApplication({ module(TestDeps()) }) {

            handleRequest(HttpMethod.Get, "/queue") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
                val queued = objectMapper.readValue(response.content, Queue.QueuedItems::class.java)

                assertTrue(queued.itemsCount > 30)
            }
        }
    }

    @Test
    fun getLikes() {
        withTestApplication({ module(TestDeps()) }) {
            val qres = handleRequest(HttpMethod.Get, "/queue") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }
            assertEquals(HttpStatusCode.OK, qres.response.status())

            val queued = objectMapper.readValue(qres.response.content, Queue.QueuedItems::class.java)
            val first = queued.itemsList.first()

            //update state to swiped
            val sres = handleRequest(HttpMethod.Put, "/queue/set/${first.id}/${Queue.QueueItemState.Liked_VALUE}") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }

            assertEquals(HttpStatusCode.Accepted, sres.response.status())

            val likes = handleRequest(HttpMethod.Get, "/queue/likes") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }
            val likesQueued = objectMapper.readValue(likes.response.content, Queue.QueuedItems::class.java)

            val match = likesQueued.itemsList.filter {
                it.id == first.id
            }

            //has at least one like that matches the one we liked
            assertTrue(match.isNotEmpty())
        }
    }

    @Test
    fun setState() {
        withTestApplication({ module(TestDeps()) }) {
            val qres = handleRequest(HttpMethod.Get, "/queue") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }
            assertEquals(HttpStatusCode.OK, qres.response.status())

            val queued = objectMapper.readValue(qres.response.content, Queue.QueuedItems::class.java)
            val first = queued.itemsList.first()

            //update state to swiped
            val sres = handleRequest(HttpMethod.Put, "/queue/set/${first.id}/${Queue.QueueItemState.Liked_VALUE}") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }

            assertEquals(HttpStatusCode.Accepted, sres.response.status())

            //lets verify that that swiped item isnt in the list anymore
            val qres2 = handleRequest(HttpMethod.Get, "/queue") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }
            val queued2 = objectMapper.readValue(qres2.response.content, Queue.QueuedItems::class.java)
            val first2 = queued2.itemsList.first()
            assertEquals(HttpStatusCode.OK, qres2.response.status())
            assertNotEquals(first2.id, first.id)
        }
    }
}
