package routing

import catalog.Catalog
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.response.*
import io.ktor.routing.*


fun Routing.queue(catalog : Catalog) {

    route("/queue") {

        get("/") {
            val principal = call.principal<UserIdPrincipal>()

            call.respond(catalog.getPopular())
        }
    }
}
