import catalog.Catalog
import catalog.MetadataSource
import db.Database
import db.Updater
import etc.PasswordUtil
import org.apache.ibatis.datasource.pooled.PooledDataSource
import queue.Queues
import store.UserStore

interface Dependencies {

    fun userStore() : UserStore
    fun queues() : Queues
    fun catalog() : Catalog
    fun database() : Database
    fun updater() : Updater
}

open class ProdDeps : Dependencies {

    private val passwordUtil = PasswordUtil()
    private val metadata = MetadataSource()
    private val datasource = ProdDataSource()
    private val database = Database(datasource)
    private val catalog = Catalog(metadata, database)
    private val queues = Queues(catalog)
    private val updater = Updater(datasource)
    private val storage = UserStore(passwordUtil, database)

    override fun userStore(): UserStore {
        return storage
    }

    override fun queues(): Queues {
        return queues
    }

    override fun catalog(): Catalog {
        return catalog
    }

    override fun database(): Database {
        return database
    }

    override fun updater(): Updater {
        return updater
    }
}

class ProdDataSource : PooledDataSource(
    "org.postgresql.Driver",
    "jdbc:postgresql://postgres.default.svc.cluster.local:5432/zack",
    "zack",
    "bzGa8m6ekUYsRRUWpy"
)
