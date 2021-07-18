package db.mappers

import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select
import org.apache.ibatis.annotations.Update
import user.User


interface UserMapper {

    @Select("""
        SELECT hash FROM users 
            WHERE email = #{email}
        """)
    fun getHashByEmail(@Param("email") email: String): String?

    data class DBUser(val id : String, val email : String, val first : String, val last : String, val genres: String)
    @Select("""
        SELECT id, email, first, last, genres FROM users
            WHERE email = #{email}
        """)
    fun getUserByEmail(@Param("email") email : String) : DBUser?

    @Select("""
        SELECT id, email, first, last, genres FROM users
            WHERE id = #{id}
        """)
    fun getUserByID(@Param("id") id: String) : DBUser?

    @Insert("""
        INSERT INTO users (id, email, first, last, hash)
            VALUES (#{detail.id}, #{detail.email}, #{detail.first}, #{detail.last}, #{hash})
        """)
    fun createUser(@Param("detail") detail: User.Detail,
                   @Param("hash") hash : String)

//select * from users where genres @> '12';
    @Update("""
        UPDATE users SET genres = to_json(#{genres}::json)
            WHERE id = #{id}
        """)
    fun updateGenres(@Param("id") id: String, @Param("genres") genres : String)

    @Update("""
        UPDATE users SET 
            email = #{detail.email}, first = #{detail.first}, last = #{detail.last}
            WHERE id = #{detail.id}
        """)
    fun updateUser(@Param("detail") detail : User.Detail)

    @Update("""
        UPDATE users SET hash = #{hash} 
            WHERE id = #{id}
        """)
    fun updatePassword(@Param("id") id: String,
                       @Param("hash") hash: String)

    @Update("""
        DELETE FROM users 
            WHERE id = #{id}
        """)
    fun deleteUser(@Param("id") id : String)

    @Update("""
        DELETE FROM users 
            WHERE email = #{email}
        """)
    fun deleteUserByEmail(@Param("email") email : String)
}

