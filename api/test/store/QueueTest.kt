package store

import etc.generateId
import org.apache.commons.lang3.RandomUtils
import org.junit.Test
import queue.Queue
import kotlin.test.assertEquals

internal class QueueTest {

    @Test
    fun putAndGetItems() {
        val awsUtil = AWSUtil()
        val queueStore = QueueStore(awsUtil.ddb)

        val items = MutableList(10) {
            Queue.Item.newBuilder()
                .setId(generateId())
                .setTmdbid(RandomUtils.nextInt())
                .setState(Queue.Item.State.Queued)
                .build()
        }

        queueStore.addToQueue("tester", items)

        val queried = queueStore.getUserQueue("tester", Queue.Item.State.Queued)
            .sortedBy { it.id }

        assertEquals(items.intersect(queried).size, items.size)

        queueStore.deleteQueueItems(queried.map { it.id })

        assertEquals(0, queueStore.getUserQueue("tester", Queue.Item.State.Queued).size)
    }
}