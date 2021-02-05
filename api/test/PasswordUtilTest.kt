import org.junit.jupiter.api.Assertions.assertTrue
import kotlin.test.Test

internal class PasswordUtilTest {

    val passwordUtil = PasswordUtil()

    @Test
    fun sameHash() {
        val hash = passwordUtil.hash("whats up")
        assertTrue(passwordUtil.verify("whats up", hash))
    }
}