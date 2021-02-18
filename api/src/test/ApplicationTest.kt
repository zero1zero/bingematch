package test

import auth.JwtConfig
import io.ktor.http.*
import io.ktor.server.testing.*
import module
import objectMapper
import org.junit.Assert.assertEquals
import org.junit.Assert.fail
import org.junit.BeforeClass
import org.junit.Test
import user.User
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit

class ApplicationTest {

    private lateinit var user : User.Detail

    private val testRegister = User.Login.newBuilder()
        .setEmail("api-testing@bingematch.com")
        .setPassword("horse battery staple login")
        .build()

    @BeforeClass
    fun setup() {
        withTestApplication({ module() }) {

            val latch = CountDownLatch(1)

            //make sure there isnt an existing user. login and delete them if so
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(User.Login.newBuilder()
                    .setEmail(testRegister.email)
                    .setPassword(testRegister.password)
                    .build()))
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

    @Test
    fun testLogin() {
        withTestApplication({ module() }) {

            //failed login!
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(User.Login.newBuilder()
                    .setEmail(testRegister.email)
                    .setPassword("a wrong password")
                    .build()))
            }.apply {
                assertEquals(HttpStatusCode.Forbidden, response.status())
            }

            //unauthorized api call
            handleRequest(HttpMethod.Get, "/user/${user.id}") {} //no auth
                .apply {
                    assertEquals(HttpStatusCode.Unauthorized, response.status())
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
                assertEquals(HttpStatusCode.OK, response.status())

                token = response.content!!
            }

            //get user
            handleRequest(HttpMethod.Get, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer : $token")
            }
                .apply {
                    assertEquals(HttpStatusCode.OK, response.status())
                    val user1 = objectMapper.readValue(response.content, User.Detail::class.java)

                    assertEquals(user.id, user1.id)
                }
        }
    }

    //todo when we add another field, update it
    @Test
    fun updateUser() {

        withTestApplication({ module() }) {

            val updateUser = User.Detail.newBuilder()
                .setEmail(user.email)

            handleRequest(HttpMethod.Put, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(updateUser))
            }
                .apply {
                    assertEquals(HttpStatusCode.OK, response.status())
                }

            handleRequest(HttpMethod.Get, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
            }
                .apply {
                    assertEquals(HttpStatusCode.OK, response.status())

                    val user1 = objectMapper.readValue(response.content, User.Detail::class.java)

                    assertEquals(user.id, user1.id)
//                    assertEquals(updateUser.phone, user1.phone)

                    //also verify that we have an updated phone
//                    assertEquals(updateUser.phone, user1.phone)

                }
        }
    }

    @Test
    fun updatePassword() {

        withTestApplication({ module() }) {

            val updateUser = User.Update.newBuilder()
                .setEmail(user.email)
                .setPassword("hello there")
                .build()

            handleRequest(HttpMethod.Put, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(updateUser))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }

            //login test test new pw
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(User.Login.newBuilder()
                    .setEmail(user.email)
                    .setPassword("hello there")
                    .build()))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }

            //switch password back for cleanup
            handleRequest(HttpMethod.Put, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(User.Update.newBuilder()
                    .setEmail(user.email)
                    .setPassword(testRegister.password)
                    .build()))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }
        }
    }

    @Test
    fun getQueue() {

//        Fuel.get("localhost:5000")
//            .header(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
//            .header(HttpHeaders.ContentType, ContentType.Application.Json.toString())
//
//        withTestApplication({ module() }) {

//            val updateUser = User.UpdateUser(user.email, "5039843253", "hello there")
//
//            handleRequest(HttpMethod.Put, "/user/${user.id}") {
//                addHeader()
//                addHeader()
//
//                setBody(objectMapper.writeValueAsString(updateUser))
//            }.apply {
//                assertEquals(HttpStatusCode.OK, response.status())
//            }
//        }
    }
}
