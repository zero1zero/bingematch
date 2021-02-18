package catalog

import Model
import cache.Cache
import com.fasterxml.jackson.databind.JsonNode
import java.util.*

class CatalogStore(
    private val metadataSource: MetadataSource,
    private val cache : Cache) {

    private fun jsonToMovie(json : JsonNode): Model.Movie {
        val movie = Model.Movie.newBuilder()
            .setId(json["id"].asInt())
            .setTitle(json["title"].asText())
            .setOverview(json["overview"].asText())
            .setOriginalLanguage(json["original_language"].asText())
            .setOriginalTitle(json["original_title"].asText())
            .setPosterPath(json["poster_path"].asText())
            .setBackdropPath(json["backdrop_path"].asText())
            .setReleaseDate(json["release_date"].asText())
            .setPopularity(json["popularity"].asInt())
            .setTagline(json["tagline"].asText())
            .setImdbId(json["imdb_id"].asText())
            .setStatus(parseStatus(json["status"]))
            .setVotes(Model.Votes.newBuilder()
                .setCount(json["vote_count"].asInt())
                .setAverage(json["vote_average"].asDouble()))

        json["genres"].map { genre ->
            movie.addGenres(
                Model.Genre.newBuilder()
                .setName(genre["name"].asText())
                .setId(genre["id"].asInt())
            )
        }

        json["spoken_languages"].map { language ->
            movie.addSpokenLanguage(
                language["iso_639_1"].asText()
            )
        }

        json["videos"]["results"].map { video ->
            movie.addVideos(
                Model.MovieVideo.newBuilder()
                .setId(video["id"].asText())
                .setLanguage(video["iso_639_1"].asText())
                .setCountry(video["iso_3166_1"].asText())
                .setKey(video["key"].asText())
                .setName(video["name"].asText())
                .setSite(video["site"].asText())
                .setSize(video["size"].asInt())
                .setSize(video["size"].asInt())
                .setType(parseType(video["type"]))
            )
        }

        json["images"]["posters"].map { image ->
            movie.addPosters(
                Model.MovieImage.newBuilder()
                    .setAspectRatio(image["aspect_ratio"].asDouble())
                    .setFilePath(image["file_path"].asText())
                    .setHeight(image["height"].asInt())
                    .setWidth(image["width"].asInt())
                    .setLanguage(image["iso_639_1"].asText())
                    .setVotes(Model.Votes.newBuilder()
                        .setAverage(image["vote_average"].asDouble())
                        .setCount(image["vote_count"].asInt()))
            )
        }

        json["recommendations"]["results"].map { reco ->
            movie.addRecommendations(reco["id"].asInt())
        }

        json["similar"]["results"].map { similar ->
            movie.addSimilar(similar["id"].asInt())
        }

        return movie.build()
    }

    fun parseType(type : JsonNode) : Model.MovieVideo.Type {
        return Model.MovieVideo.Type.valueOf(
            type.asText().replace(" ", "")
        )
    }

    fun parseStatus(status : JsonNode) : Model.Movie.Status {
        return Model.Movie.Status.valueOf(
            status.asText().replace(" ", "")
        )
    }

    fun getMovie(id : Int) : Model.Movie {

        var maybeMovie = cache.getMovie(id)

        if (maybeMovie.isEmpty) {

            val json = metadataSource.tmdb.getMovie(id)

            val newMovie = jsonToMovie(json)

            cache.setMovie(newMovie)
            maybeMovie = Optional.of(newMovie)
        }

        return maybeMovie.get()
    }

    fun getPopular() : List<Model.Movie> {
        val json = metadataSource.tmdb.getPopular()

        //one page of results
        return json["results"].map { item ->
            getMovie(item["id"].asInt())
        }
    }
}
