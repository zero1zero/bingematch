package cache

import com.google.common.cache.CacheBuilder
import org.junit.Test
import java.util.*
import kotlin.test.assertEquals


class InMemoryCache : Cache {

    val cache = CacheBuilder.newBuilder().build<Any, Any>()

    override fun getMovie(id: Int): Optional<Model.Movie> {
        val movie : Model.Movie? = cache.getIfPresent(id) as Model.Movie?

        return Optional.ofNullable(movie)
    }

    override fun setMovie(movie: Model.Movie) {
        cache.put(movie.id, movie)
    }

    override fun close() {}
}

internal class InMemoryCacheTest {

    @Test
    fun mem() {
        val inMem = InMemoryCache()
        val movie = Model.Movie.newBuilder()
            .setId(1234)
            .build()

        inMem.setMovie(movie)

        assertEquals(movie, inMem.getMovie(movie.id).get())
    }
}