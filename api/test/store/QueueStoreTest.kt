package store

import etc.generateId
import org.junit.Test
import org.junit.jupiter.api.Assertions.assertEquals
import queue.Queue
import show.Show

internal class QueueStoreTest {

    @Test
    fun crud() {
        val awsUtil = AWSUtil()
        val queueStore = QueueStore(awsUtil.ddb)


        val itemID = generateId()
        val item = Queue.Item.newBuilder()
            .setId(itemID)
            .setState(Queue.Item.State.Queued)
            .setShow(Show.Detail.newBuilder()
                .setId("testQueueStoreTestID")
                .build())
            .build()

        queueStore.addToQueue("testQueueStoreTestUser", listOf(item))

        val queue = queueStore.getUserQueue("testQueueStoreTestUser", Queue.Item.State.Queued).toList()

        assertEquals(1, queue.size)

        queue.forEach { storedItem ->
            assertEquals(itemID, storedItem.id)
            assertEquals("testQueueStoreTestUser-${Queue.Item.State.Queued.number}", storedItem.userState)
            assertEquals("testQueueStoreTestID", storedItem.show)
        }

        queueStore.deleteQueueItems(listOf(itemID))
    }
}