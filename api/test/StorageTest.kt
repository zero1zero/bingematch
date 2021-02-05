import org.junit.Test
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import kotlin.test.assertEquals

internal class StorageTest {

    /**
     * I dont know, just save some stuff and delete it
     */
    @Test
    fun saveTrade() {
        val storage = Storage(PasswordUtil())

        val trade = Trade(LocalDate.parse("2020-05-01"), newMoney(1000.0), "NKE", "plan-id")

        storage.saveTrade(trade)

        assertEquals(1, storage.getTrades(LocalDate.parse("2020-05-01")).size)

        storage.delTrade(trade.id)
    }

    @Test
    fun savePlan() {
        val storage = Storage(PasswordUtil())

        val user = User("test@test.com")
        val plan = Plan(
            user.id, newMoney(1000.0),
            Timeline(
                LocalDate.parse("2020-05-01"),
                LocalDate.parse("2020-07-01")
            ),
            "NKE",
            Frequency(1, ChronoUnit.WEEKS)
        )

        storage.savePlan(plan, user)

        assertEquals(1, storage.getPlans(user.id).size)

        storage.delPlan(plan.id)
    }

    @Test
    fun todaysTrades() {
        val storage = Storage(PasswordUtil())

        //
        for (trade in storage.getTrades(LocalDate.now())) {
            println(trade)
        }
    }
}

