package queue

import catalog.Catalog
import db.mappers.QueueMapper
import etc.generateId
import org.apache.ibatis.session.SqlSession
import show.Show

/**
.filter { it.hasMovie() || it.hasTv() }
.filter { it.movie.runtime > 50 || it.tv.seasons > 0 }
 */
class Queues(private val catalog : Catalog) {

    fun getQueued(user : String, session : SqlSession) : Queue.QueuedItems {
        val all = Queue.QueuedItems.newBuilder()

        val qMapper = session.getMapper(QueueMapper::class.java)

        val queue = qMapper.getQueue(user, Queue.QueueItemState.Queued_VALUE)

        queue.forEach { item ->
            val show = catalog.getShow(item.showId, session)

            all.addItems(buildQueuedItem(item.id, user, show))
        }

        if (all.itemsCount < 5) {
            all.addAllItems(hydrateNewQueueItems(user, session))
        }

        return all.build()
    }

    fun getLikes(user : String, session : SqlSession) : Queue.QueuedItems {
        val qMapper = session.getMapper(QueueMapper::class.java)

        val queue = qMapper.getQueue(user, Queue.QueueItemState.Liked_VALUE)

        val all = Queue.QueuedItems.newBuilder()
        //todo a multi get here is probably better
        queue.forEach { item ->
            val show = catalog.getShow(item.showId, session)

            all.addItems(buildQueuedItem(item.id, user, show))
        }
        return all.build()
    }

    fun getQueueItem(id : String, session : SqlSession): QueueMapper.DBQueueItem {
        val qMapper = session.getMapper(QueueMapper::class.java)

        return qMapper.getQueueItem(id)
    }

    fun updateState(id : String, state : Int, session : SqlSession) {
        val qMapper = session.getMapper(QueueMapper::class.java)

        qMapper.updateState(id, state)
    }

    private fun hydrateNewQueueItems(user : String, session : SqlSession): List<Queue.QueuedItem> {
        val mapper = session.getMapper(QueueMapper::class.java)
        val swiped = mapper.getAllNotQueued(user)
        return catalog.getPopular() //todo pull this out to add complexity to queue
            .filterNot(swiped::contains) //filter out if swiped already
            .map{ catalog.getShow(it, session) }
            .map { show ->
                val id = generateId()
                mapper.addToQueue(
                    id,
                    user,
                    show.id,
                    Queue.QueueItemState.Queued_VALUE
                )

                buildQueuedItem(id, user, show).build()
            }
    }

    private fun buildQueuedItem(id : String, user : String, show : Show.Detail): Queue.QueuedItem.Builder {
        return Queue.QueuedItem.newBuilder()
            .setId(id)
            .setUser(user)
            .setShow(
                Show.ThinDetail.newBuilder()
                    .setId(show.id)
                    .setTitle(show.title)
                    .setOverview(show.overview)
                    .addAllGenres(show.genresList)
                    .setPosterPath(show.posterPath)
            )
    }
}