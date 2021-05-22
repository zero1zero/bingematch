package cache

import io.lettuce.core.RedisClient
import io.lettuce.core.api.StatefulRedisConnection
import io.lettuce.core.api.sync.RedisCommands
import io.lettuce.core.codec.ByteArrayCodec
import io.lettuce.core.codec.RedisCodec
import show.Show
import java.nio.ByteBuffer
import java.util.*

class RedisCache : Cache {

    val client = RedisClient.create("redis://XZv2xGrG4ZbqbB2Db@redis.default.svc.cluster.local:6379")
    val connection : StatefulRedisConnection<ByteArray, ByteArray> = client.connect(ByteArrayCodec())
    val syncCommands : RedisCommands<ByteArray, ByteArray> = connection.sync()

    override fun getShow(id: String): Optional<Show.Detail> {
        val movie = syncCommands.get("show:$id".toByteArray()) ?: return Optional.empty()

        return Optional.of(Show.Detail.parseFrom(movie))
    }

    override fun setShow(show: Show.Detail) {
        syncCommands.set("show:${show.id}".toByteArray(), show.toByteArray())
    }

    override fun close() {
        connection.close()
        client.shutdown()
    }
}