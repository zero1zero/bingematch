import java.math.RoundingMode
import java.time.LocalDate
import java.util.stream.Collectors

class TradeCalculator {

    fun createTradeSchedule(plan: Plan): List<Trade> {

        val days = mutableListOf<LocalDate>()
        var day: LocalDate = plan.timeline.start
        do {
            days.add(day)

            //add period length times repetition
            day = day.plus(plan.frequency.repetition.toLong(), plan.frequency.period)
        } while (day.isEqual(plan.timeline.end) || day.isBefore(plan.timeline.end))

        //how much every occurrence?
        val amountPerOccurrence = plan.amount.dividedBy(days.size.toDouble(), RoundingMode.HALF_EVEN)

        return days.stream()
            .map { d -> Trade(d, amountPerOccurrence, plan.symbol, plan.id) }
            .collect(Collectors.toList())
    }
}