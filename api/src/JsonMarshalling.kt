import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.exc.InvalidFormatException
import org.joda.money.Money
import java.time.LocalDate
import java.time.OffsetDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException

class MoneySerializer : JsonSerializer<Money>() {
    override fun serialize(value: Money, gen: JsonGenerator, serializers: SerializerProvider) {
        gen.writeString(value.amount.toString())
    }
}

class MoneyDeserializer : JsonDeserializer<Money>() {
    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): Money {
        val money: String = "USD " + p.readValueAs(String::class.java)

        try {
            return Money.parse(money)
        } catch (e: IllegalArgumentException) {
            throw InvalidFormatException(p, "Invalid money format", money, Money::class.java)
        }
    }
}

class LocalDateSerializer : JsonSerializer<LocalDate>() {
    override fun serialize(value: LocalDate, gen: JsonGenerator, serializers: SerializerProvider) {
        gen.writeString(DateTimeFormatter.ISO_DATE.format(value))
    }
}

class LocalDateDeserializer : JsonDeserializer<LocalDate>() {
    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): LocalDate {
        val dateString = p.readValueAs(String::class.java)

        return try {
            OffsetDateTime.parse(dateString).toLocalDate()
        } catch (e: DateTimeParseException) {
            LocalDate.parse(dateString)
        }
    }

}
