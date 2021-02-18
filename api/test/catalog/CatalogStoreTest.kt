package catalog

import cache.InMemoryCache
import org.junit.Test
import org.junit.jupiter.api.Assertions.*

internal class CatalogStoreTest {

    @Test
    fun getMovie() {
        val metadataSource = MetadataSource()

        val catalogStore = CatalogStore(metadataSource, InMemoryCache())

        val popular = catalogStore.getPopular()

        assertTrue(popular.size > 10)
        assertNotNull(popular)
    }
}