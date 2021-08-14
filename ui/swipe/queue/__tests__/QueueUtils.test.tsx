import {expect, test} from "@jest/globals";
import {
    afterHeadInclusive,
    beforeHeadExclusive,
    countAfterHeadInclusive,
    getItem,
    headIndex,
    nextHead,
    previousHead,
    removeFinishedAfterBacks
} from "../QueueUtils";
import {Item, Sentiment, SyncStatus} from "../QueueEvents";

const items: Item[] = [
    'hello', //synced
    'my', //synced
    'name', //syncing
    'is',
    'zack',//4
    'this',
    'ars',
    'a',
    'good',
    'test'
].map((str, idx) => {
    return {
        sentiment: Sentiment.Unknown,
        onscreen: true,
        synced: idx < 2 ? SyncStatus.Synced : idx == 2 ? SyncStatus.Syncing : SyncStatus.UnSynced,
        data: {
            id: str
        }
    }
})

test('all items after the index inclusive of head', async () => {
    expect.assertions(1)
    expect(afterHeadInclusive(items, 'a').map(item => item.data.id)).toEqual(['a', 'good', 'test'])
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

    expect(beforeHeadExclusive(items, 'name').map(item => item.data.id)).toEqual(['hello', 'my'])
})

test('before and after head lookups match', async () => {
    expect.assertions(1)

    expect(beforeHeadExclusive(items, 'ars').length + afterHeadInclusive(items, 'ars').length).toEqual(items.length)
})

test('correctly get head item', async () => {
    expect.assertions(1)

    expect(getItem(items, 'ars')).toEqual({
        sentiment: Sentiment.Unknown,
        synced: SyncStatus.UnSynced,
        onscreen: true,
        data: {
            id: 'ars'
        }
    })
})

test('remove all the synced items not including the back buffer', async () => {
    expect.assertions(1)

    expect(removeFinishedAfterBacks(items, 'ars', 2).map(item => item.data.id))
        .toEqual(['name', 'is', 'zack', 'this', 'ars', 'a', 'good', 'test'])
})

test('dont remove items in back buffer', async () => {
    expect.assertions(1)

    expect(removeFinishedAfterBacks(items, 'is', 2).map(item => item.data.id))
        .toEqual(['my', 'name', 'is', 'zack', 'this', 'ars', 'a', 'good', 'test'])
})
