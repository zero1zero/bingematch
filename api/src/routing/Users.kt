package routing

import Login
import Register
import store.UserStore
import UpdateUser
import User
import store.UserAlreadyExists
import UserWToken
import auth.JwtConfig
import io.ktor.application.call
import io.ktor.auth.ForbiddenResponse
import io.ktor.auth.authenticate
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.*
import principalNoMatch

fun Routing.user(userStore : UserStore) {

    route("/user") {

        /**
         * Login user
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

