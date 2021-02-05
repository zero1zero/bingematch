import org.joda.money.CurrencyUnit
import org.joda.money.Money
import org.junit.Test
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import kotlin.test.assertEquals

internal class TradeCalculatorTest {

    @Test
    fun basic() {
        val scheduledPlan = createScheduledPlan(20_000.0, "2020-05-01", "2020-12-01", "NKE", 1, ChronoUnit.MONTHS)

        assertPlanMatch(
            listOf(
                Trade(LocalDate.parse("2020-05-01"), Money.of(CurrencyUnit.USD, 2500.00), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-06-01"), Money.of(CurrencyUnit.USD, 2500.00), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-07-01"), Money.of(CurrencyUnit.USD, 2500.00), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-08-01"), Money.of(CurrencyUnit.USD, 2500.00), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-09-01"), Money.of(CurrencyUnit.USD, 2500.00), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-10-01"), Money.of(CurrencyUnit.USD, 2500.00), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-11-01"), Money.of(CurrencyUnit.USD, 2500.00), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-12-01"), Money.of(CurrencyUnit.USD, 2500.00), "NKE", "kfNTQqgvQaOtlldc")
            ), scheduledPlan
        )
    }

    @Test
    fun basicMore() {
        val scheduledPlan = createScheduledPlan(100_000.0, "2020-05-01", "2020-07-01", "NKE", 1, ChronoUnit.WEEKS)

        assertPlanMatch(
            listOf(
                Trade(LocalDate.parse("2020-05-01"), Money.of(CurrencyUnit.USD, 11_111.11), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-05-08"), Money.of(CurrencyUnit.USD, 11_111.11), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-05-15"), Money.of(CurrencyUnit.USD, 11_111.11), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-05-22"), Money.of(CurrencyUnit.USD, 11_111.11), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-05-29"), Money.of(CurrencyUnit.USD, 11_111.11), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-06-05"), Money.of(CurrencyUnit.USD, 11_111.11), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-06-12"), Money.of(CurrencyUnit.USD, 11_111.11), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-06-19"), Money.of(CurrencyUnit.USD, 11_111.11), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-06-26"), Money.of(CurrencyUnit.USD, 11_111.11), "NKE", "kfNTQqgvQaOtlldc")
            ), scheduledPlan
        )
    }

    @Test
    fun basicRepetition() {
        val scheduledPlan = createScheduledPlan(100_000.0, "2020-05-01", "2020-07-01", "ALK", 2, ChronoUnit.WEEKS)

        assertPlanMatch(
            listOf(
                Trade(LocalDate.parse("2020-05-01"), Money.of(CurrencyUnit.USD, 20_000.0), "ALK", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-05-15"), Money.of(CurrencyUnit.USD, 20_000.0), "ALK", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-05-29"), Money.of(CurrencyUnit.USD, 20_000.0), "ALK", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-06-12"), Money.of(CurrencyUnit.USD, 20_000.0), "ALK", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-06-26"), Money.of(CurrencyUnit.USD, 20_000.0), "ALK", "kfNTQqgvQaOtlldc")
            ), scheduledPlan
        )
    }

    @Test
    fun ruoxi() {
        val scheduledPlan = createScheduledPlan(500_000.0, "2020-04-11", "2021-01-01", "NKE", 3, ChronoUnit.WEEKS)

        assertPlanMatch(
            listOf(
                Trade(LocalDate.parse("2020-04-11"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-05-02"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-05-23"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-06-13"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-07-04"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-07-25"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-08-15"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-09-05"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-09-26"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-10-17"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-11-07"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-11-28"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc"),
                Trade(LocalDate.parse("2020-12-19"), Money.of(CurrencyUnit.USD, 38461.54), "NKE", "kfNTQqgvQaOtlldc")
            ), scheduledPlan
        )
    }

    private fun assertPlanMatch(expectedTrade: List<Trade>, expectedTrades: List<Trade>) {
        for ((index, expected) in expectedTrade.withIndex()) {
            assertEquals(expectedTrade[index].day, expected.day)
            assertEquals(expectedTrade[index].amount, expected.amount)
            assertEquals(expectedTrade[index].symbol, expected.symbol)
            assertEquals(expectedTrade[index].plan, expected.plan)
        }

        for (schedulePlan in expectedTrades) {
            println(schedulePlan)
        }
    }

    private fun createScheduledPlan(
        amount: Double,
        start: String,
        end: String,
        symbol: String,
        repetition: Int,
        period: ChronoUnit
    ): List<Trade> {
        val plan = Plan(
            "jimbo",
            Money.of(CurrencyUnit.USD, amount),
            Timeline(LocalDate.parse(start), LocalDate.parse(end)),
            symbol,
            Frequency(repetition, period)
        )

        val calculator = TradeCalculator()
        return calculator.createTradeSchedule(plan)
    }
}
