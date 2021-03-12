import React, {useEffect, useReducer, useRef} from 'react';

import {Animated, SafeAreaView, StyleSheet, View} from "react-native";
import {queue} from "../model/compiled";
import {Button, Icon, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {BaseProps} from "../etc/BaseProps";
import Dependencies from "../Dependencies";
import Deck from "./Deck";
import {
    beforeHeadExclusive,
    countAfterHeadInclusive,
    getHead,
    getItem,
    next,
    nextHead,
    previous,
    previousHead,
    removeFinishedAfterBacks,
    updateInPlace
} from "./QueueUtils";
import {InteractionName, Item, Sentiment, StateChange, SyncStatus} from "./QueueEvents";
import QueueHeader from "./Header";
import QueueActions from "./Actions";
import {BingeMatch} from "../theme";

interface QueueState {
    cacheItems: queue.IItem[]
    cardItems: Item[]

    head: string
}

const activeCardMax = 6
const moreActiveAt = 3
const backBuffer = 2

type Reducer = (state : QueueState, change : StateChange) => QueueState
const reducer = (state : QueueState, change : StateChange) : QueueState => {

    if (change.addToCache) {
        state.cacheItems = state.cacheItems.concat(change.addToCache)
    }

    state = checkForCardHydrate(state)

    if (change.interaction) {
        console.log("interaction" + change.interaction.name)

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
            case InteractionName.SwipeLove:
                item.sentiment = Sentiment.Love
                break
            case InteractionName.SwipeHate:
                item.sentiment = Sentiment.Hate
                break
            case InteractionName.ButtonBackPress:
                item.sentiment = Sentiment.Unknown
                break;
        }

        //remove any synced items after back queue
        state.cardItems = removeFinishedAfterBacks(state.cardItems, state.head, backBuffer)

        //we set sentiment above, still propagate new state
        updateInPlace(state.cardItems, item)

        //if we swiped, we can do this right away
        if (change.interaction.name == InteractionName.SwipeLike
            || change.interaction.name == InteractionName.SwipeDislike
            || change.interaction.name == InteractionName.SwipeLove
            || change.interaction.name == InteractionName.SwipeHate) {

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
        state.cardItems.map( item => {
            let msg = '⇨ ' + item.data.movie.title + (item.data.id == state.head ? ' - 🎥' : '')
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

const checkForCardHydrate = (state : QueueState) : QueueState => {

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

        const loaded : Item[] = state.cardItems
            .concat(forCards
                .map(raw => { return {
                        onscreen: true,
                        data: raw,
                        sentiment: Sentiment.Unknown,
                        synced: SyncStatus.UnSynced
                    }}
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

const Queue : React.FC<BaseProps> = (props) => {

    const api = Dependencies.instance.api
    const [state, dispatch] = useReducer<Reducer>(reducer, {
        cardItems: [], cacheItems: [], head: undefined
    })

    useEffect(() => {
        if (state.cacheItems.length < activeCardMax) {
            console.log('loading more cache...')
            api.popular()
                .then(moreActive => {
                    dispatch({ addToCache: moreActive.items})
                })
        }
    }, [state.cacheItems])

    useEffect(() => {
        beforeHeadExclusive(state.cardItems, state.head)
            .filter(item => item.synced == SyncStatus.UnSynced)
            .forEach(item => {
                dispatch({ setSync: { sync: SyncStatus.Syncing, id: item.data.id }})
                new Promise<Item>((resolve) => {
                    console.log("send " + item.data.movie.title)
                    resolve(item)
                }).then(item => {
                    dispatch({ setSync: { sync: SyncStatus.Synced, id: item.data.id }})
                })
            })

    }, [state.cardItems])


    //cleanup when closed
    useEffect(() => {
        return api.cleanup
    }, [])

    return (
        <SafeAreaView style={styles.home}>
            <QueueHeader navigation={props.navigation} route={props.route} />
            <Deck
                items={state.cardItems}
                dispatch={dispatch}
            />
            <QueueActions
                head={getHead(state.cardItems, state.head)}
                dispatch={dispatch} />
        </SafeAreaView>
);
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: BingeMatch.bg
    },
});


export default Queue;

