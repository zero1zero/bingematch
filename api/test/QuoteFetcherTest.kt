import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ObjectNode
import kotlinx.coroutines.runBlocking
import org.junit.Test
import java.time.LocalDate
import kotlin.test.assertEquals

internal class QuoteFetcherTest {

    private val expectedQuote = GlobalQuote(
        "NKE",
        newMoney(79.3600),
        newMoney(79.7900),
        newMoney(77.9050),
        newMoney(78.8600),
        8473430,
        LocalDate.parse("2020-04-03"),
        newMoney(80.1400),
        newMoney(-1.2800),
        -.015972
    )

    @Test
    fun shares() {
        val tradeCalc = QuoteFetcher()

        runBlocking {
            tradeCalc.getQuote("NKE")
        }
    }

    @Test
    fun responseToOb() {
        val tradeCalc = QuoteFetcher()

        val jsonString = this::class.java.getResource("global_quote_response.json").readText()

        val objectMapper = ObjectMapper()
        val quoteNode: ObjectNode = objectMapper.convertValue(objectMapper.readTree(jsonString), ObjectNode::class.java)

        val globalQuote: GlobalQuote = tradeCalc.globalQuoteToObject(quoteNode)

        assertEquals(expectedQuote, globalQuote)
    }
}

