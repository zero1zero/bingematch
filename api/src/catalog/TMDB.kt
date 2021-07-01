package catalog

import com.fasterxml.jackson.databind.JsonNode
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.jackson.responseObject
import java.time.Instant
import java.time.format.DateTimeFormatter

/**
 * The Movie DB
 * https://www.themoviedb.org/documentation/api
 * https://www.themoviedb.org/documentation/api/discover
 * https://developers.themoviedb.org/3/getting-started/introduction
 *
 * most popular
 * /discover/movie?sort_by=popularity.desc
 *
 * https://api.themoviedb.org/3/movie/550?api_key=ba647fb82147021ea5fd00ccf6ebb571
 */
class TMDB {

    private val key = "ba647fb82147021ea5fd00ccf6ebb571"
    private val baseURL = "https://api.themoviedb.org/3"

    private var dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy")

    fun getMovieChanges(start : Instant, end : Instant, page : Int) : JsonNode {
        val (request, response, result) = Fuel.get(
            "$baseURL/movie/changes", listOf(
                "api_key" to key,
                "language" to "en",
                "$page" to "page",
                dateFormatter.format(start) to "start_date",
                dateFormatter.format(end) to "end_date",
            ))
            .responseObject<JsonNode>()

        return result.get()
    }

    fun getTvChanges(start : Instant, end : Instant, page : Int) : JsonNode {
        val (request, response, result) = Fuel.get(
            "$baseURL/tv/changes", listOf(
                "api_key" to key,
                "language" to "en",
                "$page" to "page",
                dateFormatter.format(start) to "start_date",
                dateFormatter.format(end) to "end_date",
            ))
            .responseObject<JsonNode>()

        return result.get()
    }

    fun getMovieGenres() : JsonNode {
        val (request, response, result) = Fuel.get(
            "$baseURL/genre/movie/list", listOf(
                "api_key" to key,
                "language" to "en",
            ))
            .responseObject<JsonNode>()

        return result.get()
    }

    fun getTVGenres() : JsonNode {
        val (request, response, result) = Fuel.get(
            "$baseURL/genre/tv/list", listOf(
                "api_key" to key,
                "language" to "en",
            )
        )
            .responseObject<JsonNode>()

        return result.get()
    }

    fun getMovie(tmdbId : Int) : JsonNode {
        val (request, response, result) = Fuel.get(
            "$baseURL/movie/$tmdbId", listOf(
                "api_key" to key,
                "language" to "en",
                "append_to_response" to "videos,images,recommendations,similar,watch/providers,credits"
            ))
            .responseObject<JsonNode>()

        return result.get()
    }

    fun getTV(tmdbId : Int) : JsonNode {
        val (request, response, result) = Fuel.get(
            "$baseURL/tv/$tmdbId", listOf(
                "api_key" to key,
                "language" to "en",
                "append_to_response" to "videos,images,recommendations,similar,watch/providers,credits"
            ))
            .responseObject<JsonNode>()

        return result.get()
    }

    fun getPopularMovies() : JsonNode {
        val (request, response, result) = Fuel.get(
            "$baseURL/discover/movie", listOf(
                "api_key" to key,
                "language" to "en",
                "sort_by" to "popularity.desc",
                "include_adult" to "false",
                "include_video" to "true",
                "with_watch_providers" to "true",

//                "with_genres" to "true //todo use this to filter on users genre for popular
            ))
            .responseObject<JsonNode>()

        return result.get()
    }

    fun getPopularTV() : JsonNode {
        val (request, response, result) = Fuel.get(
            "$baseURL/discover/tv", listOf(
                "api_key" to key,
                "language" to "en",
                "sort_by" to "popularity.desc",
                "include_adult" to "false",
                "include_video" to "true",
                "with_watch_providers" to "true"
            ))
            .responseObject<JsonNode>()

        return result.get()
    }

    fun getTrending() : JsonNode {
        val (request, response, result) = Fuel.get(
            "$baseURL/trending/all/week", listOf(
                "api_key" to key,
                "language" to "en",
                "sort_by" to "popularity.desc",
                "include_adult" to "false",
                "include_video" to "true"))
            .responseObject<JsonNode>()

        return result.get()
    }
}