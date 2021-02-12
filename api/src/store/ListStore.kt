package store

import ListItem
import com.google.common.base.Joiner
import software.amazon.awssdk.services.dynamodb.DynamoDbClient
import software.amazon.awssdk.services.dynamodb.model.*
import java.time.Instant
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.HashMap


class ListStore(private val ddb : DynamoDbClient) {

    private val table = "list"

    fun addToList(userId : String, items: List<ListItem>) {
        val allOperations = items.map { item ->
            val attrs = mapOf(
                "id" to AttributeValue.builder()
                    .s(item.id)
                    .build(),
                "userState" to AttributeValue.builder()
                    .s(Joiner.on("-").join(userId, item.state.ord))
                    .build(),
                "tmdbId" to AttributeValue.builder()
                    .n(item.tmdbId.toString())
                    .build(),
                "created" to AttributeValue.builder()
                    .s(item.created.format(DateTimeFormatter.ISO_DATE))
                    .build(),
                "updated" to AttributeValue.builder()
                    .s(item.updated.format(DateTimeFormatter.ISO_DATE))
                    .build()
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

    fun getUserList(userId : String, state : ListItem.State) : List<ListItem> {
        val attrs = mapOf(
            ":userState" to AttributeValue.builder()
                .s(Joiner.on("-").join(userId, state.ord))
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
                ListItem(
                    json["tmdbId"]!!.n().toInt(),
                    ListItem.State.fromInt(stateSplit.toInt()),
                    LocalDate.parse(json["created"]!!.s()),
                    LocalDate.parse(json["updated"]!!.s()),
                    json["id"]!!.s()
                )
            }.toList()
    }

    fun deleteListItems(ids : List<String>) {
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
