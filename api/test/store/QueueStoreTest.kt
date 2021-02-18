package store

import etc.generateId
import movie.Queue
import org.apache.commons.lang3.RandomUtils
import org.junit.Test
import kotlin.test.assertEquals

internal class QueueStoreTest {

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
            .sortedBy { it.id }

        queueStore.addToList("tester", items)

        val queried = queueStore.getUserList("tester", Queue.Item.State.Queued)
            .sortedBy { it.id }

        assertEquals(items, queried)

        queueStore.deleteQueueItems(queried.map { it.id })

        assertEquals(0, queueStore.getUserList("tester", Queue.Item.State.Queued).size)
    }
}