import cache.Cache
import cache.InMemoryCache
import catalog.Catalog
import catalog.MetadataSource
import db.Database
import db.Updater
import etc.PasswordUtil
import org.apache.ibatis.datasource.pooled.PooledDataSource
import queue.Queues
import store.UserStore

open class TestDeps : Dependencies {
    private val passwordUtil = PasswordUtil()
    private val metadata = MetadataSource()

    private val datasource = EmbeddedDataSource()
    private val database = Database(datasource)
    private val storage = UserStore(passwordUtil, database)
    private val updater = Updater(datasource)

    //test overrides
    private val cache = InMemoryCache()
    private val catalog = Catalog(metadata, cache)
    private val queues = Queues(catalog)

    override fun userStore(): UserStore {
        return storage
    }

    override fun queues(): Queues {
        return queues
    }

    override fun cache(): Cache {
        return cache
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
class EmbeddedDataSource : PooledDataSource (
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost:5432/zack",
    "zack",
    "zack") {
}
