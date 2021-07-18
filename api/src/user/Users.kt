package user

import catalog.Genres
import com.fasterxml.jackson.databind.ObjectMapper
import db.mappers.UserMapper
import etc.PasswordUtil
import etc.generateId
import org.apache.ibatis.session.SqlSession

class UserStore(private val passwordUtil: PasswordUtil, private val genres : Genres) {
    private val mapper : ObjectMapper = ObjectMapper()

    fun getUserByLogin(email: String, password: String, session : SqlSession): Result<User.Detail> {
        val mapper = session.getMapper(UserMapper::class.java)

        val hash = mapper.getHashByEmail(email) ?: return Result.failure(UnauthorizedException())

        //if pw doesnt match, scratch it
        if (!passwordUtil.verify(password, hash)) {
            return Result.failure(RuntimeException("password hash mismatch"))
        }

        val user = mapper.getUserByEmail(email) ?: return Result.failure(UserNotFoundException())

        return Result.success(
            dbUserToUser(user)
        )
    }

    fun getUserByEmail(email: String, session : SqlSession): Result<User.Detail> {
        val mapper = session.getMapper(UserMapper::class.java)

        val user = mapper.getUserByEmail(email) ?: return Result.failure(UserNotFoundException())

        return Result.success(
            dbUserToUser(user)
        )
    }

    fun getUser(id: String, session : SqlSession): Result<User.Detail> {
        val mapper = session.getMapper(UserMapper::class.java)

        val user = mapper.getUserByID(id) ?: return Result.failure(UserNotFoundException())

        return Result.success(
            dbUserToUser(user)
        )
    }

    private fun dbUserToUser(dbuser : UserMapper.DBUser): User.Detail {
        val genres = mapper.readTree(dbuser.genres)
            .map { genres.getGenre(it.asInt()) }

        return User.Detail.newBuilder()
            .setEmail(dbuser.email)
            .setFirst(dbuser.first)
            .setLast(dbuser.last)
            .addAllGenres(genres)
            .build()
    }

    fun createUser(signUp: User.Register, session : SqlSession): User.Detail {
        val mapper = session.getMapper(UserMapper::class.java)

        val user = User.Detail.newBuilder()
            .setId(generateId())
            .setEmail(signUp.email)
            .setFirst(signUp.first)
            .setLast(signUp.last)
            .build()

        mapper.createUser(user, passwordUtil.hash(signUp.password))

        return user
    }

    fun updateUser(user: User.Detail, password : String, session : SqlSession): User.Detail {
        val mapper = session.getMapper(UserMapper::class.java)

        mapper.updateUser(user)

        if (password != "") {
            mapper.updatePassword(user.id, passwordUtil.hash(password))
        }

        return user
    }

    fun updateGenres(id : String, genres : List<Int>, session : SqlSession) {
        val mapper = session.getMapper(UserMapper::class.java)

        val json = this.mapper.writeValueAsString(genres)

        mapper.updateGenres(id, json)
    }

    fun delUser(id: String, session : SqlSession) {
        val mapper = session.getMapper(UserMapper::class.java)

        mapper.deleteUser(id)
    }

    fun delUserByEmail(email: String, session : SqlSession) {
        val mapper = session.getMapper(UserMapper::class.java)

        mapper.deleteUserByEmail(email)
    }
}

class UnauthorizedException : RuntimeException("not-authorized")
class UserNotFoundException : RuntimeException("user-not-found")
class UserAlreadyExists : RuntimeException("user-exists")
