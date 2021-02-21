import user.User

import auth.JwtConfig
import cache.Cache
import cache.InMemoryCache
import com.fasterxml.jackson.databind.ObjectMapper
import io.ktor.http.*
import io.ktor.server.testing.*
import module
import org.junit.Assert.assertEquals
import org.junit.Assert.fail
import org.junit.BeforeClass
import org.junit.Test
import queue.Queues
import store.UserStore
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit

class TestDeps : ProdDeps() {
    val cache = InMemoryCache()

    override fun cache(): Cache {
        return cache
    }

}

class ApplicationTest {


    companion object {
        private lateinit var user : User.Detail

        private val testRegister = User.Login.newBuilder()
            .setEmail("api-testing@bingematch.com")
            .setPassword("horse battery staple login")
            .build()

        @BeforeClass @JvmStatic
        fun setup() {
            withTestApplication({ module(TestDeps()) }) {

                val latch = CountDownLatch(1)

                //make sure there isnt an existing user. login and delete them if so
                handleRequest(HttpMethod.Post, "/user/login") {
                    addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                    val login = User.Login.newBuilder()
                            .setEmail(testRegister.email)
                            .setPassword(testRegister.password)
                            .build()

                    setBody(objectMapper.writeValueAsString(login))
                }.apply {
                    if (response.status() == HttpStatusCode.Forbidden) {
                        latch.countDown()
                        return@apply //user doesnt exist
                    }
                    val token = response.content
                    val verify = JwtConfig.verifier.verify(token)

                    println("Cleaning up existing test user...")

                    //cleanup user
                    handleRequest(HttpMethod.Delete, "/user/${verify.getClaim("id").asString()}") {
                        addHeader(HttpHeaders.Authorization, "Bearer $token")
                        addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                    }.apply {
                        assertEquals(HttpStatusCode.Accepted, response.status())

                        latch.countDown()
                    }
                }

                latch.await(5000, TimeUnit.SECONDS)

                //create user
                handleRequest(HttpMethod.Post, "/user") {
                    addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                    setBody(objectMapper.writeValueAsString(testRegister))
                }.apply {
                    if (response.content == "user-exists") {
                        fail("user-exists during attempt to create, something is wrong with the test flow")
                    }
                    val userwtoken = objectMapper.readValue(response.content, User.DetailAndToken::class.java)
                    user = userwtoken.detail
                }
            }
        }
    }

    @Test
    fun testLogin() {
        withTestApplication({ module(TestDeps()) }) {

//            failed login!
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                val login = User.Login.newBuilder()
                    .setEmail(testRegister.email)
                    .setPassword("a wrong password")
                    .build()

                setBody(objectMapper.writeValueAsString(login))
            }.apply {
                kotlin.test.assertEquals(HttpStatusCode.Forbidden, response.status())
            }

            //unauthorized api call
            handleRequest(HttpMethod.Get, "/user/${user.id}") {} //no auth
                .apply {
                    kotlin.test.assertEquals(HttpStatusCode.Unauthorized, response.status())
                }

            val token: String

            //login user
            val login = User.Login.newBuilder()
                .setEmail(testRegister.email)
                .setPassword(testRegister.password)
                .build()
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(login))
            }.apply {
                kotlin.test.assertEquals(HttpStatusCode.OK, response.status())

                token = response.content!!
            }

            //get user
            handleRequest(HttpMethod.Get, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer : $token")
            }
                .apply {
                    kotlin.test.assertEquals(HttpStatusCode.OK, response.status())
                    val user1 = objectMapper.readValue(response.content, User.Detail::class.java)

                    kotlin.test.assertEquals(user.id, user1.id)
                }
        }
    }

    @Test
    fun updateUser() {

        withTestApplication({ module(TestDeps()) }) {

            val updateUser = User.Update.newBuilder()
                .setEmail(user.email)
                .build()

            handleRequest(HttpMethod.Put, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(updateUser))
            }
                .apply {
                    kotlin.test.assertEquals(HttpStatusCode.OK, response.status())
                }

            handleRequest(HttpMethod.Get, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
            }
                .apply {
                    kotlin.test.assertEquals(HttpStatusCode.OK, response.status())

                    val user1 = objectMapper.readValue(response.content, User.Detail::class.java)

                    kotlin.test.assertEquals(user.id, user1.id)

                }
        }
    }

    @Test
    fun updatePassword() {

        withTestApplication({ module(TestDeps()) }) {

            val updateUser = User.Update.newBuilder()
                .setEmail(user.email)
                .setPassword("hello there")
                .build()

            handleRequest(HttpMethod.Put, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(updateUser))
            }.apply {
                kotlin.test.assertEquals(HttpStatusCode.OK, response.status())
            }

            //login test test new pw
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                val login = User.Login.newBuilder()
                    .setEmail(user.email)
                    .setPassword("hello there")
                    .build()
                
                setBody(objectMapper.writeValueAsString(login))
            }.apply {
                kotlin.test.assertEquals(HttpStatusCode.OK, response.status())
            }

            //switch password back for cleanup
            handleRequest(HttpMethod.Put, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                
                val updateUser = User.Update.newBuilder()
                    .setEmail(user.email)
                    .setPassword(testRegister.password)
                    .build()

                setBody(objectMapper.writeValueAsString(updateUser))
            }.apply {
                kotlin.test.assertEquals(HttpStatusCode.OK, response.status())
            }
        }
    }
}