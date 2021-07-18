package catalog

import TestDeps
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test

internal class CatalogSyncTest {

    @Disabled("To expensive for everyday running")
    @Test
    fun catalogUpdate() {
        val testDeps = TestDeps()

        val sync = CatalogSync(testDeps.database(), testDeps.catalog(), TMDB())

        //just exercise it
        sync.updateCatalogCaches()
    }
}