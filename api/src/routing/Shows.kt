package routing

import catalog.Catalog
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.response.*
import io.ktor.routing.*
import queue.Queues


fun Routing.show(catalog : Catalog) {

    route("/show") {

        get("/{id}") {
            val principal = call.principal<UserIdPrincipal>()

            val id = call.parameters["id"]!!

            call.respond(catalog.getShow(id))
        }
    }
}
