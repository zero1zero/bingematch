package catalog

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ArrayNode
import com.google.common.base.Preconditions.checkState
import db.Database
import db.mappers.CatalogMapper
import org.slf4j.LoggerFactory
import java.time.Instant
import java.time.temporal.ChronoUnit


class CatalogSync(private val db : Database,
                       private val tmdb : TMDB) {

    private val logger = LoggerFactory.getLogger(CatalogSync::class.java)

    fun updateCatalogCaches() {
        val session = db.newSession()
        val mapper = session.getMapper(CatalogMapper::class.java)

        val lastSync = mapper.getLastSync().toInstant()

        //short circuit if newer than 2 days ago
        if (lastSync.plus(2, ChronoUnit.DAYS).isAfter(Instant.now())) {
            return
        }

        val tvChanges = iterPage { page ->
            tmdb.getTvChanges(lastSync, Instant.now(), page)
        }

        val movieChanges = iterPage { page ->
            tmdb.getMovieChanges(lastSync, Instant.now(), page)
        }

        movieChanges.forEach { movie ->
//            mapper.updateTMDB(movie["id"].asInt(), )
        }

//        mapper.setLastSync()
    }

    fun iterPage( call : (page : Int) -> JsonNode) : JsonNode {
        val mapper = ObjectMapper()

        var totalResults = -1
        var totalPages = 1
        var page = 1

        val results = mapper.createArrayNode()

        while (page <= totalPages) {
            val resp = call(page)
            totalPages = resp["total_pages"].asInt()
            if (totalResults == -1) {
                totalResults = resp["total_results"].intValue()
            }
            page++

            results.addAll(resp["results"] as ArrayNode)
        }

        checkState(totalResults == results.size(), "Page size mismatch for catalog ($totalResults, ${results.size()}")

        return results
    }
}