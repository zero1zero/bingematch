package catalog

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.google.protobuf.util.JsonFormat
import db.JsonParser
import db.JsonPrinter
import db.mappers.CatalogMapper
import org.apache.ibatis.session.SqlSession
import org.hashids.Hashids
import show.Show

class Catalog(private val metadataSource: MetadataSource) {

    private val mapper : ObjectMapper = ObjectMapper()

    //hydrate all to start
    init {
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
    }

    private fun internalizeInitial(id : String, json : JsonNode): Show.Detail {

        val show = Show.Detail.newBuilder()
            .setId(id)

            //shared between tv and movie
            .setTitle((json["title"] ?: json["name"]).asText())
            .setDate((json["release_date"] ?: json["first_air_date"]).asText())

            .setOverview(json["overview"].asText())
            .setPosterPath(json["poster_path"].asText())
            .setBackdropPath(json["backdrop_path"].asText())
            .setPopularity(json["popularity"].asDouble())
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

    fun getShow(id: String, session: SqlSession) : Show.Detail {
        return getShow(id, session, false)
    }

    fun getShow(id: String, session: SqlSession, forceRefresh : Boolean) : Show.Detail {
        val mapper = session.getMapper(CatalogMapper::class.java)

        val maybeShow = mapper.getShow(id)

        if (maybeShow == null || forceRefresh) {
            val tmdbId = internalIdToTmdbId(id)

            val node = when (tmdbId.type) {
                Type.TV -> metadataSource.tmdb.getTV(tmdbId.id)
                Type.Movie -> metadataSource.tmdb.getMovie(tmdbId.id)
            }

            val internalized = internalizeInitial(id, node)

            val json = JsonPrinter.print(internalized)

            //will either insert new or update
            mapper.addShow(id, json)

            return internalized
        }

        val existingShow = Show.Detail.newBuilder()

        JsonParser.merge(maybeShow.tmdb, existingShow)

        return existingShow.build()
    }

    fun getPopular() : List<String> {
        val movies = metadataSource.tmdb.getPopularMovies()["results"]
            .map {
                tmdbIdToInternalId(it["id"].asInt(), Type.Movie)
            }
            .toList()

        val tv = metadataSource.tmdb.getPopularTV()["results"]
            .map {
                tmdbIdToInternalId(it["id"].asInt(), Type.TV)
            }
            .toList()

        return (movies + tv)
    }
}

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
