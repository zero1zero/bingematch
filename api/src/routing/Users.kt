package routing

import UserWToken
import auth.JwtConfig
import etc.Login
import etc.Register
import etc.UpdateUser
import etc.User
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import principalNoMatch
import store.UserAlreadyExists
import store.UserStore

fun Routing.user(userStore : UserStore) {

    route("/user") {

        /**
         * etc.Login user
         */
        post("/login") {
            val credentials = call.receive<Login>()
            val user = userStore.getUserByLogin(credentials.email, credentials.password)

            user
                .onFailure {
                    call.respond(ForbiddenResponse())
                }
                .onSuccess {
                    val token: String = JwtConfig.makeToken(it)
                    call.respondText(token)
                }
        }

        /**
         * Create new user
         */
        post("/") {
            val newUser = call.receive<Register>()

            userStore.getUserByEmail(newUser.email)
                .onFailure {
                    //user is not found, we're good to create
                    val user = userStore.createUser(newUser)
                    val token: String = JwtConfig.makeToken(user)

                    call.respond(UserWToken(user, token))
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
                val updateUser = call.receive<UpdateUser>()
                val id: String = call.parameters["id"]!!

                val user = User(updateUser.email, phone = updateUser.phone, id = id)

                userStore.updateUser(user)

                if (updateUser.password != "") {
                    userStore.savePassword(id, updateUser.password)
                }

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

