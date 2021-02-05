import org.joda.money.CurrencyUnit
import org.joda.money.Money
import org.junit.Test
import org.junit.jupiter.api.Assertions.*
import java.time.LocalDate

internal class NotifierTest {

    @Test
    fun send() {
        val notifier = Notifier()

        val user = User("zack.manning@gmail.com", "928374293847")
        val trade = Trade(LocalDate.now(), Money.of(CurrencyUnit.USD, 20.0), "ALK", "234234")

        notifier.notifyOfTrade(user, trade)
    }
}