import org.junit.Test
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue

internal class StockDataSourceTest {

    @Test
    fun basic() {
        val stockData = StockDataSource()

        val charts = stockData.getCharts(setOf("twtr", "fb")).series

        assertEquals(charts.size, 2)
        assertEquals("TWTR", charts[0].id)
        assertEquals("FB", charts[1].id)
//        assertEquals(25, charts[0].data.size)
//        assertEquals(25, charts[1].data.size)
    }

    @Test
    fun price() {
        val stockData = StockDataSource()

        val price = stockData.getPrice("aapl")

        assertTrue(price > 0)
    }

    @Test(expected = StockDataSource.StockNotFoundException::class)
    fun priceFail() {
        val stockData = StockDataSource()

        stockData.getPrice("apple")
    }
}