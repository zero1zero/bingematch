import auth.JwtConfig
import io.ktor.http.*
import io.ktor.server.testing.*
import org.junit.Assert
import org.junit.BeforeClass
import user.User
import java.util.*
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit

class UserTestUtil {

    private var user : Optional<User.Detail> = Optional.empty()

    val login = User.Login.newBuilder()
        .setEmail("api-testing@bingematch.com")
        .setPassword("horse battery staple login")
        .build()

    fun getTestUser(): User.Detail {
        if (user.isPresent) {
            return user.get()
        }

        withTestApplication({ module(TestDeps()) }) {

            val latch = CountDownLatch(1)

            //make sure there isnt an existing user. login and delete them if so
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

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
                    Assert.assertEquals(HttpStatusCode.Accepted, response.status())

                    latch.countDown()
                }
            }

            latch.await(5000, TimeUnit.SECONDS)

            //create user
            handleRequest(HttpMethod.Post, "/user") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(login))
            }.apply {
                if (response.content == "user-exists") {
                    Assert.fail("user-exists during attempt to create, something is wrong with the test flow")
                }
                val userwtoken = objectMapper.readValue(response.content, User.DetailAndToken::class.java)
                user = Optional.of(userwtoken.detail)
            }
        }

        return user.get()
    }
}