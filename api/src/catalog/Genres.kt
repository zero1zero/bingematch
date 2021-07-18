package catalog

import com.google.common.cache.CacheBuilder
import com.google.common.cache.CacheLoader
import show.Show


class Genres(private val metadataSource: MetadataSource) {

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

    fun getAllGenres(): Iterable<Show.Genre> {
        return genres.asMap().values
    }

    fun getGenre(id : Int) : Show.Genre {
        return genres.getIfPresent(id)!!
    }

}