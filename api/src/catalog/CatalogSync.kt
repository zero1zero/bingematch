package catalog

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ArrayNode
import db.Database
import db.mappers.CatalogMapper
import org.slf4j.LoggerFactory
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit


class CatalogSync(private val db : Database,
                  private val catalog : Catalog,
                  private val tmdb : TMDB) {

    private val logger = LoggerFactory.getLogger(CatalogSync::class.java)

    private val executor = Executors.newSingleThreadScheduledExecutor()
    private val runnable = Runnable { updateCatalogCaches() }

    init {
        executor.schedule(runnable, 5, TimeUnit.MINUTES)
    }

    fun updateCatalogCaches() {
        val session = db.newSession()
        val mapper = session.getMapper(CatalogMapper::class.java)

        val now = Instant.now()

        val lastSync = mapper.getLastSync() ?: now

        //short circuit if newer than 2 days ago
        if (now.minus(2, ChronoUnit.DAYS).isBefore(lastSync) && lastSync != now) {
            return
        }

        val tvChanges = iterPage { page ->
            tmdb.getTvChanges(lastSync, Instant.now(), page)
        }

        val movieChanges = iterPage { page ->
            tmdb.getMovieChanges(lastSync, Instant.now(), page)
        }

        movieChanges.forEach { movie ->
            val tmdbId = movie["id"].asInt()
            val showId = tmdbIdToInternalId(tmdbId, Type.Movie)

            try {
                catalog.getShow(showId, session, true)
            } catch (e : Throwable) {
                logger.warn("Can't find $tmdbId when syncing")
            }
        }

        tvChanges.forEach { movie ->
            val tmdbId = movie["id"].asInt()
            val showId = tmdbIdToInternalId(tmdbId, Type.TV)

            try {
                catalog.getShow(showId, session, true)
            } catch (e : Throwable) {
                logger.warn("Can't find $tmdbId when syncing")
            }
    }

    mapper.setLastSync(movieChanges.count() + tvChanges.count())

        executor.schedule(runnable, 24, TimeUnit.HOURS)
    }

    fun iterPage( call : (page : Int) -> JsonNode) : JsonNode {
        val mapper = ObjectMapper()

        //todo this is broken in TMDB
//        var totalResults = -1
        var totalPages = 1
        var page = 1

        val results = mapper.createArrayNode()

        while (page <= totalPages) {
            val resp = call(page)
            totalPages = resp["total_pages"].asInt()
//            if (totalResults == -1) {
//                totalResults = resp["total_results"].intValue()
//            }
            page++

            results.addAll(resp["results"] as ArrayNode)
        }

//        checkState(totalResults == results.size(), "Page size mismatch for catalog ($totalResults, ${results.size()}")

        return results
    }
}