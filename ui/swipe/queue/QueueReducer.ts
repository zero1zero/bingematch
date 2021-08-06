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

export enum InteractionName {
    SwipeLike,
    SwipeDislike,
    Report,
    ButtonLikePress,
    ButtonDislikePress,
    ButtonBackPress,
    ButtonSeenItPress,
}

export interface StateChange {
    interaction?: { name: InteractionName, item: Item }

    addToCache?: queue.QueuedItem[]
    addToCardItems?: Item[]

    regressHead?: string //from
    advanceHead?: string //to

    setOnscreen?: string
    setOffscreen?: string

    setSync?: { sync: SyncStatus, id: string }
}

export type QueueState = {
    cacheItems: queue.QueuedItem[]
    cardItems: Item[]

    head: string
}

export const activeCardMax = 6
const moreActiveAt = 3
const backBuffer = 2

export const queueReducerDefaults = {
    cardItems: [], cacheItems: [], head: undefined
}
export type QueueReducer = (state: QueueState, change: StateChange) => QueueState
export const queueReducer : QueueReducer = (state: QueueState, change: StateChange): QueueState => {

    if (change.addToCache) {
        state.cacheItems = state.cacheItems.concat(change.addToCache)
    }

    state = checkForCardHydrate(state)

    if (change.interaction) {
        //if back, lets act on the previous item instead of current
        const item = (change.interaction.name == InteractionName.ButtonBackPress
            ? previous(state.cardItems, change.interaction.item.data.id)
            : getItem(state.cardItems, change.interaction.item.data.id))

        switch (change.interaction.name) {
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
                item.sentiment = change.interaction.item.sentiment
                break;
        }

        //remove any synced items after back queue
        state.cardItems = removeFinishedAfterBacks(state.cardItems, state.head, backBuffer)

        //we set sentiment above, still propagate new state
        updateInPlace(state.cardItems, item)

        //if we swiped, we can do this right away
        if (change.interaction.name == InteractionName.SwipeLike
            || change.interaction.name == InteractionName.SwipeDislike) {

            //everything but the buttons should advance head
            state.head = nextHead(state.cardItems, state.head)
        }
    }

    if (change.advanceHead) {
        //short circuit if we are trying to move away from not the current
        if (state.head != change.advanceHead) {
            return state
        }

        state.head = nextHead(state.cardItems, state.head)
    }

    //on back, we move the pointer back and set the sentiment to undefined
    if (change.regressHead) {
        //short circuit if we are trying to regress to anything other than one above current
        if (previousHead(state.cardItems, state.head) != change.regressHead) {
            return state
        }

        const prev = previous(state.cardItems, state.head)
        prev.synced = SyncStatus.UnSynced

        updateInPlace(state.cardItems, prev)

        state.head = prev.data.id
    }

    if (change.setOnscreen) {
        const item = getItem(state.cardItems, change.setOnscreen)

        item.onscreen = true

        updateInPlace(state.cardItems, item)
    }

    if (change.setOffscreen) {
        const item = getItem(state.cardItems, change.setOffscreen)

        item.onscreen = false

        updateInPlace(state.cardItems, item)
    }

    if (change.setSync) {
        const item = getItem(state.cardItems, change.setSync.id)

        item.synced = change.setSync.sync

        updateInPlace(state.cardItems, item)
    }

    if (state.cardItems) {
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

    return Object.assign({}, state)
}

const checkForCardHydrate = (state: QueueState): QueueState => {

    //only try if we have cache items
    if (state.cacheItems.length == 0) {
        return state
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

        return {
            ...state,
            cacheItems: remainingCache,
            cardItems: loaded,
        }
    }

    return state
}
