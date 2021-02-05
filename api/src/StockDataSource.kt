import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.JsonNode
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.Response
import com.github.kittinunf.fuel.jackson.responseObject
import java.util.*
import java.util.stream.Collectors
import java.util.stream.StreamSupport

class StockDataSource {
    val publishable = "pk_c16b1108290b4a1694e92a952cf15af7"
    val secret = "sk_557d6655c9dd4b43a778aff39fd4fd33"
    val test = "Tsk_b5fe6ef7676c4855ba3ed157bed848ab"

    class StockNotFoundException : RuntimeException("symbol-not-found")

    fun checkBadResponse(response: Response) {
        if (response.statusCode == 404) {
            throw StockNotFoundException()
        }

        if (response.statusCode != 200) {
            println(response)
            throw RuntimeException("bad response from stock stuff")
        }
    }

    fun getCompany(symbol: String): JsonNode {
        val (request, response, result) = Fuel.get(
            "https://cloud.iexapis.com/stable/stock/${symbol}/company", listOf(
                "token" to secret
            )
        )
            .responseObject<JsonNode>()

        checkBadResponse(response)

        return result.get()
    }

    fun getPrice(symbol: String): Double {
        val (request, response, result) = Fuel.get(
            "https://cloud.iexapis.com/stable/stock/${symbol}/previous", listOf(
                "token" to secret
            )
        )
            .responseObject<JsonNode>()

        checkBadResponse(response)

        return result.get()["close"].asDouble()
    }

    fun getCharts(symbols: Set<String>): ChartManySeries {

        val (request, response, result) = Fuel.get(
            "https://cloud.iexapis.com/stable/stock/market/batch", listOf(
                "symbols" to symbols.joinToString(separator = ",") { it },
                "chartCloseOnly" to "true",
                "chartInterval" to 10,
                "changeFromClose" to false,
                "types" to "chart",
                "token" to secret,
                "range" to "1y"
            )
        )
            .responseObject<JsonNode>()

        checkBadResponse(response)

        val node: JsonNode = result.component1()!!

        val stream =
            StreamSupport.stream(Spliterators.spliteratorUnknownSize(node.fields(), Spliterator.ORDERED), false)

        val listOfSeries = stream
            .map { chart ->
                ChartSeries(chart.key,
                    StreamSupport.stream(chart.value["chart"].spliterator(), false)
                        .map { series ->
                            ChartSeriesXY(series["date"].asText(), series["changeOverTime"].asDouble())
                        }
                        .collect(Collectors.toList()))
            }
            .collect(Collectors.toList())

        return ChartManySeries(listOfSeries)
    }
}

data class ChartManySeries(@JsonProperty("series") val series: List<ChartSeries>)
data class ChartSeries(
    @JsonProperty("id") val id: String,
    @JsonProperty("data") val data: List<ChartSeriesXY>
)

data class ChartSeriesXY(
    @JsonProperty("x") val x: String,
    @JsonProperty("y") val y: Number
)
