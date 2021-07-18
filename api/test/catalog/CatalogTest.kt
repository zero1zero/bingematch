package catalog

import EmbeddedDataSource
import db.Database
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

internal class CatalogTest {
    private val datasource = EmbeddedDataSource()
    private val database = Database(datasource)

    @Test
    fun getPopularTVAndMovie() {
        val metadataSource = MetadataSource()

        val catalogStore = Catalog(metadataSource)

        val popular = catalogStore.getPopular()

        assertTrue(popular.size > 10)
        assertNotNull(popular)
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

        metadata.tmdb.getMovie(399566)
        metadata.tmdb.getTV(69478)

        val catalogStore = Catalog(metadata)
        database.newSession().use {
            val movieShow = catalogStore.getShow(tmdbIdToInternalId(399566, Type.Movie), it)
            val tvShow = catalogStore.getShow(tmdbIdToInternalId(69478, Type.TV), it)

            //random attribute tests as you add them
            assertEquals(113, movieShow.movie.runtime)
            assertEquals(4, tvShow.tv.seasons)
        }
    }
}