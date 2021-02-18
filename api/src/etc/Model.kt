package etc

import com.fasterxml.jackson.annotation.JsonProperty
import org.apache.commons.lang3.RandomStringUtils
import java.time.LocalDate

data class Register(
    @JsonProperty("email") val email: String,
    @JsonProperty("password") val password: String
)

data class Login(
    @JsonProperty("email") val email: String,
    @JsonProperty("password") val password: String
)

data class User(
    @JsonProperty("email") val email: String,
    @JsonProperty("phone") val phone: String? = null,
    @JsonProperty("id") val id: String = RandomStringUtils.randomAlphabetic(16)
)

data class UpdateUser(
    @JsonProperty("email") val email: String,
    @JsonProperty("phone") val phone: String = "",
    @JsonProperty("password") val password: String = ""
)

data class ListItem(val tmdbId : Int,
                    val state : State,
                    val created : LocalDate,
                    val updated : LocalDate,
                    val id : String = RandomStringUtils.randomAlphabetic(16)
) {
    enum class State(val ord : Int) {
        QUEUED(0),
        LIKE(1),
        DISLIKE(2),
        LOVE(3),
        HATE(4),
        SKIPPED(5);

        companion object {
            fun fromInt(value: Int) = values().first { it.ord == value }
        }
    }
}
