package com.avervest

import ChartManySeries
import Frequency
import Login
import PlanAndTrades
import Register
import TestPlan
import Timeline
import Trade
import UpdateUser
import User
import UserWToken
import auth.JwtConfig
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.handleRequest
import io.ktor.server.testing.setBody
import io.ktor.server.testing.withTestApplication
import module
import objectMapper
import org.joda.money.CurrencyUnit
import org.joda.money.Money
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals


class ApplicationTest {

    private lateinit var user: User

    private val testRegister = Register("api-testing@vestly.io", "horse battery staple login")

    @BeforeTest
    fun setup() {
        withTestApplication({ module() }) {

            val latch = CountDownLatch(1)

            //make sure there isnt an existing user. login and delete them if so
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(Login(testRegister.email, testRegister.password)))
            }.apply {
                if (response.status() == HttpStatusCode.Forbidden) {
                    latch.countDown()
                    return@apply //user doesnt exist
                }
                val token = response.content
                val verify = JwtConfig.verifier.verify(token)

                println("Cleaning up existing test user...")

                //cleanup user
                handleRequest(HttpMethod.Delete, "/user/${verify.getClaim("id").asString()}") {
                    addHeader(HttpHeaders.Authorization, "Bearer $token")
                }.apply {
                    assertEquals(HttpStatusCode.Accepted, response.status())

                    latch.countDown()
                }
            }

            latch.await(5000, TimeUnit.SECONDS)

            //create user
            handleRequest(HttpMethod.Post, "/user") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(testRegister))
            }.apply {
                val userwtoken = objectMapper.readValue(response.content, UserWToken::class.java)
                user = userwtoken.user
            }
        }
    }

    @Test
    fun testRoot() {
        withTestApplication({ module() }) {

            val plan = TestPlan(
                Money.of(CurrencyUnit.USD, 20_000.0),
                Timeline(LocalDate.parse("2020-05-01"), LocalDate.parse("2020-09-01")),
                "NKE",
                Frequency(1, ChronoUnit.MONTHS)
            )

            handleRequest(HttpMethod.Post, "/plan/test") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(plan))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
                val planAndTrades = objectMapper.readValue(response.content, PlanAndTrades::class.java)

                //upate id so original should match
                val expectedPlan = TestPlan(plan.amount, plan.timeline, plan.symbol, plan.frequency)
                expectedPlan.id = planAndTrades.plan.id

                val trades = listOf(
                    Trade(
                        LocalDate.parse("2020-05-01"),
                        Money.of(CurrencyUnit.USD, 4000.0),
                        "NKE",
                        planAndTrades.plan.id,
                        planAndTrades.trades[0].id
                    ),
                    Trade(
                        LocalDate.parse("2020-06-01"),
                        Money.of(CurrencyUnit.USD, 4000.0),
                        "NKE",
                        planAndTrades.plan.id,
                        planAndTrades.trades[1].id
                    ),
                    Trade(
                        LocalDate.parse("2020-07-01"),
                        Money.of(CurrencyUnit.USD, 4000.0),
                        "NKE",
                        planAndTrades.plan.id,
                        planAndTrades.trades[2].id
                    ),
                    Trade(
                        LocalDate.parse("2020-08-01"),
                        Money.of(CurrencyUnit.USD, 4000.0),
                        "NKE",
                        planAndTrades.plan.id,
                        planAndTrades.trades[3].id
                    ),
                    Trade(
                        LocalDate.parse("2020-09-01"),
                        Money.of(CurrencyUnit.USD, 4000.0),
                        "NKE",
                        planAndTrades.plan.id,
                        planAndTrades.trades[4].id
                    )
                )

                assertEquals(HttpStatusCode.OK, response.status())
                assertEquals(PlanAndTrades(expectedPlan.toPlan(), trades), planAndTrades)
            }
        }
    }

    @Test
    fun testLogin() {
        withTestApplication({ module() }) {

//            failed login!
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(Login(testRegister.email, "a wrong password")))
            }.apply {
                assertEquals(HttpStatusCode.Forbidden, response.status())
            }

            //unauthorized api call
            handleRequest(HttpMethod.Get, "/user/${user.id}") {} //no auth
                .apply {
                    assertEquals(HttpStatusCode.Unauthorized, response.status())
                }

            val token: String

            //login user
            val login = Login(testRegister.email, testRegister.password)
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(login))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())

                token = response.content!!
            }

            //get user
            handleRequest(HttpMethod.Get, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer : $token")
            }
                .apply {
                    assertEquals(HttpStatusCode.OK, response.status())
                    val user1 = objectMapper.readValue(response.content, User::class.java)

                    assertEquals(user.id, user1.id)
                }
        }
    }

    @Test
    fun testStock() {

        withTestApplication({ module() }) {
            handleRequest(HttpMethod.Get, "/stock/chart") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
            }
                .apply {
                    assertEquals(HttpStatusCode.OK, response.status())

                    val chart = objectMapper.readValue(response.content, ChartManySeries::class.java)

                    println(chart)
                }
        }
    }

    @Test
    fun updateUser() {

        withTestApplication({ module() }) {

            val updateUser = UpdateUser(user.email, "5039843253")

            handleRequest(HttpMethod.Put, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(updateUser))
            }
                .apply {
                    assertEquals(HttpStatusCode.OK, response.status())
                }

            handleRequest(HttpMethod.Get, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
            }
                .apply {
                    assertEquals(HttpStatusCode.OK, response.status())

                    val user1 = objectMapper.readValue(response.content, User::class.java)

                    assertEquals(user.id, user1.id)
                    assertEquals(updateUser.phone, user1.phone)

                    //also verify that we have an updated phone
                    assertEquals(updateUser.phone, user1.phone)

                }
        }
    }

    @Test
    fun updatePassword() {

        withTestApplication({ module() }) {

            val updateUser = UpdateUser(user.email, "5039843253", "hello there")

            handleRequest(HttpMethod.Put, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(updateUser))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }

            //login test test new pw
            handleRequest(HttpMethod.Post, "/user/login") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(Login(user.email, "hello there")))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }

            //switch password back for cleanup
            handleRequest(HttpMethod.Put, "/user/${user.id}") {
                addHeader(HttpHeaders.Authorization, "Bearer ${JwtConfig.makeToken(user)}")
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())

                setBody(objectMapper.writeValueAsString(UpdateUser(user.email, password = testRegister.password)))
            }.apply {
                assertEquals(HttpStatusCode.OK, response.status())
            }
        }
    }
}
