package routing

import auth.JwtConfig
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import principalNoMatch
import routing.etc.SharedSqlSession
import user.User
import user.UserAlreadyExists
import user.Users

fun Routing.user(users : Users) {

    route("/user") {

        /**
         * etc.Login user
         */
        post("/login") {
            val session = call.attributes[SharedSqlSession.session]

            val credentials = call.receive<User.Login>()
            val user = users.getUserByLogin(credentials.email, credentials.password, session)

            user
                .onFailure {
                    call.respond(ForbiddenResponse())
                }
                .onSuccess {
                    val token: String = JwtConfig.makeToken(it)
                    call.respond(token)
                }
        }

        /**
         * Create new user
         */
        post("/") {
            val newUser = call.receive<User.Register>()
            val session = call.attributes[SharedSqlSession.session]

            users.getUserByEmail(newUser.email, session)
                .onFailure {
                    //user is not found, we're good to create
                    val user = users.createUser(newUser, session)
                    val token: String = JwtConfig.makeToken(user)

                    call.respond(User.DetailAndToken.newBuilder()
                        .setDetail(user)
                        .setToken(token)
                        .build())
                }
                .onSuccess {
                    //user is found, this means they exist
                    call.respond(HttpStatusCode.BadRequest, UserAlreadyExists().message!!)
                }
        }

        authenticate {
            /**
             * Get user by id
             */
            get("/{id}") {
                val session = call.attributes[SharedSqlSession.session]

                val id: String = call.parameters["id"]!!

                //check principal
                if (principalNoMatch(id, call)) return@get

                users.getUser(id, session)
                    .onFailure {
                        call.respond(HttpStatusCode.NotFound)
                    }.onSuccess {
                        call.respond(it)
                    }
            }

            /**
             * Update user
             */
            put("/{id}") {
                val session = call.attributes[SharedSqlSession.session]

                val updateUser = call.receive<User.Update>()
                val id: String = call.parameters["id"]!!

                if (principalNoMatch(id, call)) return@put

                val user = User.Detail.newBuilder()
                    .setId(id)
                    .setEmail(updateUser.email)
                    .setFirst(updateUser.first)
                    .setLast(updateUser.last)
                    .build()

                users.updateUser(user, updateUser.password, session)

                call.respond(HttpStatusCode.OK)
            }

            put("/{id}/genres") {
                val session = call.attributes[SharedSqlSession.session]

                val genres = call.receive<List<Int>>()

                val id: String = call.parameters["id"]!!

                if (principalNoMatch(id, call)) return@put

                users.updateGenres(id, genres, session)

                call.respond(HttpStatusCode.OK)
            }

            /**
             * Delete user
             */
            delete("/{id}") {
                val session = call.attributes[SharedSqlSession.session]
                val id: String = call.parameters["id"]!!

                //check principal
                if (principalNoMatch(id, call)) return@delete

                users.delUser(id, session)

                call.respond(HttpStatusCode.Accepted)
            }
        }
    }
}

