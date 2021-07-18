import io.ktor.http.*
import io.ktor.server.testing.*
import org.junit.jupiter.api.Assertions.assertEquals
import show.Show
import user.User
import java.util.*

class UserTestUtil {

    private var user : Optional<User.Detail> = Optional.empty()

    val login = User.Register.newBuilder()
        .setEmail("api-testing@bingematch.com")
        .setFirst("Zack")
        .setLast("ManningT")
        .setPassword("horse battery staple login")
        .build()

    fun getTestUser(): User.Detail {
        if (user.isPresent) {
            return user.get()
        }

        val deps = TestDeps()

        withTestApplication({ module(deps) }) {

            //create user
            handleRequest(HttpMethod.Post, "/user") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(login))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())

                val userwtoken = objectMapper.readValue(response.content, User.DetailAndToken::class.java)

                user = Optional.of(userwtoken.detail)
            }

            val genres = deps.genres().getAllGenres().map(Show.Genre::getId)

            //add some genres
            handleRequest(HttpMethod.Put, "/user/${user.get().id}/genres") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                addHeader(HttpHeaders.Authorization, "Bearer ${UseTestApp.token()}")

                setBody(objectMapper.writeValueAsString(genres))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }
        }

        return user.get()
    }
}