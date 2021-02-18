package cache

import Model
import java.util.*


interface Cache {
    fun getMovie(id : Int) : Optional<Model.Movie>
    fun setMovie(movie: Model.Movie)

    fun close()
}