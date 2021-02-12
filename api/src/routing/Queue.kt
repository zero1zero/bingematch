package routing

import store.UserStore
import io.ktor.routing.Routing
import io.ktor.routing.post
import io.ktor.routing.route


fun Routing.queue(userStore : UserStore) {

    route("/user") {

        /**
         * Login user
         */
        post("/login") {

        }
    }
}
