package db.mappers

import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select
import org.apache.ibatis.annotations.Update
import java.time.Instant

interface CatalogMapper {

    @Update("""
        INSERT INTO shows (id, tmdb, updated) 
            VALUES (#{id}, to_json(#{tmdb}::json), NOW())
            ON CONFLICT (id) DO UPDATE 
              SET tmdb = to_json(#{tmdb}::json), 
                  updated = NOW()
    """)
    fun addShow(
        @Param("id") id: String,
        @Param("tmdb") tmdb: String
    )

    data class DBShow(val id: String, val tmdb: String)
    @Select("""
        SELECT id, tmdb FROM shows WHERE id = #{id} 
    """)
    fun getShow(@Param("id") id: String): DBShow?


    @Select("""
        SELECT last FROM catalog_sync 
        ORDER BY last DESC
        LIMIT 1
    """)
    fun getLastSync(): Instant?

    @Insert("""
        INSERT INTO catalog_sync VALUES (NOW(), #{count})
    """)
    fun setLastSync(@Param("count") count: Int)
}