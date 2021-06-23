import cache.Cache
import cache.InMemoryCache
import catalog.Catalog
import catalog.MetadataSource
import db.DataSource
import db.Database
import db.Updater
import etc.PasswordUtil
import queue.Queues
import store.AWSUtil
import store.UserStore

class TestDeps : Dependencies {
    private val passwordUtil = PasswordUtil()
    private val awsUtil = AWSUtil()
    private val metadata = MetadataSource()
    private val storage = UserStore(passwordUtil, awsUtil.ddb)
    private val datasource = DataSource()
    private val database = Database(datasource)
    private val updater = DummyUpdater(datasource)

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

class DummyUpdater(dataSource: DataSource) : Updater(dataSource) {
    override fun update() {}
}