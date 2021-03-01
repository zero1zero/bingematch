import cache.Cache
import cache.InMemoryCache
import cache.RedisCache
import catalog.Catalog
import catalog.MetadataSource
import etc.PasswordUtil
import queue.Queues
import store.AWSUtil
import store.UserStore

interface Dependencies {

    fun userStore() : UserStore
    fun queues() : Queues
    fun cache() : Cache

}

open class ProdDeps : Dependencies {

    private val passwordUtil = PasswordUtil()
    private val awsUtil = AWSUtil()
    private val metadata = MetadataSource()
    private val cache : Cache = RedisCache()
    private val catalog = Catalog(metadata, cache)
    private val queues = Queues(catalog)
    private val storage = UserStore(passwordUtil, awsUtil.ddb)

    override fun userStore(): UserStore {
        return storage
    }

    override fun queues(): Queues {
        return queues
    }

    override fun cache(): Cache {
        return cache
    }
}