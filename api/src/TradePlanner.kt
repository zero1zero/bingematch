import org.joda.money.Money
import java.math.RoundingMode

class TradePlanner(private val quoteFetcher: QuoteFetcher) {

    suspend fun planTrade(trade: Trade): Long {

        val globalQuote: GlobalQuote = quoteFetcher.getQuote(trade.symbol)

        println(globalQuote)

        return calculateShares(trade.amount, globalQuote.price)
    }

    fun calculateShares(amount: Money, sharePrice: Money): Long {
        return amount.dividedBy(sharePrice.amount, RoundingMode.DOWN).amount.toLong()
    }
}
