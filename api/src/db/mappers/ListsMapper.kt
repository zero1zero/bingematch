package db.mappers

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.ArrayNode
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select
import org.apache.ibatis.annotations.Update
import user.User


interface ListsMapper {

    @Select("""
        SELECT queued FROM users 
            WHERE id = #{user}
        """)
    fun getQueue(@Param("user") user : String): ArrayNode

    @Select("""
        SELECT watched FROM users 
            WHERE id = #{user}
        """)
    fun getWatched(user: String): ArrayNode

    @Select("""
        SELECT matched FROM users 
            WHERE id = #{user}
        """)
    fun getMatched(user: String): ArrayNode

    @Select("""
        SELECT liked FROM users 
            WHERE id = #{user}
        """)
    fun getLiked(user: String): ArrayNode

    @Update("""
        UPDATE users SET liked = to_json(#{liked}::json)
            WHERE id = #{user}
        """)
    fun updateLiked(@Param("user") user: String, @Param("liked") liked : ArrayNode)

    @Update("""
        UPDATE users SET watched = to_json(#{watched}::json)
            WHERE id = #{user}
        """)
    fun updateWatched(@Param("user") user: String, @Param("watched") watched: ArrayNode)

    @Select("""
        SELECT disliked FROM users 
            WHERE id = #{user}
        """)
    fun getDisliked(user: String): ArrayNode

    @Update("""
        UPDATE users SET disliked = to_json(#{disliked}::json)
            WHERE id = #{user}
        """)
    fun updateDisliked(@Param("user") user: String, @Param("disliked") disliked : ArrayNode)

    @Select("""
        SELECT watched || liked || disliked || queued FROM users 
            WHERE id = #{user}
        """)
    fun getUnqueueable(@Param("user") user: String): JsonNode

    @Update("""
        UPDATE users SET queued = to_json(#{queued}::json)
            WHERE id = #{user}
        """)
    fun updateQueued(@Param("user") user: String, @Param("queued") queued : ArrayNode)

}