import com.fasterxml.jackson.databind.JsonNode
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.jackson.responseObject


class MetadataSource {

    /**
     * The Open Movie Database
     * http://www.omdbapi.com/
     *
     * Better posters?
     */
    class OMDb {
    }

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

        val key = "ba647fb82147021ea5fd00ccf6ebb571"

        fun getMostPopular() : JsonNode {
            val (request, response, result) = Fuel.get(
                "https://api.themoviedb.org/3/discover/movie", listOf(
                    "api_key" to key,
                    "language" to "en",
                    "sort_by" to "popularity.desc",
                    "include_adult" to "false",
                    "include_video" to "true"))
                .responseObject<JsonNode>()

            return result.get()
        }
    }

    /**
     * Entertainment Data Hub
     * https://rapidapi.com/IVALLC/api/entertainment-data-hub
     */
    class EntertainmentDataHub {

    }

    /**
     * GoWatch - streaming availability
     * https://rapidapi.com/gowatch/api/gowatch/endpoints
     */

    /**
     * Utelly
     * https://rapidapi.com/utelly/api/utelly?endpoint=apiendpoint_3cad787b-ca7b-449a-84b4-23b40d64fd73
     *
     * TODO subscribe w/ free option
     */
    class Utelly {
        val key = "bff3e3de53mshedfa0717f5e143ep1043bfjsnaec1c2a86301"

        fun lookup(term : String) : JsonNode {
            val (request, response, result) = Fuel.get(
                "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup", listOf(
                    "country" to "us",
                    "term" to term
                )
            )
                .header("x-rapidapi-key", key)
                .header("x-rapidapi-host", "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com")
                .responseObject<JsonNode>()


            return result.get()
        }
    }



    fun getGenres() {

    }
}