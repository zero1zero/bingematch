import com.fasterxml.jackson.annotation.JsonProperty
import org.apache.commons.lang3.RandomStringUtils
import org.joda.money.Money
import java.time.LocalDate
import java.time.temporal.ChronoUnit

data class Frequency(
    @JsonProperty("repetition") val repetition: Int,
    @JsonProperty("period") val period: ChronoUnit
) {
    init {
        assert(repetition > 0) { "repetition must be greater than 0" }
    }
}

data class Timeline(
    @JsonProperty("start") val start: LocalDate,
    @JsonProperty("end") val end: LocalDate
)

data class Plan(
    @JsonProperty("user") val user: String,
    @JsonProperty("amount") val amount: Money,
    @JsonProperty("timeline") val timeline: Timeline,
    @JsonProperty("symbol") val symbol: String,
    @JsonProperty("frequency") val frequency: Frequency,
    @JsonProperty("id") val id: String = RandomStringUtils.randomAlphabetic(16)
)

data class TestPlan(
    @JsonProperty("amount") val amount: Money,
    @JsonProperty("timeline") val timeline: Timeline,
    @JsonProperty("symbol") val symbol: String,
    @JsonProperty("frequency") val frequency: Frequency
) {
    /**
     * Only real reason for this to exist is for testing
     */
    var id: String = RandomStringUtils.randomAlphabetic(16)

    fun toPlan(): Plan {
        return Plan("anon", amount, timeline, symbol, frequency, id)
    }
}

data class Trade(
    @JsonProperty("day") val day: LocalDate,
    @JsonProperty("amount") val amount: Money,
    @JsonProperty("symbol") val symbol: String,
    @JsonProperty("plan") val plan: String,
    @JsonProperty("id") val id: String = RandomStringUtils.randomAlphabetic(16)
)

data class PlanAndTrades(
    @JsonProperty("plan") val plan: Plan,
    @JsonProperty("trades") val trades: List<Trade>
)

data class Register(
    @JsonProperty("email") val email: String,
    @JsonProperty("password") val password: String
)

data class Login(
    @JsonProperty("email") val email: String,
    @JsonProperty("password") val password: String
)

data class User(
    @JsonProperty("email") val email: String,
    @JsonProperty("phone") val phone: String? = null,
    @JsonProperty("id") val id: String = RandomStringUtils.randomAlphabetic(16)
)

data class UpdateUser(
    @JsonProperty("email") val email: String,
    @JsonProperty("phone") val phone: String = "",
    @JsonProperty("password") val password: String = ""
)

