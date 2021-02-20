package store

import com.google.common.base.Joiner
import queue.Queue
import software.amazon.awssdk.services.dynamodb.DynamoDbClient
import software.amazon.awssdk.services.dynamodb.model.AttributeValue
import software.amazon.awssdk.services.dynamodb.model.BatchWriteItemRequest
import software.amazon.awssdk.services.dynamodb.model.QueryRequest
import software.amazon.awssdk.services.dynamodb.model.QueryResponse
import software.amazon.awssdk.services.dynamodb.model.WriteRequest


class QueueStore(private val ddb : DynamoDbClient) {

    private val table = "queue"

    fun addToQueue(userId : String, items: List<Queue.Item>) {
        val allOperations = items.map { item ->
            val attrs = mapOf(
                "id" to AttributeValue.builder()
                    .s(item.id)
                    .build(),
                "userState" to AttributeValue.builder()
                    .s(Joiner.on("-").join(userId, item.state.number))
                    .build(),
                "tmdbId" to AttributeValue.builder()
                    .n(item.tmdbid.toString())
                    .build(),
            )

            WriteRequest.builder()
                .putRequest { builder -> builder.item(attrs)}
                .build()
        }.toList()

        val batch = BatchWriteItemRequest.builder()
            .requestItems(mutableMapOf(table to allOperations))
            .build()

        ddb.batchWriteItem(batch)
    }

    fun getUserQueue(userId : String, state : Queue.Item.State) : List<Queue.Item> {
        val attrs = mapOf(
            ":userState" to AttributeValue.builder()
                .s(Joiner.on("-").join(userId, state.number))
                .build()
        )

        val queryReq = QueryRequest.builder()
            .tableName(table)
            .indexName("user-state-index")
            .keyConditionExpression("userState = :userState")
            .expressionAttributeValues(attrs)
            .build()

        val response: QueryResponse = ddb.query(queryReq)

        return response.items()
            .map { json ->
                val stateSplit = json["userState"]!!.s().split('-')[1]
                Queue.Item.newBuilder()
                    .setTmdbid(json["tmdbId"]!!.n().toInt())
                    .setState(Queue.Item.State.forNumber(stateSplit.toInt()))
                    .setId(json["id"]!!.s())
                    .build()
            }.toList()
    }

    fun deleteQueueItems(ids : List<String>) {
        val allOperations = ids.map { item ->
            val attrs = mapOf(
                "id" to AttributeValue.builder()
                    .s(item)
                    .build()
            )

            WriteRequest.builder()
                .deleteRequest{ builder -> builder.key(attrs)}
                .build()
        }.toList()

        val batch = BatchWriteItemRequest.builder()
            .requestItems(mutableMapOf(table to allOperations))
            .build()

        ddb.batchWriteItem(batch)
    }
}
