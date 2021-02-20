package cache

import io.lettuce.core.RedisClient
import io.lettuce.core.api.StatefulRedisConnection
import io.lettuce.core.api.sync.RedisCommands
import io.lettuce.core.codec.ByteArrayCodec
import io.lettuce.core.codec.RedisCodec
import movie.Movie
import java.nio.ByteBuffer
import java.util.*


class MovieCodec : RedisCodec<String, Optional<Movie.Detail>> {
    override fun decodeKey(bytes: ByteBuffer): String {
        println("decode: $bytes")
        return String(bytes.array(), Charsets.UTF_8)
    }

    override fun encodeValue(value: Optional<Movie.Detail>): ByteBuffer {
        println("encode: $value")
        return ByteBuffer.wrap(value.get().toByteArray())
    }

    override fun encodeKey(key: String): ByteBuffer {
        println("key: $key")
        return ByteBuffer.wrap(key.toByteArray())
    }

    override fun decodeValue(bytes: ByteBuffer?): Optional<Movie.Detail> {
        println("decode: $bytes")
        if (bytes == null) {
            return Optional.empty()
        }

        return Optional.of(Movie.Detail.parseFrom(bytes))
    }
}

class RedisCache : Cache {

    val client = RedisClient.create("redis://XZv2xGrG4ZbqbB2Db@redis.default.svc.cluster.local:6379")
    val connection : StatefulRedisConnection<ByteArray, ByteArray> = client.connect(ByteArrayCodec())
    val syncCommands : RedisCommands<ByteArray, ByteArray> = connection.sync()

    override fun getMovie(id: Int): Optional<Movie.Detail> {
        val movie = syncCommands.get("movie:$id".toByteArray()) ?: return Optional.empty()

        return Optional.of(Movie.Detail.parseFrom(movie))
    }

    override fun setMovie(movie: Movie.Detail) {
        syncCommands.set("movie:${movie.id}".toByteArray(), movie.toByteArray())
    }

    override fun close() {
        connection.close()
        client.shutdown()
    }
}