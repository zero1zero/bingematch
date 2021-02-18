package cache

import io.lettuce.core.RedisClient
import io.lettuce.core.api.StatefulRedisConnection
import io.lettuce.core.api.sync.RedisCommands
import io.lettuce.core.codec.RedisCodec
import movie.Movie
import java.nio.ByteBuffer
import java.util.*


class MovieCodec : RedisCodec<String, Optional<Movie.Detail>> {
    override fun decodeKey(bytes: ByteBuffer): String {
        return String(bytes.array(), Charsets.UTF_8)
    }

    override fun encodeValue(value: Optional<Movie.Detail>): ByteBuffer {
        return ByteBuffer.wrap(value.get().toByteArray())
    }

    override fun encodeKey(key: String): ByteBuffer {
        return ByteBuffer.wrap(key.toByteArray())
    }

    override fun decodeValue(bytes: ByteBuffer?): Optional<Movie.Detail> {
        if (bytes == null) {
            return Optional.empty()
        }

        return Optional.of(Movie.Detail.parseFrom(bytes))
    }
}

class RedisCache : Cache {

    val client = RedisClient.create("redis://XZv2xGrG4ZbqbB2Db@redis.default.svc.cluster.local:6379")
    val connection : StatefulRedisConnection<String, Optional<Movie.Detail>> = client.connect(MovieCodec())
    val syncCommands : RedisCommands<String, Optional<Movie.Detail>> = connection.sync()

    override fun getMovie(id: Int): Optional<Movie.Detail> {
        return syncCommands.get("movie:$id")
    }

    override fun setMovie(movie: Movie.Detail) {
        syncCommands.set("movie:${movie.id}", Optional.of(movie))
    }

    override fun close() {
        connection.close()
        client.shutdown()
    }
}