package lists

import TestDeps
import UseTestApp
import catalog.Genres
import catalog.MetadataSource
import etc.PasswordUtil
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Order
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import user.User
import user.Users

internal class ListsTest {
    private val deps = TestDeps()
    private val lists = deps.lists()
    private val session = deps.database().newSession()

    private lateinit var user : User.Detail

    @BeforeEach
    fun before() {
        val users = Users(PasswordUtil(), Genres(MetadataSource()))
        user = users.createUser(User.Register.newBuilder()
            .setFirst("first")
            .setLast("last")
            .setEmail("an@email.com")
            .setPassword("a pass")
            .build(), session)

        val newQueued = listOf(
            User.QueuedShow.newBuilder()
                .setShow("my-show1")
                .build(),
            User.QueuedShow.newBuilder()
                .setShow("my-show2")
                .build(),
            User.QueuedShow.newBuilder()
                .setShow("my-show3")
                .build(),
            User.QueuedShow.newBuilder()
                .setShow("my-show4")
                .build(),
            User.QueuedShow.newBuilder()
                .setShow("my-show5")
                .build(),
        )

        lists.updateQueued(user.id, newQueued, session)
    }

    companion object {
    }

    @Test
    fun like() {
        var queued = lists.getQueued(user.id, session)
        assertEquals(5, queued.size)

        val ogQueueSize = queued.size

        var likes = lists.getLiked(user.id, session)
        assertEquals(0, likes.size)

        lists.like(user.id, "my-show2", session)

        likes = lists.getLiked(user.id, session)
        assertEquals(1, likes.size)

        queued = lists.getQueued(user.id, session)
        assertEquals(ogQueueSize - 1, queued.size)
    }

    @Test
    fun dislike() {
        var queued = lists.getQueued(user.id, session)
        assertEquals(5, queued.size)

        val ogQueueSize = queued.size

        lists.dislike(user.id, "my-show4", session)

        queued = lists.getQueued(user.id, session)
        assertEquals(ogQueueSize - 1, queued.size)
    }

    @Test
    fun back() {
        var queued = lists.getQueued(user.id, session)
        assertEquals(5, queued.size)

        val ogQueueSize = queued.size

        lists.like(user.id, "my-show4", session)
        lists.back(user.id, "my-show4", session)
        lists.dislike(user.id, "my-show4", session)
        lists.back(user.id, "my-show4", session)
        lists.like(user.id, "my-show4", session)

        val likes = lists.getLiked(user.id, session)
        assertEquals(1, likes.size)

        queued = lists.getQueued(user.id, session)
        assertEquals(ogQueueSize - 1, queued.size)
    }
}