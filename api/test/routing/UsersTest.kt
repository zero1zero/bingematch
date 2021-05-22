package routing

import Dependencies
import TestDeps
import UserTestUtil
import auth.JwtConfig
import cache.Cache
import cache.InMemoryCache
import catalog.Catalog
import catalog.MetadataSource
import etc.PasswordUtil
import io.ktor.http.*
import io.ktor.server.testing.*
import module
import objectMapper
import org.junit.Assert.assertEquals
import org.junit.Assert.fail
import org.junit.BeforeClass
import org.junit.Test
import queue.Queues
import store.AWSUtil
import store.UserStore
import user.User
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit


class UsersTest {

    companion object {

        private lateinit var userUtil : UserTestUtil

        @BeforeClass @JvmStatic
        fun setup() {
            userUtil = UserTestUtil()
        }
    }

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
                kotlin.test.assertEquals(HttpStatusCode.Forbidden, response.status())
            }

            //unauthorized api call
            handleRequest(HttpMethod.Get, "/user/${userUtil.getTestUser().id}") {} //no auth
                .apply {
                    kotlin.test.assertEquals(HttpStatusCode.Unauthorized, response.status())
                }

            val token: String

            //login user
            val login = User.Login.newBuilder()
                .setEmail(userUtil.login.email)
                .setPassword(userUtil.login.password)
                .build()
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(login))
            }.apply {
                kotlin.test.assertEquals(HttpStatusCode.OK, response.status())

                token = response.content!!
            }

            //get user
            handleRequest(HttpMethod.Get, "/user/${userUtil.getTestUser().id}") {
                addHeader(HttpHeaders.Authorization, "Bearer : $token")
            }
                .apply {
                    kotlin.test.assertEquals(HttpStatusCode.OK, response.status())
                    val user1 = objectMapper.readValue(response.content, User.Detail::class.java)

                    kotlin.test.assertEquals(userUtil.getTestUser().id, user1.id)
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
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(userUtil.getTestUser())}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(updateUser))
            }
                .apply {
                    kotlin.test.assertEquals(HttpStatusCode.OK, response.status())
                }

            handleRequest(HttpMethod.Get, "/user/${userUtil.getTestUser().id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(userUtil.getTestUser())}")
            }
                .apply {
                    kotlin.test.assertEquals(HttpStatusCode.OK, response.status())

                    val user1 = objectMapper.readValue(response.content, User.Detail::class.java)

                    kotlin.test.assertEquals(userUtil.getTestUser().id, user1.id)

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
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(userUtil.getTestUser())}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(updateUser))
            }.apply {
                kotlin.test.assertEquals(HttpStatusCode.OK, response.status())
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
                kotlin.test.assertEquals(HttpStatusCode.OK, response.status())
            }

            //switch password back for cleanup
            handleRequest(HttpMethod.Put, "/user/${userUtil.getTestUser().id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(userUtil.getTestUser())}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                
                val updated = User.Update.newBuilder()
                    .setEmail(userUtil.login.email)
                    .setPassword(userUtil.login.password)
                    .build()

                setBody(objectMapper.writeValueAsString(updated))
            }.apply {
                kotlin.test.assertEquals(HttpStatusCode.OK, response.status())
            }
        }
    }

}