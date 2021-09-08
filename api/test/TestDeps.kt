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

open class TestDeps : Dependencies {
    private val passwordUtil = PasswordUtil()
    private val metadata = MetadataSource()

    private val datasource = EmbeddedDataSource()
    private val database = Database(datasource)
    private val genres = Genres(metadata)
    private val storage = Users(passwordUtil, genres)
    private val updater = Updater(datasource)

    //test overrides
    private val catalog = Catalog(metadata)
    private val lists = Lists()
    private val queues = Queue(lists, catalog)

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
class EmbeddedDataSource : PooledDataSource (
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost:5432/zack",
    "zack",
    "zack") {
}
