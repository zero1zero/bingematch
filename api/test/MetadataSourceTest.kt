import catalog.MetadataSource
import org.junit.Test

internal class MetadataSourceTest {
//    @Test
    fun utelly() {
        val utelly = MetadataSource.Utelly()

        println(utelly.lookup("dark knight"))
    }

    @Test
    fun tmdb() {
        val tmdb = MetadataSource.TMDB()

        println(tmdb.getPopular())
    }
}
