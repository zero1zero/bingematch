import org.joda.money.CurrencyUnit
import org.joda.money.Money
import java.math.RoundingMode

fun newMoney(double: Double): Money {
    return Money.of(CurrencyUnit.USD, double, RoundingMode.HALF_EVEN)
}