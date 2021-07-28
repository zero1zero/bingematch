package routing

import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.*
import principalNoMatch
import queue.Queues
import routing.etc.SharedSqlSession


fun Routing.queue(queues : Queues) {

    authenticate {
        route("/queue") {

            get("/") {
                val principal = call.principal<UserIdPrincipal>()
                val session = call.attributes[SharedSqlSession.session]

                val queued = queues.getQueued(principal!!.name, session)

                if (principalNoMatch(queued.getItems(0).user, call)) return@get

                call.respond(queued)
            }

            put("/set/{id}/{state}") {
                val principal = call.principal<UserIdPrincipal>()!!.name
                val session = call.attributes[SharedSqlSession.session]

                val id = call.parameters["id"]!!
                val state : Int = call.parameters["state"]!!.toInt()

                val item = queues.getQueueItem(id, session)

                if (item.userId != principal) {
                    call.respond(HttpStatusCode.Forbidden)
                    return@put
                }

                queues.updateState(item.id, state, session)

                call.respond(HttpStatusCode.Accepted)
            }

            get("/likes") {
                val principal = call.principal<UserIdPrincipal>()!!.name
                val session = call.attributes[SharedSqlSession.session]

                call.respond(queues.getLikes(principal, session))
            }
        }
    }
}
