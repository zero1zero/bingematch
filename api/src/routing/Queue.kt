package routing

import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.response.*
import io.ktor.routing.*
import queue.Queues


fun Routing.queue(queues : Queues) {

    route("/queue") {

        get("/") {
            val principal = call.principal<UserIdPrincipal>()

            call.respond(queues.getQueued().toByteArray())
        }
    }
}
