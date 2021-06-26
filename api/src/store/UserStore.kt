package store

import db.Database
import db.mappers.UserMapper
import etc.PasswordUtil
import etc.generateId
import user.User

class UserStore(private val passwordUtil: PasswordUtil,
                val db : Database) {

    fun getUserByLogin(email: String, password: String): Result<User.Detail> {

        val session = db.newSession()
        val mapper = session.getMapper(UserMapper::class.java)

        val hash = mapper.getHashByEmail(email) ?: return Result.failure(UnauthorizedException())

        //if pw doesnt match, scratch it
        if (!passwordUtil.verify(password, hash)) {
            return Result.failure(RuntimeException("password hash mismatch"))
        }

        val user = mapper.getUserByEmail(email)!!

        return Result.success(
            user.build()
        )
    }

    fun getUserByEmail(email: String): Result<User.Detail> {

        val session = db.newSession()
        val mapper = session.getMapper(UserMapper::class.java)

        val user = mapper.getUserByEmail(email) ?: return Result.failure(UserNotFoundException())

        return Result.success(
            user.build()
        )
    }

    fun getUser(id: String): Result<User.Detail> {

        val session = db.newSession()
        val mapper = session.getMapper(UserMapper::class.java)

        val user = mapper.getUserByID(id) ?: return Result.failure(UserNotFoundException())

        return Result.success(
            user.build()
        )
    }

    fun createUser(signUp: User.Register): User.Detail {
        val session = db.newSession()
        val mapper = session.getMapper(UserMapper::class.java)

        val user = User.Detail.newBuilder()
            .setId(generateId())
            .setEmail(signUp.email)
            .setFirst(signUp.first)
            .setLast(signUp.last)
            .build()

        mapper.createUser(user, passwordUtil.hash(signUp.password))

        session.commit()

        return user
    }

    fun updateUser(user: User.Detail, password : String): User.Detail {
        val session = db.newSession()
        val mapper = session.getMapper(UserMapper::class.java)

        mapper.updateUser(user)

        if (password != "") {
            mapper.updatePassword(user.id, passwordUtil.hash(password))
        }

        session.commit()

        return user
    }

    fun delUser(user: String) {
        //todo go
    }
}

class UnauthorizedException : RuntimeException("not-authorized")
class UserNotFoundException : RuntimeException("user-not-found")
class UserAlreadyExists : RuntimeException("user-exists")
