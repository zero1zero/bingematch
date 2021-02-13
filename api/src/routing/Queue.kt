package routing

import io.ktor.application.call
import io.ktor.auth.UserIdPrincipal
import io.ktor.auth.principal
import store.UserStore
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.route


fun Routing.queue(userStore : UserStore) {

    route("/queue") {

        get("/") {
            val principal = call.principal<UserIdPrincipal>()


        }
    }
}
