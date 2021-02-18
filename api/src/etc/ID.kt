package etc

import org.apache.commons.lang3.RandomStringUtils

fun generateId(): String {
    return RandomStringUtils.randomAlphabetic(16)
}

