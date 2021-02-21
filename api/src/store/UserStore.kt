package store

import etc.PasswordUtil
import etc.generateId
import software.amazon.awssdk.services.dynamodb.DynamoDbClient
import software.amazon.awssdk.services.dynamodb.model.AttributeValue
import software.amazon.awssdk.services.dynamodb.model.AttributeValueUpdate
import software.amazon.awssdk.services.dynamodb.model.DeleteItemRequest
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest
import software.amazon.awssdk.services.dynamodb.model.QueryRequest
import software.amazon.awssdk.services.dynamodb.model.QueryResponse
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest
import user.User
import java.util.*

class UserStore(private val passwordUtil: PasswordUtil,
                private val ddb : DynamoDbClient) {

    private val table = "users"

    fun getUserByLogin(email: String, password: String): Result<User.Detail> {

        val attrs = mapOf(
            ":email" to AttributeValue.builder()
                .s(email)
                .build()
        )

        val queryReq = QueryRequest.builder()
            .tableName(table)
            .indexName("email-index")
            .limit(1)
            .keyConditionExpression("email = :email")
            .expressionAttributeValues(attrs)
            .build()

        val response: QueryResponse = ddb.query(queryReq)

        if (response.count() == 0) {
            return Result.failure(UnauthorizedException())
        }

        val item = response.items()[0]

        //if pw doesnt match, scratch it
        if (!passwordUtil.verify(password, item["hash"]!!.s())) {
            return Result.failure(RuntimeException("password hash mismatch"))
        }

        return Result.success(
            User.Detail.newBuilder()
                .setEmail(item["email"]!!.s())
                .setId(item["id"]!!.s())
                .build()
        )
    }

    fun getUserByEmail(email: String): Result<User.Detail> {

        val attrs = mapOf(
            ":email" to AttributeValue.builder()
                .s(email)
                .build()
        )

        val queryReq = QueryRequest.builder()
            .tableName(table)
            .indexName("email-index")
            .limit(1)
            .keyConditionExpression("email = :email")
            .expressionAttributeValues(attrs)
            .build()

        val response: QueryResponse = ddb.query(queryReq)

        if (response.count() == 0) {
            return Result.failure(UserNotFoundException())
        }

        val item = response.items()[0]

        return Result.success(
            User.Detail.newBuilder()
                .setEmail(item["email"]!!.s())
                .setId(item["id"]!!.s())
                .build()
        )
    }

    fun getUser(id: String): Result<User.Detail> {
        val attrs = mapOf(
            "id" to AttributeValue.builder()
                .s(id)
                .build()
        )

        // Create a PutItemRequest object
        val request = GetItemRequest.builder()
            .tableName(table)
            .key(attrs)
            .build()

        val response: GetItemResponse = ddb.getItem(request)

        if (!response.hasItem()) {
            return Result.failure(UserNotFoundException())
        }

        val item = response.item()

        return Result.success(
            User.Detail.newBuilder()
                .setEmail(item["email"]!!.s())
                .setId(item["id"]!!.s())
                .build()
        )
    }

    fun createUser(signUp: User.Register): User.Detail {
        val user = User.Detail.newBuilder()
            .setId(generateId())
            .setEmail(signUp.email)
            .build()

        val attrs = mapOf(
            "id" to AttributeValue.builder()
                .s(user.id)
                .build(),
            "email" to AttributeValue.builder()
                .s(user.email)
                .build(),
            "hash" to AttributeValue.builder()
                .s(passwordUtil.hash(signUp.password))
                .build()

        )

        val request = PutItemRequest.builder()
            .tableName(table)
            .item(attrs)
            .build()

        ddb.putItem(request)

        return user
    }

    fun savePassword(id: String, password: String) {
        val key = mapOf(
            "id" to AttributeValue.builder()
                .s(id)
                .build()
        )
        val attrs = mapOf(
            "hash" to AttributeValueUpdate.builder()
                .value(
                    AttributeValue.builder()
                        .s(passwordUtil.hash(password))
                        .build()
                )
                .build()
        )

        val request = UpdateItemRequest.builder()
            .tableName(table)
            .key(key)
            .attributeUpdates(attrs)
            .build()

        ddb.updateItem(request)
    }

    fun updateUser(user: User.Detail): User.Detail {
        val key = mapOf(
            "id" to AttributeValue.builder()
                .s(user.id)
                .build()
        )
        val attrs = mapOf(
            "email" to AttributeValueUpdate.builder()
                .value(
                    AttributeValue.builder()
                        .s(user.email)
                        .build()
                )
                .build(),
        )

        val request = UpdateItemRequest.builder()
            .tableName(table)
            .key(key)
            .attributeUpdates(attrs)
            .build()

        ddb.updateItem(request)

        return user
    }

    fun delUser(user: String) {
        val keyToGet = HashMap<String, AttributeValue>()

        keyToGet["id"] = AttributeValue.builder()
            .s(user)
            .build()

        val deleteReq = DeleteItemRequest.builder()
            .tableName(table)
            .key(keyToGet)
            .build()

        ddb.deleteItem(deleteReq)
    }
}

class UnauthorizedException : RuntimeException("not-authorized")
class UserNotFoundException : RuntimeException("user-not-found")
class UserAlreadyExists : RuntimeException("user-exists")
