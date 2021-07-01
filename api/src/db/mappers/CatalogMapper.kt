package db.mappers

import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select
import org.apache.ibatis.annotations.Update
import java.util.*

interface CatalogMapper {

    @Update("""
        INSERT INTO shows (id, tmdb, updated) 
            VALUES (#{id}, to_json(#{tmdb}::json), NOW())
    """)
    fun addShow(
        @Param("id") id: String,
        @Param("tmdb") tmdb: String
    )

    @Update("""
        UPDATE shows 
            SET tmdb = #{tmdb} 
            WHERE id = #{id}
    """)
    fun updateTMDB(
        @Param("id") id: String,
        @Param("tmdb") tmdb: String
    )


//    @Results(value = [
//        Result(property = "id", column = "id"),
//        Result(property = "tmdb", column = "tmdb", jdbcType = JdbcType.OTHER)
//    ])
    @Select("""
        SELECT id, tmdb FROM shows WHERE id = #{id} 
    """)
    fun getShow(@Param("id") id: String): DBShow?
    data class DBShow(val id: String, val tmdb: String)


    @Select("""
        SELECT last FROM catalog_sync
    """)
    fun getLastSync(): Date

    @Insert("""
        INSERT INTO catalog_sync VALUES (#{last}, #{count})
    """)
    fun setLastSync(@Param("last") last: Date, @Param("count") count: Int)
}