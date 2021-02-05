import auth.JwtConfig
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.databind.exc.InvalidFormatException
import com.fasterxml.jackson.databind.exc.ValueInstantiationException
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import io.ktor.application.Application
import io.ktor.application.ApplicationCall
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.auth.*
import io.ktor.auth.jwt.jwt
import io.ktor.features.CORS
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.StatusPages
import io.ktor.http.ContentType
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.jackson.JacksonConverter
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.*
import org.joda.money.Money
import java.time.LocalDate
import java.util.stream.Collectors

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
fun Application.module() {

    //dependencies
    val passwordUtil = PasswordUtil()
    val tradeCalculator = TradeCalculator()
    val storage = Storage(passwordUtil)
    val stockDataSource = StockDataSource()
    val notifier = Notifier()

    install(Authentication) {
        /**
         * Setup the JWT authentication to be used in [Routing].
         * If the token is valid, the corresponding [User] is fetched from the database.
         * The [User] can then be accessed in each [ApplicationCall].
         */
        jwt {
            verifier(JwtConfig.verifier)
            realm = "vestly.io"
            validate { it ->
                it.payload.getClaim("id").asString().let {
                    UserIdPrincipal(storage.getUser(it).getOrThrow().id)
                }
            }
        }
    }

    install(CORS) {
        host("localhost:3000")
        host("vestly.io")
        header("Authorization")
        method(HttpMethod.Options)
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        allowNonSimpleContentTypes = true
    }

    install(CallLogging) {
        filter { call ->
            println(call.request.headers)
            true
        }
    }

    install(StatusPages) {
        exception<ValueInstantiationException> { cause ->
            call.respond(HttpStatusCode.BadRequest, cause.originalMessage)
        }

        exception<InvalidFormatException> { cause ->
            call.respond(HttpStatusCode.BadRequest, cause.originalMessage)
        }

        exception<StockDataSource.StockNotFoundException> { cause ->
            call.respond(HttpStatusCode.NotFound, cause.localizedMessage)
        }
    }

    install(ContentNegotiation) {
        register(ContentType.Application.Json, JacksonConverter(objectMapper.apply {
            enable(SerializationFeature.INDENT_OUTPUT)
            registerModule(JavaTimeModule())

            val module = SimpleModule()
            module.addSerializer(Money::class.java, MoneySerializer())
            module.addDeserializer(Money::class.java, MoneyDeserializer())
            module.addSerializer(LocalDate::class.java, LocalDateSerializer())
            module.addDeserializer(LocalDate::class.java, LocalDateDeserializer())
            registerModule(module)
        }))
    }

    routing {
        route("/test") {
            get("/") {
                call.respond(HttpStatusCode.Accepted)
            }
        }
        route("/user") {

            /**
             * Login user
             */
            post("/login") {
                val credentials = call.receive<Login>()
                val user = storage.getUserByLogin(credentials.email, credentials.password)

                user
                    .onFailure {
                        call.respond(ForbiddenResponse())
                    }
                    .onSuccess {
                        val token: String = JwtConfig.makeToken(it)
                        call.respondText(token)
                    }
            }

            /**
             * Create new user
             */
            post("/") {
                val newUser = call.receive<Register>()

                storage.getUserByEmail(newUser.email)
                    .onFailure {
                        //user is not found, we're good to create
                        val user = storage.createUser(newUser)
                        val token: String = JwtConfig.makeToken(user)

                        call.respond(UserWToken(user, token))
                    }
                    .onSuccess {
                        //user is found, no duplicates
                        call.respond(HttpStatusCode.BadRequest, UserAlreadyExists().message!!)
                    }
            }

            /**
             * Create new user w/ a starting plan
             */
            post("/wplan") {
                val createPlan = call.receive(CreateUserWithPlan::class)

                val schedule = tradeCalculator.createTradeSchedule(createPlan.plan.toPlan())
                val planAndTrades = PlanAndTrades(createPlan.plan.toPlan(), schedule)

                val user = storage.createUser(createPlan.signUp)
                storage.savePlanAndTrades(planAndTrades, user)

                val token: String = JwtConfig.makeToken(user)

                call.respondText(token)
            }

            authenticate {
                /**
                 * Get user by id
                 */
                get("/{id}") {
                    val id: String = call.parameters["id"]!!

                    //check principal
                    if (principalNoMatch(id, call)) return@get

                    storage.getUser(id)
                        .onFailure {
                            call.respond(HttpStatusCode.NotFound)
                        }.onSuccess {
                            call.respond(it)
                        }
                }

                /**
                 * Update user
                 */
                put("/{id}") {
                    val updateUser = call.receive<UpdateUser>()
                    val id: String = call.parameters["id"]!!

                    val user = User(updateUser.email, phone = updateUser.phone, id = id)

                    storage.updateUser(user)

                    if (updateUser.password != "") {
                        storage.savePassword(id, updateUser.password)
                    }

                    call.respond(HttpStatusCode.OK)
                }

                /**
                 * Delete user
                 */
                delete("/{id}") {
                    val id: String = call.parameters["id"]!!

                    //check principal
                    if (principalNoMatch(id, call)) return@delete

                    storage.delUser(id)

                    call.respond(HttpStatusCode.Accepted)
                }
            }
        }
        route("/plan") {
            post("/test") {
                val plan = call.receive(TestPlan::class)

                //test if symbol exists
                stockDataSource.getPrice(plan.symbol)

                val schedule = tradeCalculator.createTradeSchedule(plan.toPlan())

                val planAndTrades = PlanAndTrades(plan.toPlan(), schedule)

                call.respond(planAndTrades)
            }

            authenticate {
                post("/") {
                    val principal = call.principal<UserIdPrincipal>()

                    val user = storage.getUser(principal!!.name).getOrThrow()

                    val plan = call.receive(CreatePlan::class).toPlan(user.id)

                    val schedule = tradeCalculator.createTradeSchedule(plan)

                    val planAndTrades = PlanAndTrades(plan, schedule)

                    storage.savePlanAndTrades(planAndTrades, user)

                    call.respond(planAndTrades)
                }

                delete("/{id}") {
                    val planId = call.parameters["id"].toString()
                    val principal = call.principal<UserIdPrincipal>()

                    val planO = storage.getPlans(principal!!.name).stream()
                        .filter {
                            it.id == planId
                        }
                        .findFirst()

                    if (planO.isEmpty) {
                        call.respond(404)
                        return@delete
                    }

                    val plan = planO.get()

                    //check principal
                    if (principalNoMatch(plan.user, call)) return@delete

                    storage.delPlanAndTrades(planId)

                    call.respond(200)
                }
            }
        }

        route("/trade") {
            authenticate {
                get("/all") {
                    val principal = call.principal<UserIdPrincipal>()

                    val user = storage.getUser(principal!!.name).getOrThrow()

                    call.respond(storage.getPlansAndTrades(user.id))
                }
            }
        }

        route("/stock") {
            get("/{symbol}/") {
                val symbol = call.parameters["symbol"].toString()

                call.respond(stockDataSource.getCompany(symbol))
            }
            authenticate {
                get("/chart") {
                    val principal = call.principal<UserIdPrincipal>()

                    val user = storage.getUser(principal!!.name).getOrThrow()

                    val symbols = storage.getPlans(user.id).stream()
                        .map { it.symbol }
                        .collect(Collectors.toSet())

                    symbols.add("VTI")

                    call.respond(stockDataSource.getCharts(symbols))
                }
            }
        }

        route("/exec") {
            post("/trades") {
                for (trade in storage.getTrades(LocalDate.now())) {
                    val plan = storage.getPlan(trade.plan)
                    val user = storage.getUser(plan.user)

                    //assume data is consistent
                    notifier.notifyOfTrade(user.getOrThrow(), trade)
                }
            }
        }
    }
}

suspend fun principalNoMatch(userId: String, call: ApplicationCall): Boolean {

    val principal = call.principal<UserIdPrincipal>()

    if (principal == null || principal.name != userId) {
        call.respond(HttpStatusCode.Forbidden)
        return true
    }

    return false
}

data class CreateUserWithPlan(
    @JsonProperty("register") val signUp: Register,
    @JsonProperty("plan") val plan: TestPlan
)

data class CreatePlan(
    @JsonProperty("amount") val amount: Money,
    @JsonProperty("timeline") val timeline: Timeline,
    @JsonProperty("symbol") val symbol: String,
    @JsonProperty("frequency") val frequency: Frequency
) {
    fun toPlan(user: String): Plan {
        return Plan(user, amount, timeline, symbol, frequency)
    }
}

data class UserWToken(
    @JsonProperty("user") val user: User,
    @JsonProperty("token") val token: String
)

val objectMapper = ObjectMapper()

