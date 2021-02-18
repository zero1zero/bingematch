package cache

import movie.Movie
import java.util.*


interface Cache {
    fun getMovie(id : Int) : Optional<Movie.Detail>
    fun setMovie(movie: Movie.Detail)

    fun close()
}