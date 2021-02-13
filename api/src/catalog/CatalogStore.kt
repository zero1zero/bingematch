package catalog

import K8sClient
import MetadataSource
import com.fasterxml.jackson.databind.ObjectMapper
import io.lettuce.core.RedisClient
import io.lettuce.core.api.StatefulRedisConnection
import io.lettuce.core.api.sync.RedisCommands
import io.lettuce.core.codec.RedisCodec
import java.nio.ByteBuffer

class JSONCodec : RedisCodec<String, Any> {

    override fun decodeKey(bytes: ByteBuffer?): String {
        return ""
    }

    override fun encodeValue(value: Any?): ByteBuffer {
        TODO("Not yet implemented")
    }

    override fun encodeKey(key: String?): ByteBuffer {
        TODO("Not yet implemented")
    }

    override fun decodeValue(bytes: ByteBuffer?): Any {
        TODO("Not yet implemented")
    }
}

class CatalogStore(val metadataSource: MetadataSource, val k8s : K8sClient) {

//    val redisUrl = k8s.api.listNamespacedService("default", "redis")
//    val client = RedisClient.create("redis://password@localhost:6379/0")
//    val connection : StatefulRedisConnection<String, String> = client.connect()
//    val syncCommands : RedisCommands<String, String> = connection.sync()
//
//    val tmdb = "tmdb:"
//
//    fun getContent(tmdbId : Int) {
//
//        syncCommands.get(tmdb + tmdbId)
//
//        syncCommands.set("key", "Hello, Redis!");
//
//    }

    fun close() {
//        connection.close()
//        client.shutdown()
    }
}
