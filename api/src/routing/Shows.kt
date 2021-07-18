package routing

import catalog.Catalog
import catalog.Genres
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.response.*
import io.ktor.routing.*
import routing.etc.SharedSqlSession


fun Routing.show(catalog : Catalog, genres : Genres) {
    authenticate {

        get("/genres") {
            call.respond(genres.getAllGenres())
        }

        route("/show") {

            get("/{id}") {
                val principal = call.principal<UserIdPrincipal>()
                val session = call.attributes[SharedSqlSession.session]

                val id = call.parameters["id"]!!

                call.respond(catalog.getShow(id, session))
            }
        }
    }
}
