package routing

import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.routing.*
import store.UserStore


fun Routing.queue(userStore : UserStore) {

    route("/queue") {

        get("/") {
            val principal = call.principal<UserIdPrincipal>()


        }
    }
}
