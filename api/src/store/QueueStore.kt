package store

import com.google.common.base.Joiner
import queue.Queue
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable
import software.amazon.awssdk.enhanced.dynamodb.Key
import software.amazon.awssdk.enhanced.dynamodb.TableSchema
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSecondaryPartitionKey
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional
import software.amazon.awssdk.enhanced.dynamodb.model.QueryEnhancedRequest
import software.amazon.awssdk.services.dynamodb.DynamoDbClient
import kotlin.streams.toList

class QueueStore(ddb : DynamoDbClient) {

    @DynamoDbBean
    data class DbQueueItem (
        @get:DynamoDbPartitionKey var id : String? = null,
        @get:DynamoDbSecondaryPartitionKey(indexNames = ["user-state-index"]) var userState: String? = null,
        var show : String? = null
    )

    private val client : DynamoDbEnhancedClient = DynamoDbEnhancedClient.builder()
        .dynamoDbClient(ddb)
        .build()

    var dbQueueTable : DynamoDbTable<DbQueueItem> = client.table(
        "queue", TableSchema.fromBean(DbQueueItem::class.java)
    )

    fun addToQueue(userId : String, items: List<Queue.Item>) {
        items.forEach { item ->
            dbQueueTable.putItem(DbQueueItem(
                item.id,
                Joiner.on("-").join(userId, item.state.number),
                item.show.id
            ))
        }
    }

    fun getUserQueue(userId : String, state : Queue.Item.State) : List<DbQueueItem> {
        val stateConcat = Joiner.on("-").join(userId, state.number)

        return dbQueueTable.index("user-state-index").query(
            QueryEnhancedRequest.builder()
                .queryConditional(QueryConditional.keyEqualTo(Key.builder()
                    .partitionValue(stateConcat)
                    .build()))
                .build()
        ).stream()
            .flatMap { it.items().stream() }
            .toList()

    }

    fun deleteQueueItems(ids : List<String>) {
        ids.forEach { id ->
            dbQueueTable.deleteItem(
                Key.builder()
                    .partitionValue(id)
                    .build()
            )
        }
    }
}
