package cache

import com.google.common.cache.CacheBuilder
import movie.Movie
import org.junit.Test
import java.util.*
import kotlin.test.assertEquals


class InMemoryCache : Cache {

    val cache = CacheBuilder.newBuilder().build<Any, Any>()

    override fun getMovie(id: Int): Optional<Movie.Detail> {
        val movie : Movie.Detail? = cache.getIfPresent(id) as Movie.Detail?

        return Optional.ofNullable(movie)
    }

    override fun setMovie(movie: Movie.Detail) {
        cache.put(movie.id, movie)
    }

    override fun close() {}
}

internal class InMemoryCacheTest {

    @Test
    fun mem() {
        val inMem = InMemoryCache()
        val movie = Movie.Detail.newBuilder()
            .setId(1234)
            .build()

        inMem.setMovie(movie)

        assertEquals(movie, inMem.getMovie(movie.id).get())
    }
}