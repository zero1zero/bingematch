package db.mappers

import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select


interface QueueMapper {

    @Insert("""
        INSERT INTO queue (id, user_id, show_id, state) 
            VALUES (#{id}, #{userId}, #{showId}, #{state})
    """)
    fun addToQueue(
        @Param("id") id: String,
        @Param("userId") userId: String,
        @Param("showId") showId : String,
        @Param("state") state : Int,
    )

    data class DBQueueItem(val id: String, val userId : String, val showId : String, val state : Int)
    @Select("""
        SELECT id, user_id, show_id, state FROM queue 
            WHERE user_id = #{userId} AND state IN (#{state})
        """)
    fun getQueue(
        @Param("userId") userId: String,
        @Param("state") state : Int) : List<DBQueueItem>

    @Select("""
        SELECT id FROM queue 
            WHERE user_id = #{userId} AND state != 0
        """)
    fun getAllNotQueued(@Param("userId") userId: String) : List<String>

    @Select("""
        SELECT id, user_id, show_id, state FROM queue 
            WHERE id = #{id}
        """)
    fun getQueueItem(@Param("id") id : String) : DBQueueItem

    @Select("""
        UPDATE queue SET state = #{state}
            WHERE id = #{id}
    """)
    fun updateState(
        @Param("id") id : String,
        @Param("state") state : Int)
}