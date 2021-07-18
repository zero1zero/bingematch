package etc

import org.apache.commons.lang3.RandomStringUtils

/**
 * 52!(52−8)! = 30342338208000
 */
fun generateId(): String {
    return RandomStringUtils.randomAlphabetic(8)
}

