import com.fasterxml.jackson.databind.node.ObjectNode
import io.ktor.client.HttpClient
import io.ktor.client.features.json.JacksonSerializer
import io.ktor.client.features.json.JsonFeature
import io.ktor.client.request.get
import org.joda.money.Money
import java.time.LocalDate

data class GlobalQuote(
    val symbol: String,
    val open: Money,
    val high: Money,
    val low: Money,
    val price: Money,
    val volume: Long,
    val latestDay: LocalDate,
    val previous: Money,
    val change: Money,
    val changePercent: Double
)

class QuoteFetcher {

    private val client = HttpClient {
        install(JsonFeature) {
            serializer = JacksonSerializer()
        }
    }

    suspend fun getQuote(symbol: String): GlobalQuote {
        return globalQuoteToObject(loadGlobalQuote(symbol))
    }

    suspend fun loadGlobalQuote(symbol: String): ObjectNode {
        return client.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=$symbol&apikey=I8W352GNF7GM6BPU")
    }

    fun globalQuoteToObject(quoteNode: ObjectNode): GlobalQuote {
        val globalQuoteMap = quoteNode["Global Quote"]

        return GlobalQuote(
            globalQuoteMap["01. symbol"].asText(),
            newMoney(globalQuoteMap["02. open"].asDouble()),
            newMoney(globalQuoteMap["03. high"].asDouble()),
            newMoney(globalQuoteMap["04. low"].asDouble()),
            newMoney(globalQuoteMap["05. price"].asDouble()),
            globalQuoteMap["06. volume"].asLong(),
            LocalDate.parse(globalQuoteMap["07. latest trading day"].asText()),
            newMoney(globalQuoteMap["08. previous close"].asDouble()),
            newMoney(globalQuoteMap["09. change"].asDouble()),
            globalQuoteMap["10. change percent"].asText().replace("%", "").toDouble() / 100.0
        )
    }
}