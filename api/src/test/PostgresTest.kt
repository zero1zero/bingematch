package test

import com.google.common.base.Preconditions.checkState
import db.Database
import org.apache.ibatis.annotations.Select

interface SmokeTestMapper {

    @Select("SELECT 1")
    fun get() : Int
}

class PostgresTest(private val database : Database) {

    fun connect() {
        val session = database.newSession()

        session.use {
            val mapper = it.getMapper(SmokeTestMapper::class.java)
            checkState(mapper.get() == 1)
        }
    }
}