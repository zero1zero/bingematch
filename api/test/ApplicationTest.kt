import Login
import Register
import UpdateUser
import User
import UserWToken
import auth.JwtConfig
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.handleRequest
import io.ktor.server.testing.setBody
import io.ktor.server.testing.withTestApplication
import module
import objectMapper
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import kotlin.test.*


class ApplicationTest {

    private lateinit var user : User

    private val testRegister = Register("api-testing@bingematch.com", "horse battery staple login")

    @BeforeTest
    fun setup() {
        withTestApplication({ module() }) {

            val latch = CountDownLatch(1)

            //make sure there isnt an existing user. login and delete them if so
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(Login(testRegister.email, testRegister.password)))
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
                val userwtoken = objectMapper.readValue(response.content, UserWToken::class.java)
                user = userwtoken.user
            }
        }
    }

    @Test
    fun testLogin() {
        withTestApplication({ module() }) {

            //failed login!
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(Login(testRegister.email, "a wrong password")))
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
            val login = Login(testRegister.email, testRegister.password)
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
                    val user1 = objectMapper.readValue(response.content, User::class.java)

                    assertEquals(user.id, user1.id)
                }
        }
    }

    @Test
    fun updateUser() {

        withTestApplication({ module() }) {

            val updateUser = UpdateUser(user.email, "5039843253")

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

                    val user1 = objectMapper.readValue(response.content, User::class.java)

                    assertEquals(user.id, user1.id)
                    assertEquals(updateUser.phone, user1.phone)

                    //also verify that we have an updated phone
                    assertEquals(updateUser.phone, user1.phone)

                }
        }
    }

    @Test
    fun updatePassword() {

        withTestApplication({ module() }) {

            val updateUser = UpdateUser(user.email, "5039843253", "hello there")

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

                setBody(objectMapper.writeValueAsString(Login(user.email, "hello there")))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }

            //switch password back for cleanup
            handleRequest(HttpMethod.Put, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(UpdateUser(user.email, password = testRegister.password)))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }
        }
    }

//    @Test
//    fun getQueue() {
//
//        withTestApplication({ module() }) {
//
//            val updateUser = UpdateUser(user.email, "5039843253", "hello there")
//
//            handleRequest(HttpMethod.Put, "/user/${user.id}") {
//                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
//                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
//
//                setBody(objectMapper.writeValueAsString(updateUser))
//            }.apply {
//                assertEquals(HttpStatusCode.OK, response.status())
//            }
//        }
//    }
}
