package queue

import catalog.Catalog
import etc.generateId
import show.Show

class Queues(private val catalog : Catalog) {

    fun getQueued() : Queue.QueuedItems {
        val all = Queue.QueuedItems.newBuilder()

        //todo, pull from db for their queue
        catalog.getPopular()
            .filter { it.hasMovie() || it.hasTv() }
            .filter { it.movie.runtime > 50 || it.tv.seasons > 0 }
            .forEach { detail ->
                all.addItems(
                    Queue.QueuedItem.newBuilder()
                    .setId(generateId())
                    .setShow(
                        Show.ThinDetail.newBuilder()
                        .setId(detail.id)
                        .setTitle(detail.title)
                        .setOverview(detail.overview)
                        .addAllGenres(detail.genresList)
                        .setPosterPath(detail.posterPath)
                    )
                )
        }

        return all.build()
    }
}