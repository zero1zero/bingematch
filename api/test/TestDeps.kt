import catalog.Catalog
import catalog.Genres
import catalog.MetadataSource
import db.Database
import db.Updater
import etc.PasswordUtil
import org.apache.ibatis.datasource.pooled.PooledDataSource
import queue.Queues
import user.UserStore

open class TestDeps : Dependencies {
    private val passwordUtil = PasswordUtil()
    private val metadata = MetadataSource()

    private val datasource = EmbeddedDataSource()
    private val database = Database(datasource)
    private val genres = Genres(metadata)
    private val storage = UserStore(passwordUtil, genres)
    private val updater = Updater(datasource)

    //test overrides
    private val catalog = Catalog(metadata)
    private val queues = Queues(catalog)

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

    override fun genres(): Genres {
        return genres
    }
}
class EmbeddedDataSource : PooledDataSource (
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost:5432/zack",
    "zack",
    "zack") {
}
