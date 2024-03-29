import {expect, test} from '@jest/globals'
import {user} from '../../model/compiled'
import Storage from '../../Storage'

import API from "../API";

const storage = new Storage()
let api = new API(storage)

let login: user.ILogin = {
    email: 'test.API.test.tsx@test.com',
    password: 'horse battery staple login'
}

beforeAll(async () => {
    await api.refreshForTest(login)
})

afterAll(async () => {
    await api.deleteCurrentUser()
    await api.cleanup()
})

test('popular call returns 20 results', async () => {
    expect.assertions(1)
    await api.getQueue()
        .then(popular => {
            expect(popular.length).toBe(40)
        })
})

test('login with test username', async () => {
    expect.assertions(1)

    await api.login(login)
        .then(token => {
            expect(token).toBeTruthy()
        })
})
