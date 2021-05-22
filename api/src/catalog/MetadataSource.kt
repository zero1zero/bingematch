package catalog

import com.fasterxml.jackson.databind.JsonNode
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.jackson.responseObject


class MetadataSource(val tmdb : TMDB = TMDB()) {

    /**
     * Entertainment Data Hub
     * https://rapidapi.com/IVALLC/api/entertainment-data-hub
     */
    class EntertainmentDataHub {

    }

    /**
     * The Open Movie Database
     * http://www.omdbapi.com/
     *
     * Better posters?
     */
    class OMDb {
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
}