package queue

import catalog.Catalog
import db.mappers.ListsMapper
import etc.generateId
import lists.Lists
import org.apache.ibatis.session.SqlSession
import show.Show
import user.User

/**
.filter { it.hasMovie() || it.hasTv() }
.filter { it.movie.runtime > 50 || it.tv.seasons > 0 }
 */
class Queue(private val lists : Lists, private val catalog : Catalog) {

    fun getFillingQueued(user : String, session : SqlSession) : List<User.QueuedShow> {
        val all = lists.getQueued(user, session)

        if (all.size < 5) {
            val new = mutableListOf<User.QueuedShow>()
            new.addAll(all)
            new.addAll(newQueueShows(user, session))

            lists.updateQueued(user, new.distinct().take(10), session)

            return new
        }

        return all
    }

    private fun newQueueShows(user : String, session : SqlSession): List<User.QueuedShow> {
        val unqueueable = lists.getUnqueueable(user, session)

        return catalog.getPopular() //todo pull this out to add complexity to queue
            .filterNot(unqueueable::contains) //todo this will probably need perf improvement
            .map { show ->
                User.QueuedShow.newBuilder()
                    .setShow(show)
                    .build()
            }
    }
}