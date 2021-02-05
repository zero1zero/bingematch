import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.dynamodb.DynamoDbClient
import software.amazon.awssdk.services.dynamodb.model.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.util.*
import java.util.stream.Collectors

class Storage(private val passwordUtil: PasswordUtil) {

    private val planTable = "plans"
    private val tradesTable = "trades"
    private val usersTable = "users"

    private val creds = StaticCredentialsProvider.create(
        AwsBasicCredentials.create(
            "AKIA6NDPKVG35G72HFEB",
            "lmz6J6mWHGK58FO6qHKXWfPVhVRPZG1/SrpQ4JW1"
        )
    )
    private val ddb = DynamoDbClient.builder()
        .credentialsProvider(creds)
        .region(Region.US_WEST_2)
        .build()

    fun savePlanAndTrades(planAndTrades: PlanAndTrades, user: User) {
        savePlan(planAndTrades.plan, user)

        for (trade in planAndTrades.trades) {
            saveTrade(trade)
        }
    }

    fun getPlansAndTrades(user: String): List<PlanAndTrades> {
        val plans = this.getPlans(user)

        return plans.stream()
            .map { plan -> PlanAndTrades(plan, this.getTrades(plan.id)) }
            .collect(Collectors.toList())

    }

    fun delPlanAndTrades(planId: String) {
        for (trade in getTrades(planId)) {
            delTrade(trade.id)
        }
        delPlan(planId)
    }

    fun savePlan(plan: Plan, user: User) {
        val attrs = mapOf(
            "id" to AttributeValue.builder()
                .s(plan.id)
                .build(),

            "userId" to AttributeValue.builder()
                .s(user.id)
                .build(),

            "amount" to AttributeValue.builder()
                .n(plan.amount.amount.toString())
                .build(),

            "currency" to AttributeValue.builder()
                .s(plan.amount.currencyUnit.code)
                .build(),

            "start" to AttributeValue.builder()
                .s(plan.timeline.start.format(DateTimeFormatter.ISO_DATE))
                .build(),

            "end" to AttributeValue.builder()
                .s(plan.timeline.end.format(DateTimeFormatter.ISO_DATE))
                .build(),

            "symbol" to AttributeValue.builder()
                .s(plan.symbol)
                .build(),

            "repetition" to AttributeValue.builder()
                .n(plan.frequency.repetition.toString())
                .build(),

            "period" to AttributeValue.builder()
                .s(plan.frequency.period.toString())
                .build()
        )

        // Create a PutItemRequest object
        val request = PutItemRequest.builder()
            .tableName(planTable)
            .item(attrs)
            .build()

        ddb.putItem(request)
    }

    private fun toPlan(value : Map<String, AttributeValue>): List<Plan> {
        return this.toPlan(Collections.singletonList(value))
    }

    private fun toPlan(values : List<Map<String, AttributeValue>>) : List<Plan> {
        return values.stream()
            .map { i ->
                Plan(
                    i["userId"]!!.s(),
                    newMoney(i["amount"]!!.n().toDouble()),
                    Timeline(
                        LocalDate.parse(i["start"]!!.s()),
                        LocalDate.parse(i["end"]!!.s())
                    ),
                    i["symbol"]!!.s(),
                    Frequency(i["repetition"]!!.n().toInt(), ChronoUnit.valueOf(i["period"]!!.s().toUpperCase())),
                    i["id"]!!.s()
                )
            }
            .collect(Collectors.toList())
    }

    fun getPlan(id : String) : Plan {
        val attrs = mapOf(
            "id" to AttributeValue.builder()
                .s(id)
                .build()
        )

        // Create a PutItemRequest object
        val request = GetItemRequest.builder()
            .tableName(usersTable)
            .key(attrs)
            .build()

        val response: GetItemResponse = ddb.getItem(request)

        return toPlan(response.item()).first()
    }

    fun getPlans(user: String): List<Plan> {
        val attrs = mapOf(
            ":userId" to AttributeValue.builder()
                .s(user)
                .build()
        )

        val queryReq = QueryRequest.builder()
            .tableName(planTable)
            .indexName("userId-index")
            .keyConditionExpression("userId = :userId")
            .expressionAttributeValues(attrs)
            .build()

        val response: QueryResponse = ddb.query(queryReq)

        return toPlan(response.items())
    }

    fun delPlan(planId: String) {
        val attrs = mapOf(
            "id" to AttributeValue.builder()
                .s(planId)
                .build()
        )

        val deleteReq = DeleteItemRequest.builder()
            .tableName(planTable)
            .key(attrs)
            .build()

        ddb.deleteItem(deleteReq)
    }

    fun saveTrade(trade: Trade) {
        val attrs = mapOf(
            "id" to AttributeValue.builder()
                .s(trade.id)
                .build(),

            "planId" to AttributeValue.builder()
                .s(trade.plan)
                .build(),

            "symbol" to AttributeValue.builder()
                .s(trade.symbol)
                .build(),

            "tradeDay" to AttributeValue.builder()
                .s(trade.day.format(DateTimeFormatter.ISO_DATE))
                .build(),

            "amount" to AttributeValue.builder()
                .n(trade.amount.amount.toString())
                .build(),

            "currency" to AttributeValue.builder()
                .s(trade.amount.currencyUnit.code)
                .build()
        )

        // Create a PutItemRequest object
        val request = PutItemRequest.builder()
            .tableName(tradesTable)
            .item(attrs)
            .build()

        ddb.putItem(request)
    }

    private fun toTrade(items : List<Map<String, AttributeValue>>) : List<Trade> {
        return items.stream()
            .map { i ->
                Trade(
                    LocalDate.parse(i["tradeDay"]!!.s()),
                    newMoney(i["amount"]!!.n().toDouble()),
                    i["symbol"]!!.s(),
                    i["planId"]!!.s(),
                    i["id"]!!.s()
                )
            }
            .collect(Collectors.toList())
    }

    fun getTrades(date: LocalDate): List<Trade> {
        val attrs = mapOf(
            ":tradeDay" to AttributeValue.builder()
                .s(date.format(DateTimeFormatter.ISO_DATE))
                .build()
        )

        val queryReq = QueryRequest.builder()
            .tableName(tradesTable)
            .indexName("tradeDay-index")
            .keyConditionExpression("tradeDay = :tradeDay")
            .expressionAttributeValues(attrs)
            .build()

        val response: QueryResponse = ddb.query(queryReq)

        return toTrade(response.items())
    }

    private fun getTrades(planId: String): List<Trade> {
        val attrs = mapOf(
            ":planId" to AttributeValue.builder()
                .s(planId)
                .build()
        )

        val queryReq = QueryRequest.builder()
            .tableName(tradesTable)
            .indexName("planId-index")
            .keyConditionExpression("planId = :planId")
            .expressionAttributeValues(attrs)
            .build()

        val response: QueryResponse = ddb.query(queryReq)

        return toTrade(response.items())
    }

    fun delTrade(tradeId: String) {
        val keys = mapOf(
            "id" to AttributeValue.builder()
                .s(tradeId)
                .build()
        )

        val deleteReq = DeleteItemRequest.builder()
            .tableName(tradesTable)
            .key(keys)
            .build()

        ddb.deleteItem(deleteReq)
    }

    fun getUserByLogin(email: String, password: String): Result<User> {

        val attrs = mapOf(
            ":email" to AttributeValue.builder()
                .s(email)
                .build()
        )

        val queryReq = QueryRequest.builder()
            .tableName(usersTable)
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

        return Result.success(User(item["email"]!!.s(), id = item["id"]!!.s()))
    }

    fun getUserByEmail(email: String): Result<User> {

        val attrs = mapOf(
            ":email" to AttributeValue.builder()
                .s(email)
                .build()
        )

        val queryReq = QueryRequest.builder()
            .tableName(usersTable)
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

        return Result.success(User(item["email"]!!.s(), id = item["id"]!!.s()))
    }

    fun getUser(id: String): Result<User> {
        val attrs = mapOf(
            "id" to AttributeValue.builder()
                .s(id)
                .build()
        )

        // Create a PutItemRequest object
        val request = GetItemRequest.builder()
            .tableName(usersTable)
            .key(attrs)
            .build()

        val response: GetItemResponse = ddb.getItem(request)

        if (!response.hasItem()) {
            return Result.failure(UserNotFoundException())
        }

        val item = response.item()

        return Result.success(
            User(
                email = item["email"]!!.s(),
                phone = item["phone"]?.s(),
                id = item["id"]!!.s()
            )
        )
    }

    fun createUser(signUp: Register): User {
        val user = User(signUp.email)

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
            .tableName(usersTable)
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
            .tableName(usersTable)
            .key(key)
            .attributeUpdates(attrs)
            .build()

        ddb.updateItem(request)
    }

    fun updateUser(user: User): User {
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
            "phone" to AttributeValueUpdate.builder()
                .value(
                    AttributeValue.builder()
                        .s(user.phone)
                        .build()
                )
                .build()
        )

        val request = UpdateItemRequest.builder()
            .tableName(usersTable)
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
            .tableName(usersTable)
            .key(keyToGet)
            .build()

        ddb.deleteItem(deleteReq)
    }
}

class UnauthorizedException : RuntimeException("not-authorized")
class UserNotFoundException : RuntimeException("user-not-found")
class UserAlreadyExists : RuntimeException("user-exists")
