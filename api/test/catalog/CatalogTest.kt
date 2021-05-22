package catalog

import cache.InMemoryCache
import org.junit.Test
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.mockito.Mockito.`when`
import org.mockito.Mockito.any
import org.mockito.Mockito.anyInt
import org.mockito.Mockito.mock
import org.mockito.Mockito.spy
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import java.util.*
import kotlin.test.assertEquals

internal class CatalogTest {

    @Test
    fun getPopularTVAndMovie() {
        val metadataSource = MetadataSource()

        val catalogStore = Catalog(metadataSource, InMemoryCache())

        val popular = catalogStore.getPopular()

        assertTrue(popular.size > 10)
        assertNotNull(popular)
    }

    @Test
    fun noDuplicates() {
        val metadataSource = MetadataSource()

        val catalogStore = Catalog(metadataSource, InMemoryCache())

        val popular = catalogStore.getPopular()
            .map { it.id }

        assertEquals(40, popular.toTypedArray().toSet().size)
    }

    @Test
    fun secondIsCached() {
        val tmdb = spy(TMDB())

        val catalogStore = Catalog(MetadataSource(tmdb), InMemoryCache())

        val popular = catalogStore.getPopular()
        val popularCached = catalogStore.getPopular()

        //only 4 calls total with 80 items across two lists
        verify(tmdb, times(20)).getMovie(anyInt())
        verify(tmdb, times(20)).getTV(anyInt())

        //need to intersect as popular is shuffled each time
        assertEquals(40, popular.intersect(popularCached).size)
    }

    @Test
    fun idTranslation() {
        val internal = tmdbIdToInternalId(1000, Type.TV)
        val external = internalIdToTmdbId(internal)

        assertEquals(1000, external.id)
        assertEquals(Type.TV, external.type)


        val external1 = internalIdToTmdbId("9bauqrvdg")
        assertEquals(2343225, external1.id)
        assertEquals(Type.Movie, external1.type)
    }

    @Test
    fun verifyDataMatches() {
        val metadata = MetadataSource(TMDB())

        val movie = metadata.tmdb.getMovie(399566)
        val tv = metadata.tmdb.getTV(69478)

        val catalogStore = Catalog(metadata, InMemoryCache())

        val movieShow = catalogStore.getShow(tmdbIdToInternalId(399566, Type.Movie))
        val tvShow = catalogStore.getShow(tmdbIdToInternalId(69478, Type.TV))

        //random attribute tests as you add them

        assertEquals(113, movieShow.movie.runtime)
        assertEquals(4, tvShow.tv.seasons)
    }
}