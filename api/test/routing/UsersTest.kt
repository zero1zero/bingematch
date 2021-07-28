package routing

import TestDeps
import UseTestApp
import UseTestApp.Companion.userUtil
import io.ktor.http.*
import io.ktor.server.testing.*
import module
import objectMapper
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import user.User

@ExtendWith(UseTestApp::class)
class UsersTest {

    @Test
    fun testLogin() {
        withTestApplication({ module(TestDeps()) }) {

            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                val login = User.Login.newBuilder()
                    .setEmail(userUtil.login.email)
                    .setPassword("a wrong password")
                    .build()

                setBody(objectMapper.writeValueAsString(login))
            }.apply {
                assertEquals(HttpStatusCode.Forbidden, response.status())
            }

            //unauthorized api call
            handleRequest(HttpMethod.Get, "/user/${userUtil.getTestUser().id}") {} //no auth
                .apply {
                    assertEquals(HttpStatusCode.Unauthorized, response.status())
                }

            //login user
            val login = User.Login.newBuilder()
                .setEmail(userUtil.login.email)
                .setPassword(userUtil.login.password)
                .build()
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(login))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())

                val token = response.content!!

                //get user
                handleRequest(HttpMethod.Get, "/user/${userUtil.getTestUser().id}") {
                    addHeader(HttpHeaders.Authorization, "Bearer $token")
                }
                    .apply {
                        assertEquals(HttpStatusCode.OK, response.status())
                        val user1 = objectMapper.readValue(response.content, User.Detail::class.java)

                        assertEquals(userUtil.getTestUser().id, user1.id)
                    }
            }
        }
    }

    @Test
    fun updateUser() {

        withTestApplication({ module(TestDeps()) }) {

            val updateUser = User.Update.newBuilder()
                .setEmail(userUtil.login.email)
                .build()

            handleRequest(HttpMethod.Put, "/user/${userUtil.getTestUser().id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${UseTestApp.token()}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(updateUser))
            }
                .apply {
                    assertEquals(HttpStatusCode.OK, response.status())
                }

            handleRequest(HttpMethod.Get, "/user/${userUtil.getTestUser().id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${UseTestApp.token()}")
            }
                .apply {
                    assertEquals(HttpStatusCode.OK, response.status())

                    val user1 = objectMapper.readValue(response.content, User.Detail::class.java)

                    assertEquals(userUtil.getTestUser().id, user1.id)

                }
        }
    }

    @Test
    fun updatePassword() {

        withTestApplication({ module(TestDeps()) }) {

            val updateUser = User.Update.newBuilder()
                .setEmail(userUtil.login.email)
                .setPassword("hello there")
                .build()

            handleRequest(HttpMethod.Put, "/user/${userUtil.getTestUser().id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${UseTestApp.token()}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(updateUser))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }

            //login test test new pw
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                val login = User.Login.newBuilder()
                    .setEmail(userUtil.login.email)
                    .setPassword("hello there")
                    .build()
                
                setBody(objectMapper.writeValueAsString(login))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }

            //switch password back for cleanup
            handleRequest(HttpMethod.Put, "/user/${userUtil.getTestUser().id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${UseTestApp.token()}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                
                val updated = User.Update.newBuilder()
                    .setEmail(userUtil.login.email)
                    .setPassword(userUtil.login.password)
                    .build()

                setBody(objectMapper.writeValueAsString(updated))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }
        }
    }

    @Test
    fun userGenres() {
        withTestApplication({ module(TestDeps()) }) {

            handleRequest(HttpMethod.Get, "/user/${userUtil.getTestUser().id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${UseTestApp.token()}")
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())

                val user1 = objectMapper.readValue(response.content, User.Detail::class.java)

                assertTrue(user1.genresCount > 0)
            }
        }
    }

}