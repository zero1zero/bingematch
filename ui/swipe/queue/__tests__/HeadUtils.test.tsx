import {expect, test} from "@jest/globals";
import {queue} from "../../model/compiled";
import {
    afterHeadInclusive,
    beforeHeadExclusive,
    countAfterHeadInclusive,
    getItem,
    headIndex,
    nextHead, previousHead
} from "../HeadUtils";
import {Item, Sentiment} from "../Event";

const items : Item[] = [
    'hello',
    'my',
    'name',
    'is',
    'zack',//4
    'this',
    'ars',
    'a',
    'good',
    'test'
].map((str) => {
    return {
        sentiment: Sentiment.Unknown,
        onscreen: true,
        data: queue.Item.create({
            id: str
        })
    }
})

test('all items after the index inclusive of head', async () => {
    expect.assertions(1)
    expect(afterHeadInclusive(items, 'a').map(item=>item.data.id)).toEqual(['a', 'good', 'test'])
})

test('get the next head id', async () => {
    expect.assertions(1)

    expect(nextHead(items, 'name')).toEqual('is')
})

test('get the correct head index', async () => {
    expect.assertions(1)

    expect(headIndex(items, 'zack')).toEqual(4)
})

test('get the previous head', async () => {
    expect.assertions(1)

    expect(previousHead(items, 'zack')).toEqual('is')
})

test('correctly count items after head', async () => {
    expect.assertions(1)

    expect(countAfterHeadInclusive(items, 'this')).toEqual(5)
})

test('get everything we\'ve swiped', async () => {
    expect.assertions(1)

    expect(beforeHeadExclusive(items, 'name').map(item=>item.data.id)).toEqual(['hello', 'my'])
})

test('before and after head lookups match', async () => {
    expect.assertions(1)

    expect(beforeHeadExclusive(items, 'ars').length + afterHeadInclusive(items, 'ars').length).toEqual(items.length)
})

test('correctly get head item', async () => {
    expect.assertions(1)

    expect(getItem(items, 'ars')).toEqual({
        sentiment: Sentiment.Unknown,
        onscreen: true,
        data: queue.Item.create({
            id: 'ars'
        })
    })
})
