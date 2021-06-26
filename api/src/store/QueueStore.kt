package store

import queue.Queue

class QueueStore() {

    fun addToQueue(userId : String, items: List<Queue.Item>) {
    }

    fun getUserQueue(userId : String, state : Queue.Item.State) : List<String> { //todo
        return listOf()
    }

    fun deleteQueueItems(ids : List<String>) {
    }
}
