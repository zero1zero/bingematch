package catalog

import cache.Cache
import com.fasterxml.jackson.databind.JsonNode
import com.github.kittinunf.fuel.core.FuelError
import com.google.common.cache.CacheBuilder
import com.google.common.cache.CacheLoader
import com.google.common.io.BaseEncoding
import org.hashids.Hashids
import show.Show
import java.nio.ByteBuffer
import java.util.*

enum class Type(val char : Char) {
    TV('t'),
    Movie('m');

    companion object {
        fun fromChar(char : Char): Type {
            return if (char == 't') TV else Movie
        }
    }
}

class TMDBId(val id : Int, val type : Type)

val hashid = Hashids("horse battery staple zack", 3, "23456789abcdefghkmpqrstuvwxyz")

fun tmdbIdToInternalId(id : Int, type : Type): String {
    return hashid.encode(type.char.toLong(), id.toLong())
}

fun internalIdToTmdbId(id : String): TMDBId {
    val decoded = hashid.decode(id)

    check(decoded.size == 2) { "Poorly formed internal identifier" }

    return TMDBId(decoded[1].toInt(), Type.fromChar(decoded[0].toChar()))
}

class Catalog(
    private val metadataSource: MetadataSource,
    private val cache : Cache) {

    private val genres : com.google.common.cache.Cache<Int, Show.Genre> = CacheBuilder.newBuilder()
        .build(CacheLoader.from { id ->
            loadGenres().first { it.id == id } //this should really only happen in the odd case a genre is added in flight
        })

    //hydrate all to start
    init {
        loadGenres().forEach { genre ->
            genres.put(genre.id, genre)
        }
    }

    private fun loadGenres(): List<Show.Genre> {
        return (metadataSource.tmdb.getMovieGenres()["genres"] + metadataSource.tmdb.getTVGenres()["genres"])
            .map { json ->
                Show.Genre.newBuilder()
                    .setName(json["name"].asText())
                    .setId(json["id"].asInt())
                    .build()
            }
            .toList()
    }

    private fun fullShowJsonToShow(id : String, json : JsonNode): Show.Detail {

        val show = Show.Detail.newBuilder()
            .setId(id)

            //shared between tv and movie
            .setTitle((json["title"] ?: json["name"]).asText())
            .setDate((json["release_date"] ?: json["first_air_date"]).asText())

            .setOverview(json["overview"].asText())
            .setPosterPath(json["poster_path"].asText())
            .setBackdropPath(json["backdrop_path"].asText())
            .setPopularity(json["popularity"].asInt())
            .setVotes(
                Show.Votes.newBuilder()
                .setCount(json["vote_count"].asInt())
                .setAverage(json["vote_average"].asDouble()))

        //optional
        show.setTagline(json["tagline"].asText())

        //movie specific
        buildMovie(json, show)

        //tv show specific
        buildTv(json, show)

        json["genres"].map { genre ->
            show.addGenres(
                Show.Genre.newBuilder()
                    .setName(genre["name"].asText())
                    .setId(genre["id"].asInt())
            )
        }

        json["spoken_languages"].map { language ->
            show.addSpokenLanguage(
                language["iso_639_1"].asText()
            )
        }

        json["videos"]["results"].map { video ->
            show.addVideos(
                Show.Video.newBuilder()
                .setId(video["id"].asText())
                .setLanguage(video["iso_639_1"].asText())
                .setCountry(video["iso_3166_1"].asText())
                .setKey(video["key"].asText())
                .setName(video["name"].asText())
                .setSite(video["site"].asText())
                .setSize(video["size"].asInt())
                .setType(parseType(video["type"]))
            )
        }

        json["images"]["posters"].forEach { image ->
            show.addPosters(
                Show.Image.newBuilder()
                    .setAspectRatio(image["aspect_ratio"].asDouble())
                    .setFilePath(image["file_path"].asText())
                    .setHeight(image["height"].asInt())
                    .setWidth(image["width"].asInt())
                    .setLanguage(image["iso_639_1"].asText())
                    .setVotes(
                        Show.Votes.newBuilder()
                        .setAverage(image["vote_average"].asDouble())
                        .setCount(image["vote_count"].asInt()))
            )
        }

        json["credits"]["cast"].forEach { cast ->
            show.addCast(Show.Cast.newBuilder()
                .setId(cast["id"].asInt())
                .setName(cast["name"].asText())
                .setProfilePath(cast["profile_path"].asText())
                .setCharacter(cast["character"].asText()))
        }

        json["credits"]["crew"].forEach { crew ->
            show.addCrew(Show.Crew.newBuilder()
                .setId(crew["id"].asInt())
                .setName(crew["name"].asText())
                .setProfilePath(crew["profile_path"].asText())
                .setJob(crew["job"].asText()))
        }

        json["recommendations"]["results"].map { reco ->
            show.addRecommendations(reco["id"].asInt())
        }

        json["similar"]["results"].map { similar ->
            show.addSimilar(similar["id"].asInt())
        }

        return show.build()
    }

    private fun buildTv(json: JsonNode, show : Show.Detail.Builder) {
        //our test if its tv
        if (json["first_air_date"] == null) {
            return
        }

        val tv = Show.TV.newBuilder()

        tv.setStatus(Show.TV.Status.valueOf(
            json["status"].asText().replace(" ", "")
        ))

        tv.setSeasons(json["number_of_seasons"].intValue())

        show.setTv(tv.build())
        show.setType(Show.Detail.Type.TV)
    }

    fun buildMovie(json : JsonNode, show : Show.Detail.Builder) {
        //our test if its a movie
        if (json["release_date"] == null) {
            return
        }

        val movie = Show.Movie.newBuilder()
            .setOriginalLanguage(json["original_language"].asText())
            .setOriginalTitle(json["original_title"].asText())

        //optional
        if (json["imdb_id"] != null) {
            movie.setImdbId(json["imdb_id"].asText())
        }

        movie.setStatus(Show.Movie.Status.valueOf(
            json["status"].asText().replace(" ", "")
        ))

        if (json["budget"] != null) {
            movie.setBudget(json["budget"].asInt())
        }

        movie.setRuntime(json["runtime"].intValue())


        show.setMovie(movie.build())
        show.setType(Show.Detail.Type.Movie)
    }

    fun parseType(type : JsonNode) : Show.Video.Type {
        return Show.Video.Type.valueOf(
            type.asText().replace(" ", "")
        )
    }

    fun getShow(id : String) : Show.Detail {

        var maybeItem = cache.getShow(id)

        if (maybeItem.isEmpty) {

            val tmdbId = internalIdToTmdbId(id)

            val newShow = cacheTmdb(tmdbId.id, id) {
                when (tmdbId.type) {
                    Type.TV -> metadataSource.tmdb.getTV(it)
                    Type.Movie -> metadataSource.tmdb.getMovie(it)
                }
            }

            cache.setShow(newShow)

            maybeItem = Optional.of(newShow)
        }

        return maybeItem.get()
    }

    fun cacheTmdb(tmdbId: Int, id: String, hydrate : (tmdbId: Int) -> JsonNode): Show.Detail {

        var maybeCached = cache.getShow(id)

        if (maybeCached.isEmpty) {
            val newShow = fullShowJsonToShow(id, hydrate(tmdbId))

            cache.setShow(newShow)

            maybeCached = Optional.of(newShow)
        }

        return maybeCached.get()
    }


    fun getPopular() : List<Show.Detail> {
        val movies = metadataSource.tmdb.getPopularMovies()["results"]
            .map {
                val id = tmdbIdToInternalId(it["id"].asInt(), Type.Movie)
                cacheTmdb(it["id"].asInt(), id) { tmdbId ->
                    metadataSource.tmdb.getMovie(tmdbId)
                }
            }
            .toList()

        val tv = metadataSource.tmdb.getPopularTV()["results"]
            .map {
                val id = tmdbIdToInternalId(it["id"].asInt(), Type.TV)
                cacheTmdb(it["id"].asInt(), id) { tmdbId ->
                    metadataSource.tmdb.getTV(tmdbId)
                }
            }
            .toList()

        return (movies + tv).shuffled()
    }
}
