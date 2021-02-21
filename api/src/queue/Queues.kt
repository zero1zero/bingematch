package queue

import catalog.Catalog
import etc.generateId

class Queues(private val catalog : Catalog) {

    fun getQueued() : Queue.AllItems {
        val all = Queue.AllItems.newBuilder()

        catalog.getPopular().forEach { movie ->
                all.addItems(Queue.Item.newBuilder()
                    .setId(generateId())
                    .setState(Queue.Item.State.Queued)
                    .setMovie(movie)
                )
        }

        return all.build()
    }
}