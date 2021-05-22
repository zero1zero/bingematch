package cache

import com.google.common.cache.CacheBuilder
import org.junit.Test
import show.Show
import java.util.*
import kotlin.test.assertEquals


class InMemoryCache : Cache {

    val cache = CacheBuilder.newBuilder().build<Any, Any>()

    override fun getShow(id: String): Optional<Show.Detail> {
        val show : Show.Detail? = cache.getIfPresent(id) as Show.Detail?

        return Optional.ofNullable(show)
    }

    override fun setShow(show: Show.Detail) {
        cache.put(show.id, show)
    }

    override fun close() {}
}

internal class InMemoryCacheTest {

    @Test
    fun mem() {
        val inMem = InMemoryCache()
        val show = Show.Detail.newBuilder()
            .setId("test-id")
            .build()

        inMem.setShow(show)

        assertEquals(show, inMem.getShow(show.id).get())
    }
}