package routing

import auth.JwtConfig
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import principalNoMatch
import store.UserAlreadyExists
import store.UserStore
import user.User

fun Routing.user(userStore : UserStore) {

    route("/user") {

        /**
         * etc.Login user
         */
        post("/login") {
            val credentials = call.receive<User.Login>()
            val user = userStore.getUserByLogin(credentials.email, credentials.password)

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

            userStore.getUserByEmail(newUser.email)
                .onFailure {
                    //user is not found, we're good to create
                    val user = userStore.createUser(newUser)
                    val token: String = JwtConfig.makeToken(user)

                    call.respond(User.DetailAndToken.newBuilder()
                        .setDetail(user)
                        .setToken(token)
                        .build())
                }
                .onSuccess {
                    //user is found, no duplicates
                    call.respond(HttpStatusCode.BadRequest, UserAlreadyExists().message!!)
                }
        }

        authenticate {
            /**
             * Get user by id
             */
            get("/{id}") {
                val id: String = call.parameters["id"]!!

                //check principal
                if (principalNoMatch(id, call)) return@get

                userStore.getUser(id)
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
                val updateUser = call.receive<User.Update>()
                val id: String = call.parameters["id"]!!

                val user = User.Detail.newBuilder()
                    .setId(id)
                    .setEmail(updateUser.email)
                    .setFirst(updateUser.first)
                    .setLast(updateUser.last)
                    .build()

                userStore.updateUser(user, updateUser.password)

                call.respond(HttpStatusCode.OK)
            }

            /**
             * Delete user
             */
            delete("/{id}") {
                val id: String = call.parameters["id"]!!

                //check principal
                if (principalNoMatch(id, call)) return@delete

                userStore.delUser(id)

                call.respond(HttpStatusCode.Accepted)
            }
        }
    }
}

