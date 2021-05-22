package test

import cache.RedisCache
import org.junit.Test
import kotlin.test.assertTrue

internal class RedisCacheTest {

    @Test
    fun connect() {
        val redisCache = RedisCache()

        assertTrue(redisCache.getShow("lakjasdlkfjasdkfj").isEmpty)
    }
}