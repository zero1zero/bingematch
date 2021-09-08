import {
    countAfterHeadInclusive,
    getItem,
    nextHead,
    previous,
    previousHead,
    removeFinishedAfterBacks,
    updateInPlace
} from "./QueueUtils";
import {Item, Sentiment, SyncStatus} from "./QueueEvents";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {show} from "../model/compiled";

export enum InteractionName {
    SwipeLike,
    SwipeDislike,
    Report,
    ButtonLikePress,
    ButtonDislikePress,
    ButtonBackPress,
    ButtonSeenItPress,
}

export type QueueState = {
    cacheItems: show.IDetail[]
    cardItems: Item[]

    head: string

    lastAddedCount: number
}

export const activeCardMax = 6
const moreActiveAt = 3
const backBuffer = 2

export const queueStateDefault : QueueState = {
    cardItems: [], cacheItems: [], head: undefined, lastAddedCount: 1000
}

export const queueSlice = createSlice({
    name: 'queue',
    initialState: queueStateDefault,
    reducers: {

        addToCache: (state, action: PayloadAction<show.IDetail[]>) => {
            const uniqueNew = action.payload.filter(item => state.cacheItems.find(d => d.id == item.id) == undefined)

            state.cacheItems = state.cacheItems.concat(uniqueNew)
            state.lastAddedCount = uniqueNew.length

            //this is the only reducer that hydrates after we set cache items. this happens on first run.
            checkForCardHydrate(state)
        },

        resetLastAddedCount: (state) => {
            state.lastAddedCount = 1000
        },

        interaction: (state, action: PayloadAction<{ name: InteractionName, item: Item }>) => {
            doInteraction(state, action.payload)
        },

        setOnscreen: (state, action: PayloadAction<string>) => {
            setScreenLocation(state, action.payload, true)
        },

        setOffscreen: (state, action: PayloadAction<string>) => {
            setScreenLocation(state, action.payload, false)
        },

        setSync: (state, action: PayloadAction<{ sync: SyncStatus, id: string }>) => {
            checkForCardHydrate(state)

            const item = getItem(state.cardItems, action.payload.id)

            item.synced = action.payload.sync

            state.cardItems = updateInPlace(state.cardItems, item)
        },
    }
})
export const { addToCache, interaction, setSync, setOffscreen, setOnscreen, resetLastAddedCount } = queueSlice.actions

const setScreenLocation = (state: QueueState, show : string, onscreen : boolean) => {
    console.debug(`setting screen location ${show} -> ${onscreen}`)

    const item = getItem(state.cardItems, show)

    item.onscreen = onscreen

    state.cardItems = updateInPlace(state.cardItems, item)
}

const doAdvanceHead = (state: QueueState, show : string) => {

    //short circuit if we are trying to move away from not the current
    if (state.head != show) {
        return
    }

    state.head = nextHead(state.cardItems, state.head)

    if (!state.head) {
        console.debug("No next! Get more in queue")
        return
    }

    console.debug(`advancing head from ${show} to ${state.head}`)

    console.debug('====== Queue =======')
    state.cardItems.map(item => {
        let msg = '⇨ ' + item.show.title + (item.show.id == state.head ? ' - 🎥' : '')
        switch (item.synced) {
            case SyncStatus.Syncing:
                msg += ' 🔄'
                break;
            case SyncStatus.Synced:
                msg += ' ✅'
                break;
        }
        console.debug(msg)
    })
    console.debug('====== /Queue =======')
}

const doRegressHead = (state: QueueState, show : string) => {

    const prev = previousHead(state.cardItems, state.head)

    //short circuit if we are trying to regress to anything other than one above current
    if (prev != show) {
        return
    }

    console.debug(`regressing head from ${show} to ${prev}`)

    state.head = prev
}

const doInteraction = (state: QueueState, payload : { name: InteractionName, item: Item }) => {
    console.debug(`interaction of ${payload.name} with ${payload.item.show.id}`)

    checkForCardHydrate(state)

    //if back, lets act on the previous item instead of current
    const item = (payload.name == InteractionName.ButtonBackPress
        ? previous(state.cardItems, payload.item.show.id)
        : getItem(state.cardItems, payload.item.show.id))

    switch (payload.name) {
        case InteractionName.ButtonLikePress:
        case InteractionName.SwipeLike:
            item.sentiment = Sentiment.Like
            break

        case InteractionName.ButtonDislikePress:
        case InteractionName.SwipeDislike:
            item.sentiment = Sentiment.Dislike
            break

        case InteractionName.ButtonBackPress:
            item.sentiment = Sentiment.Unknown
            item.synced = SyncStatus.DeSynced
            break;

        case InteractionName.ButtonSeenItPress:
            //action will pass in the sentiment for seenit, based on rating
            item.sentiment = payload.item.sentiment
            break;
    }

    if (payload.name == InteractionName.ButtonBackPress) {
        doRegressHead(state, item.show.id)
    } else {
        doAdvanceHead(state, item.show.id)
    }

    //remove any synced items after back queue
    state.cardItems = removeFinishedAfterBacks(state.cardItems, state.head, backBuffer)
    //
    // //we set sentiment above, still propagate new state
    // state.cardItems = updateInPlace(state.cardItems, item)
}

const checkForCardHydrate = (state: QueueState) => {

    //only try if we have cache items
    if (state.cacheItems.length == 0) {
        return
    }

    //if less cards than we want, load more cards
    const activeCardCount = countAfterHeadInclusive(state.cardItems, state.head)
    if (activeCardCount <= moreActiveAt) {

        const cardsToPullFromCache = activeCardMax - activeCardCount

        const remainingCache = state.cacheItems.slice(cardsToPullFromCache)
        const forCards = state.cacheItems.slice(0, cardsToPullFromCache)

        const loaded: Item[] = state.cardItems
            .concat(forCards
                .map(raw => {
                        return {
                            onscreen: true,
                            show: raw,
                            sentiment: Sentiment.Unknown,
                            synced: SyncStatus.UnSynced
                        }
                    }
                ))

        if (!state.head) {
            state.head = loaded[0].show.id
        }

        state.cacheItems = remainingCache
        state.cardItems = loaded
    }
}
