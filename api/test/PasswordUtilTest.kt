import etc.PasswordUtil
import org.junit.Assert.assertTrue
import org.junit.jupiter.api.Test

internal class PasswordUtilTest {

    private val passwordUtil = PasswordUtil()

    @Test
    fun sameHash() {
        val hash = passwordUtil.hash("whats up")
        assertTrue(passwordUtil.verify("whats up", hash))
    }
}