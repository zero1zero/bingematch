package db

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ArrayNode
import db.JSONTypeHandler.Companion.mapper
import db.mappers.CatalogMapper
import db.mappers.ListsMapper
import db.mappers.UserMapper
import org.apache.ibatis.mapping.Environment
import org.apache.ibatis.session.Configuration
import org.apache.ibatis.session.SqlSession
import org.apache.ibatis.session.SqlSessionFactory
import org.apache.ibatis.session.SqlSessionFactoryBuilder
import org.apache.ibatis.transaction.TransactionFactory
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory
import org.apache.ibatis.type.JdbcType
import org.apache.ibatis.type.TypeHandler
import test.SmokeTestMapper
import user.User
import java.sql.CallableStatement
import java.sql.PreparedStatement
import java.sql.ResultSet
import javax.sql.DataSource

class Database (dataSource: DataSource) {

    val factory : SqlSessionFactory

    init {

        val transactionFactory: TransactionFactory = JdbcTransactionFactory()
        val environment = Environment("my-env", transactionFactory, dataSource)

        val configuration = Configuration(environment)
        configuration.isLazyLoadingEnabled = true

        configuration.typeHandlerRegistry.register(ArrayNode::class.java, JSONArrayTypeHandler::class.java)
        configuration.typeHandlerRegistry.register(JsonNode::class.java, JSONTypeHandler::class.java)
        configuration.addMapper(SmokeTestMapper::class.java)
        configuration.addMapper(UserMapper::class.java)
        configuration.addMapper(CatalogMapper::class.java)
        configuration.addMapper(ListsMapper::class.java)

        val builder = SqlSessionFactoryBuilder()
        this.factory = builder.build(configuration)
    }

    fun newSession() : SqlSession {
        return factory.openSession(true)
    }
}

class JSONTypeHandler : TypeHandler<JsonNode> {

    //todo optimize for serialization
    companion object {
        val mapper = ObjectMapper()
    }

    override fun setParameter(ps: PreparedStatement, i: Int, parameter: JsonNode, jdbcType: JdbcType?) {
        ps.setString(i, mapper.writeValueAsString(parameter))
    }

    override fun getResult(rs: ResultSet, columnName: String): JsonNode {
        return mapper.readTree(rs.getString(columnName))

    }

    override fun getResult(rs: ResultSet, columnIndex: Int): JsonNode {
        return mapper.readTree(rs.getString(columnIndex))
    }

    override fun getResult(cs: CallableStatement, columnIndex: Int): JsonNode {
        return mapper.readTree(cs.getString(columnIndex))
    }
}
class JSONArrayTypeHandler : TypeHandler<ArrayNode> {

    override fun setParameter(ps: PreparedStatement, i: Int, parameter: ArrayNode, jdbcType: JdbcType?) {
        ps.setString(i, mapper.writeValueAsString(parameter))
    }

    override fun getResult(rs: ResultSet, columnName: String): ArrayNode {
        return mapper.readValue(rs.getString(columnName), ArrayNode::class.java)

    }

    override fun getResult(rs: ResultSet, columnIndex: Int): ArrayNode {
        return mapper.readValue(rs.getString(columnIndex), ArrayNode::class.java)
    }

    override fun getResult(cs: CallableStatement, columnIndex: Int): ArrayNode {
        return mapper.readValue(cs.getString(columnIndex), ArrayNode::class.java)
    }
}
