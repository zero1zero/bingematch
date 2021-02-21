import {test, expect} from '@jest/globals'

import Api from "../api";

const sum = (a, b) => a + b;
let api = new Api()

test('popular call returns 20 results', () => {
    expect.assertions(1)
    return api.popular().then(items => {
        expect(items.items.length).toBe(20)
    })
})

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});