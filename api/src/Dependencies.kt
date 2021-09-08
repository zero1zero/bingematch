import catalog.Catalog
import catalog.Genres
import catalog.MetadataSource
import db.Database
import db.Updater
import etc.PasswordUtil
import lists.Lists
import org.apache.ibatis.datasource.pooled.PooledDataSource
import queue.Queue
import user.Users

interface Dependencies {

    fun userStore() : Users
    fun queues() : Queue
    fun catalog() : Catalog
    fun database() : Database
    fun updater() : Updater
    fun genres() : Genres
    fun lists() : Lists
}

open class ProdDeps : Dependencies {

    private val passwordUtil = PasswordUtil()
    private val metadata = MetadataSource()
    private val datasource = ProdDataSource()
    private val database = Database(datasource)
    private val catalog = Catalog(metadata)
    private val lists = Lists()
    private val queues = Queue(lists, catalog)
    private val updater = Updater(datasource)
    private val genres = Genres(metadata)
    private val storage = Users(passwordUtil, genres)

    override fun userStore(): Users {
        return storage
    }

    override fun queues(): Queue {
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

    override fun genres(): Genres {
        return genres
    }

    override fun lists(): Lists {
        return lists
    }
}

class ProdDataSource : PooledDataSource(
    "org.postgresql.Driver",
    "jdbc:postgresql://postgres.default.svc.cluster.local:5432/zack",
    "zack",
    "bzGa8m6ekUYsRRUWpy"
)
