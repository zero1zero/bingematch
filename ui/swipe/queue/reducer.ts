import {queue} from "../model/compiled";
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
    cacheItems: queue.IQueuedItem[]
    cardItems: Item[]

    head: string
}

export const activeCardMax = 6
const moreActiveAt = 3
const backBuffer = 2

export const queueStateDefault : QueueState = {
    cardItems: [], cacheItems: [], head: undefined
}

export const queueSlice = createSlice({
    name: 'queue',
    initialState: queueStateDefault,
    reducers: {

        addToCache: (state, action: PayloadAction<queue.IQueuedItem[]>) => {
            state.cacheItems = state.cacheItems.concat(action.payload)

            //this is the only reducer that hydrates after we set cache items. this happens on first run.
            checkForCardHydrate(state)
        },

        interaction: (state, action: PayloadAction<{ name: InteractionName, item: Item }>) => {
            doInteraction(state, action.payload)
        },

        advanceHead: (state, action: PayloadAction<string>) => {
            doAdvanceHead(state, action.payload)
        },

        regressHead: (state, action: PayloadAction<string>) => {
            doRegressHead(state, action.payload)
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

        swipe: (state, action: PayloadAction<string>) => {
            setScreenLocation(state, action.payload, true)

            doAdvanceHead(state, action.payload)
        },

        backSwipe: (state, action: PayloadAction<string>) => {
            setScreenLocation(state, action.payload, true)

            doRegressHead(state, action.payload)
        },

        triggerSwipe: (state, action: PayloadAction<{ name: InteractionName, item: Item }>) => {
            setScreenLocation(state, action.payload.item.data.id, false)

            doInteraction(state, {
                name: action.payload.name,
                item: action.payload.item
            })
        }


    }
})
export const { addToCache, interaction, regressHead, setOffscreen, setOnscreen, setSync, advanceHead, swipe, backSwipe, triggerSwipe } = queueSlice.actions

const setScreenLocation = (state: QueueState, id : string, onscreen : boolean) => {

    checkForCardHydrate(state)

    const item = getItem(state.cardItems, id)

    item.onscreen = onscreen

    state.cardItems = updateInPlace(state.cardItems, item)
}

const doAdvanceHead = (state: QueueState, id : string) => {

    checkForCardHydrate(state)

    //short circuit if we are trying to move away from not the current
    if (state.head != id) {
        return
    }

    state.head = nextHead(state.cardItems, state.head)

    console.debug('====== Queue =======')
    state.cardItems.map(item => {
        let msg = '⇨ ' + item.data.show.title + (item.data.id == state.head ? ' - 🎥' : '')
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

const doRegressHead = (state: QueueState, id : string) => {
    checkForCardHydrate(state)

    //short circuit if we are trying to regress to anything other than one above current
    if (previousHead(state.cardItems, state.head) != id) {
        return
    }

    const prev = previous(state.cardItems, state.head)
    prev.synced = SyncStatus.UnSynced

    state.cardItems = updateInPlace(state.cardItems, prev)

    state.head = prev.data.id
}

const doInteraction = (state: QueueState, payload : { name: InteractionName, item: Item }) => {
    checkForCardHydrate(state)

    //if back, lets act on the previous item instead of current
    const item = (payload.name == InteractionName.ButtonBackPress
        ? previous(state.cardItems, payload.item.data.id)
        : getItem(state.cardItems, payload.item.data.id))

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
            break;

        case InteractionName.ButtonSeenItPress:
            //action will pass in the sentiment for seenit, based on rating
            item.sentiment = payload.item.sentiment
            break;
    }

    //remove any synced items after back queue
    state.cardItems = removeFinishedAfterBacks(state.cardItems, state.head, backBuffer)

    //we set sentiment above, still propagate new state
    state.cardItems = updateInPlace(state.cardItems, item)

    //if we swiped, we can do this right away
    if (payload.name == InteractionName.SwipeLike
        || payload.name == InteractionName.SwipeDislike) {

        //everything but the buttons should advance head
        state.head = nextHead(state.cardItems, state.head)
    }
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
                            data: raw,
                            sentiment: Sentiment.Unknown,
                            synced: SyncStatus.UnSynced
                        }
                    }
                ))

        if (!state.head) {
            state.head = loaded[0].data.id
        }

        state.cacheItems = remainingCache
        state.cardItems = loaded
    }
}
