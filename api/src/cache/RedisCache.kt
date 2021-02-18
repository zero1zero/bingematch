package cache

import Model
import io.lettuce.core.RedisClient
import io.lettuce.core.api.StatefulRedisConnection
import io.lettuce.core.api.sync.RedisCommands
import io.lettuce.core.codec.RedisCodec
import java.nio.ByteBuffer
import java.util.*


class MovieCodec : RedisCodec<String, Optional<Model.Movie>> {
    override fun decodeKey(bytes: ByteBuffer): String {
        return String(bytes.array(), Charsets.UTF_8)
    }

    override fun encodeValue(value: Optional<Model.Movie>): ByteBuffer {
        return ByteBuffer.wrap(value.get().toByteArray())
    }

    override fun encodeKey(key: String): ByteBuffer {
        return ByteBuffer.wrap(key.toByteArray())
    }

    override fun decodeValue(bytes: ByteBuffer?): Optional<Model.Movie> {
        if (bytes == null) {
            return Optional.empty()
        }

        return Optional.of(Model.Movie.parseFrom(bytes))
    }
}

class RedisCache : Cache {

    val client = RedisClient.create("redis://XZv2xGrG4ZbqbB2Db@redis.default.svc.cluster.local:6379")
    val connection : StatefulRedisConnection<String, Optional<Model.Movie>> = client.connect(MovieCodec())
    val syncCommands : RedisCommands<String, Optional<Model.Movie>> = connection.sync()

    override fun getMovie(id: Int): Optional<Model.Movie> {
        return syncCommands.get("movie:$id")
    }

    override fun setMovie(movie: Model.Movie) {
        syncCommands.set("movie:${movie.id}", Optional.of(movie))
    }

    override fun close() {
        connection.close()
        client.shutdown()
    }
}