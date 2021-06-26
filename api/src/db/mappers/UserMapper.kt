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

    @Select("""
        SELECT id, email, first, last FROM users
            WHERE email = #{email}
        """)
    fun getUserByEmail(@Param("email") email : String) : User.Detail.Builder?

    @Select("""
        SELECT id, email, first, last FROM users
            WHERE id = #{id}
        """)
    fun getUserByID(@Param("id") id: String) : User.Detail.Builder?

    @Insert("""
        INSERT INTO users (id, email, first, last, hash)
            VALUES (#{detail.id}, #{detail.email}, #{detail.first}, #{detail.last}, #{hash})
        """)
    fun createUser(@Param("detail") detail: User.Detail, @Param("hash") hash : String)

    @Update("""
        UPDATE users SET 
            (email = #{detail.email}, first = #{detail.first}, last = #{detail.last})
            WHERE id = #{detail.id}
        """)
    fun updateUser(@Param("detail") detail: User.Detail)

    @Update("""
        UPDATE users SET password = #{hash} 
            WHERE id = #{detail.id}
        """)
    fun updatePassword(@Param("id") id: String, @Param("hash") hash: String)
}

