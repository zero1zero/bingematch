import {expect, test} from '@jest/globals'
import {user, queue} from '../../model/compiled'
import Storage from '../../Storage'

import API from "../API";

const storage = new Storage()
let api = new API(storage)

beforeAll(async () => {

    let login : user.ILogin = {
        email: 'test@test.com',
        password: 'horse battery staple login'
    }
    await api.login(login)
        .then(token => {
            console.log("Cleaning up stale user for testing...")
            //oops, we still have this user around
            const id = storage.getUserFromToken(token)
            return api.deleteUser(id)
        })
        .catch(e => {
            //this means the user doesnt exist, which is what we want
            if (e.status == 403) {
                return
            }
            throw e
        })
        .then(() => {
            api.signup(login)
                .then(token => {
                    console.log("Using test token " + token.token)
                })
        })
});

afterAll(async () => {
    await storage.getToken()
        .then(token => {
            if (!token) {
                return
            }

            api.deleteUser(storage.getUserFromToken(token))
        })
})

test('popular call returns 20 results', async () => {
    expect.assertions(1)
    await api.popular()
        .then(popular => {
            expect(popular.items.length).toBe(20)
        })
})

test('login with test username', async () => {
    expect.assertions(1)
    let login : user.ILogin = {
        email: 'test@test.com',
        password: 'horse battery staple login'
    }

    await api.login(login)
        .then(token => {
            console.log(token)
            expect(token).toBeTruthy()
        })
})
