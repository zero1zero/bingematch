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
                val session = call.attributes[SharedSqlSession.session]

                val id = call.parameters["id"]!!

                val show = catalog.getShow(id, session)

                call.respond(show)
            }

            get("/") {
                val session = call.attributes[SharedSqlSession.session]

                val shows = call.request.queryParameters["id"]!!.split(",")
                    .map { id ->
                        catalog.getShow(id, session)
                    }
                    .toList()

                call.respond(shows)
            }
        }
    }
}
