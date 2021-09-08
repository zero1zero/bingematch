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
import user.User
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

@ExtendWith(UseTestApp::class)
class ListsTest {

    val queuedShowType = objectMapper.typeFactory.constructCollectionType(List::class.java, User.QueuedShow::class.java)
    val likedShowType = objectMapper.typeFactory.constructCollectionType(List::class.java, User.LikedShow::class.java)

    @Test
    fun testGetQueue() {
        withTestApplication({ module(TestDeps()) }) {

            handleRequest(HttpMethod.Get, "/lists/queued") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
                val queued : List<User.QueuedShow> = objectMapper.readValue(response.content, queuedShowType)

                assertEquals(10, queued.size)
            }
        }
    }

    @Test
    fun getLikes() {
        withTestApplication({ module(TestDeps()) }) {
            val qres = handleRequest(HttpMethod.Get, "/lists/queued") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }
            assertEquals(HttpStatusCode.OK, qres.response.status())

            val queued : List<User.LikedShow> = objectMapper.readValue(qres.response.content, likedShowType)
            val first = queued.first()

            //update state to swiped
            val sres = handleRequest(HttpMethod.Put, "/lists/like/${first.show}") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }

            assertEquals(HttpStatusCode.Accepted, sres.response.status())

            val likes = handleRequest(HttpMethod.Get, "/lists/liked") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(UseTestApp.userUtil.getTestUser())}")
            }
            val likesQueued : List<User.LikedShow> = objectMapper.readValue(likes.response.content, likedShowType)

            val match = likesQueued.filter {
                it.show == first.show
            }

            //has at least one like that matches the one we liked
            assertTrue(match.isNotEmpty())
        }
    }
}
