import kotlinx.coroutines.runBlocking
import org.junit.Test
import java.time.LocalDate
import kotlin.test.assertEquals

internal class TradePlannerTest {

    @Test
    fun test() {
        val trade = Trade(LocalDate.parse("2020-05-01"), newMoney(1000.0), "NKE", "plan-id")

        val quoteFetcher = QuoteFetcher()
        val tradePlanner = TradePlanner(quoteFetcher)

        runBlocking {
            println(tradePlanner.planTrade(trade))
        }
    }

    @Test
    fun shareCalc() {
        val quoteFetcher = QuoteFetcher()
        val tradePlanner = TradePlanner(quoteFetcher)

        assertEquals(208, tradePlanner.calculateShares(newMoney(5_250.0), newMoney(25.23)))
    }
}

