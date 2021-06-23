package db

import org.apache.ibatis.datasource.pooled.PooledDataSource
import org.apache.ibatis.mapping.Environment
import org.apache.ibatis.session.Configuration
import org.apache.ibatis.session.SqlSession
import org.apache.ibatis.session.SqlSessionFactory
import org.apache.ibatis.session.SqlSessionFactoryBuilder
import org.apache.ibatis.transaction.TransactionFactory
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory

class Database (dataSource: DataSource) {

    val factory : SqlSessionFactory

    init {

        val transactionFactory: TransactionFactory = JdbcTransactionFactory()
        val environment = Environment(dataSource.url, transactionFactory, dataSource)

        val configuration = Configuration(environment)
        configuration.isLazyLoadingEnabled = true;

//        configuration.typeAliasRegistry.registerAlias(Blog.class);
//        configuration.addMapper(BoundBlogMapper.class);

        val builder = SqlSessionFactoryBuilder()
        this.factory = builder.build(configuration)
    }

    fun newSession() : SqlSession {
        return factory.openSession()
    }
}

class DataSource : PooledDataSource(
    "org.postgresql.Driver",
    "jdbc:postgresql://postgres.default.svc.cluster.local:5432/zack",
    "zack",
    "bzGa8m6ekUYsRRUWpy"
)