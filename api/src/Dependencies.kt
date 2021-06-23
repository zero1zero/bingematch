import cache.Cache
import cache.RedisCache
import catalog.Catalog
import catalog.MetadataSource
import db.DataSource
import db.Database
import db.Updater
import etc.PasswordUtil
import queue.Queues
import show.Show
import store.AWSUtil
import store.UserStore

interface Dependencies {

    fun userStore() : UserStore
    fun queues() : Queues
    fun cache() : Cache
    fun catalog() : Catalog
    fun database() : Database
    fun updater() : Updater
}

open class ProdDeps : Dependencies {

    private val passwordUtil = PasswordUtil()
    private val awsUtil = AWSUtil()
    private val metadata = MetadataSource()
    private val cache : Cache = RedisCache()
    private val catalog = Catalog(metadata, cache)
    private val queues = Queues(catalog)
    private val storage = UserStore(passwordUtil, awsUtil.ddb)
    private val datasource = DataSource()
    private val database = Database(datasource)
    private val updater = Updater(datasource)

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

    override fun cache(): Cache {
        return cache
    }
}