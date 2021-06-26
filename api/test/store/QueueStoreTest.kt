package store

import etc.generateId
import org.junit.Test
import queue.Queue
import show.Show

internal class QueueStoreTest {

    @Test
    fun crud() {
        val itemID = generateId()
        val item = Queue.Item.newBuilder()
            .setId(itemID)
            .setState(Queue.Item.State.Queued)
            .setShow(Show.Detail.newBuilder()
                .setId("testQueueStoreTestID")
                .build())
            .build()

    }
}