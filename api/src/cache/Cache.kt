package cache

import show.Show
import java.util.*


interface Cache {
    fun getShow(id : String) : Optional<Show.Detail>
    fun setShow(show: Show.Detail)

    fun close()
}