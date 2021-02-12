package store

import ListItem
import org.apache.commons.lang3.RandomUtils
import org.junit.Test
import java.time.LocalDate
import kotlin.test.assertEquals


internal class ListStoreTest {

    @Test
    fun putAndGetItems() {
        val awsUtil = AWSUtil()
        val listStore = ListStore(awsUtil.ddb)

        val items = MutableList(10) {ListItem(RandomUtils.nextInt(), ListItem.State.QUEUED, LocalDate.now(), LocalDate.now())}
            .sortedBy { it.id }

        listStore.addToList("tester", items)

        val queried = listStore.getUserList("tester", ListItem.State.QUEUED)
            .sortedBy { it.id }

        assertEquals(items, queried)

        listStore.deleteListItems(queried.map { it.id })

        assertEquals(0, listStore.getUserList("tester", ListItem.State.QUEUED).size)
    }
}