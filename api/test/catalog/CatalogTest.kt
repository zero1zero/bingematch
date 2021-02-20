package catalog

import cache.InMemoryCache
import org.junit.Test
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertTrue

internal class CatalogTest {

    @Test
    fun getMovie() {
        val metadataSource = MetadataSource()

        val catalogStore = Catalog(metadataSource, InMemoryCache())

        val popular = catalogStore.getPopular()

        assertTrue(popular.size > 10)
        assertNotNull(popular)
    }
}