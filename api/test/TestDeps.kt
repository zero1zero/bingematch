import cache.Cache
import cache.InMemoryCache
import catalog.Catalog
import catalog.MetadataSource
import etc.PasswordUtil
import queue.Queues
import store.AWSUtil
import store.UserStore

class TestDeps : Dependencies {
    private val passwordUtil = PasswordUtil()
    private val awsUtil = AWSUtil()
    private val metadata = MetadataSource()
    private val storage = UserStore(passwordUtil, awsUtil.ddb)

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
}
