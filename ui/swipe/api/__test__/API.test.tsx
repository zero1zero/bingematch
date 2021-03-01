import {expect, test} from '@jest/globals'

import API from "../API";

let api = new API()

test('popular call returns 20 results', async () => {
    expect.assertions(1)
    await api.popular().then(items => {
        expect(items.items.length).toBe(20)
    })
})

// test('login with test username', async () => {
//     expect.assertions(1)
//     let login : user.ILogin = {
//         email: 'test@test.com',
//         password: 'horse battery staple login'
//     }
//
//     await api.login(login)
//         .then(token => {
//             console.log(token)
//             expect(token).toBeTruthy()
//         })
// })

// test('signup with test username', async () => {
//     expect.assertions(1)
//     let login : user.ILogin = {
//         email: 'test@test.com',
//         password: 'horse battery staple login'
//     }
//     await api.signup(login)
//         .then(token => {
//             console.log(token)
//             expect(token).toBeTruthy()
//         })
// })
