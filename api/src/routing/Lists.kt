package routing

import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import lists.Lists
import queue.Queue
import routing.etc.SharedSqlSession
import user.User


fun Routing.lists(lists : Lists, queue: Queue) {

    authenticate {
        route("/lists") {

            get("/queued") {
                val user = call.principal<UserIdPrincipal>()!!.name
                val session = call.attributes[SharedSqlSession.session]

                val queued = queue.getFillingQueued(user, session)

                call.respond(queued)
            }

            put("/like/{show}") {
                val user = call.principal<UserIdPrincipal>()!!.name
                val show : String = call.parameters["show"]!!
                val session = call.attributes[SharedSqlSession.session] //todo start transaction?

                lists.like(user, show, session)

                call.respond(HttpStatusCode.Accepted)
            }

            put("/dislike/{show}") {
                val user = call.principal<UserIdPrincipal>()!!.name
                val show : String = call.parameters["show"]!!
                val session = call.attributes[SharedSqlSession.session]

                lists.dislike(user, show, session)

                //move from queue to dislike
                call.respond(HttpStatusCode.Accepted)
            }

            put("/back/{show}") {
                val user = call.principal<UserIdPrincipal>()!!.name
                val show : String = call.parameters["show"]!!
                val session = call.attributes[SharedSqlSession.session]

                //move from any list back to queue
                lists.back(user, show, session)

                call.respond(HttpStatusCode.Accepted)
            }

            put("/watched/{show}") {
                val user = call.principal<UserIdPrincipal>()!!.name
                val show : String = call.parameters["show"]!!
                val watched = call.receive<User.WatchedShow>()
                val session = call.attributes[SharedSqlSession.session]

                //move from queue/like/matched to watched
                lists.watched(user, watched, session)

                call.respond(HttpStatusCode.Accepted)
            }

            get("/liked") {
                val user = call.principal<UserIdPrincipal>()!!.name
                val session = call.attributes[SharedSqlSession.session]

                call.respond(lists.getLiked(user, session))
            }

            get("/matched") {
                val user = call.principal<UserIdPrincipal>()!!.name
                val session = call.attributes[SharedSqlSession.session]

                call.respond(lists.getMatched(user, session))
            }

            get("/watched") {
                val user = call.principal<UserIdPrincipal>()!!.name
                val session = call.attributes[SharedSqlSession.session]

                call.respond(lists.getWatched(user, session))
            }
        }
    }
}
