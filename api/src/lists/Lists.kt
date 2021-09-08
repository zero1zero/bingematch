package lists

import com.fasterxml.jackson.databind.util.RawValue
import db.JSONTypeHandler
import db.JsonParser
import db.JsonPrinter
import db.mappers.ListsMapper
import org.apache.ibatis.session.SqlSession
import user.User

class Lists {

    fun getQueued(user : String, session : SqlSession): List<User.QueuedShow> {
        val mapper = session.getMapper(ListsMapper::class.java)

        val queued = mapper.getQueue(user)

        return queued.map {
            val show = User.QueuedShow.newBuilder()

            JsonParser.merge(it.toString(), show)

            show.build()
        }
    }

    fun updateQueued(user : String, queued : List<User.QueuedShow>, session: SqlSession) {
        val mapper = session.getMapper(ListsMapper::class.java)

        val json = JSONTypeHandler.mapper.createArrayNode()

        queued.forEach{
            json.addRawValue(RawValue(JsonPrinter.print(it)))
        }

        mapper.updateQueued(user, json)
    }

    fun getWatched(user: String, session: SqlSession): List<User.WatchedShow> {
        val mapper = session.getMapper(ListsMapper::class.java)

        val watched = mapper.getWatched(user)

        return watched.map {
            val show = User.WatchedShow.newBuilder()

            JsonParser.merge(it.toString(), show)

            show.build()
        }
    }

    fun getMatched(user: String, session: SqlSession): List<User.MatchedShow> {
        TODO("Not yet implemented")
    }

    fun getLiked(user: String, session: SqlSession): List<User.LikedShow>{
        val mapper = session.getMapper(ListsMapper::class.java)

        val liked = mapper.getLiked(user)

        return liked.map {
            val like = User.LikedShow.newBuilder()

            JsonParser.merge(it.toString(), like)

            like.build()
        }
    }

    fun getUnqueueable(user : String, session : SqlSession) : List<String> {
        val mapper = session.getMapper(ListsMapper::class.java)

        return mapper.getUnqueueable(user)
            .map {
                it["show"].asText()
            }
    }

    private fun unqueue(user: String, show: String, session: SqlSession) {
        val mapper = session.getMapper(ListsMapper::class.java)

        val queued = mapper.getQueue(user)

        queued.removeAll {
            it["show"].textValue() == show
        }

        mapper.updateQueued(user, queued)
    }

    fun watched(user: String, watched: User.WatchedShow, session: SqlSession) {
        //move from queue or likes to watched
        val mapper = session.getMapper(ListsMapper::class.java)

        unqueue(user, watched.show, session)

        val likes = mapper.getLiked(user)
        likes.removeAll {
            it["show"].textValue() == watched.show
        }
        mapper.updateLiked(user, likes)

        val watcheds = mapper.getWatched(user)

        watcheds.addRawValue(RawValue(JsonPrinter.print(watched)))

        mapper.updateWatched(user, likes)
    }

    fun like(user: String, show: String, session: SqlSession) {
        //move from queue to like
        val mapper = session.getMapper(ListsMapper::class.java)

        unqueue(user, show, session)

        val likes = mapper.getLiked(user)

        val like = User.LikedShow.newBuilder()
            .setShow(show)
            .setOrder(likes.size())

        likes.addRawValue(RawValue(JsonPrinter.print(like)))

        mapper.updateLiked(user, likes)
    }

    fun dislike(user: String, show: String, session: SqlSession) {
        //move from queue to dislike
        val mapper = session.getMapper(ListsMapper::class.java)

        unqueue(user, show, session)

        val dislikes = mapper.getDisliked(user)

        val dislike = User.DislikedShow.newBuilder()
            .setShow(show)

        dislikes.addRawValue(RawValue(JsonPrinter.print(dislike)))

        mapper.updateDisliked(user, dislikes)
    }

    /**
     * TODO lets make sure the client does nice things when its a match or watched and they go back
     */
    fun back(user: String, show: String, session: SqlSession) {
        val mapper = session.getMapper(ListsMapper::class.java)

        val queued = mapper.getQueue(user)
        val dislikes = mapper.getDisliked(user)
        val likes = mapper.getLiked(user)

        dislikes.removeAll {
            it["show"].textValue() == show
        }

        likes.removeAll {
            it["show"].textValue() == show
        }

        mapper.updateDisliked(user, dislikes)
        mapper.updateLiked(user, likes)

        val newQueued = User.QueuedShow.newBuilder()
            .setShow(show)

        queued.addRawValue(RawValue(JsonPrinter.print(newQueued)))
    }
}