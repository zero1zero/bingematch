import org.junit.Test
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

internal class MetadataSourceTest {
//    @Test
    fun utelly() {
        val utelly = Utelly()

        println(utelly.lookup("dark knight"))
    }

    @Test
    fun tmdb() {
        val tmdb = TMDB()

        println(tmdb.getMostPopular())
    }
}
