package db

import db.mappers.CatalogMapper
import db.mappers.QueueMapper
import db.mappers.UserMapper
import org.apache.ibatis.mapping.Environment
import org.apache.ibatis.session.Configuration
import org.apache.ibatis.session.SqlSession
import org.apache.ibatis.session.SqlSessionFactory
import org.apache.ibatis.session.SqlSessionFactoryBuilder
import org.apache.ibatis.transaction.TransactionFactory
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory
import test.SmokeTestMapper
import javax.sql.DataSource

class Database (dataSource: DataSource) {

    val factory : SqlSessionFactory

    init {

        val transactionFactory: TransactionFactory = JdbcTransactionFactory()
        val environment = Environment("my-env", transactionFactory, dataSource)

        val configuration = Configuration(environment)
        configuration.isLazyLoadingEnabled = true

//        configuration.typeAliasRegistry.registerAlias(Blog.class);
        configuration.addMapper(SmokeTestMapper::class.java)
        configuration.addMapper(UserMapper::class.java)
        configuration.addMapper(CatalogMapper::class.java)
        configuration.addMapper(QueueMapper::class.java)

        val builder = SqlSessionFactoryBuilder()
        this.factory = builder.build(configuration)
    }

    fun newSession() : SqlSession {
        return factory.openSession(true)
    }
}