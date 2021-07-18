import catalog.MetadataSource
import catalog.TMDB
import org.junit.jupiter.api.Test

internal class MetadataSourceTest {
//    @Test
    fun utelly() {
        val utelly = MetadataSource.Utelly()

        println(utelly.lookup("dark knight"))
    }

    @Test
    fun moviePopular() {
        val tmdb = TMDB()

        println(tmdb.getPopularMovies())
    }

    @Test
    fun tv() {
        val tmdb = TMDB()

        println(tmdb.getPopularTV())
    }
}
