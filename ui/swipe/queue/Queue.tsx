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
import {PersonAdd, SettingsIcon} from "../etc/Icons";

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
        console.log("add to cache")

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

        console.log("new head: " + next(state.cardItems, state.head).data.movie.title)

        state.head = nextHead(state.cardItems, state.head)
    }

    //on back, we move the pointer back and set the sentiment to undefined
    if (change.regressHead) {
        //short circuit if we are trying to regress to anything other than one above current
        if (previousHead(state.cardItems, state.head) != change.regressHead) {
            return state
        }

        console.log("regressing head")

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
        console.log('====== Queue =======')
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
            console.log(msg)
        })
        console.log('====== /Queue =======')
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

    const buttonStates : Map<InteractionName, Animated.Value> = new Map([
        [InteractionName.ButtonLikePress, useRef(new Animated.Value(1)).current],
        [InteractionName.ButtonDislikePress, useRef(new Animated.Value(1)).current],
        [InteractionName.ButtonBackPress, useRef(new Animated.Value(1)).current],
    ]);

    const buttonAnimate = (event : InteractionName) => {
        const animate = buttonStates.get(event)
        Animated.sequence([
            Animated.timing(animate, {
                toValue: 1.4,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.spring(animate, {
                toValue: 1,
                useNativeDriver: true,
            }),
        ]).start();
    }

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

        return api.cleanup
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

    const actionButton = (name : InteractionName, text : string, status : string, icon : string) => {

        const iconEl = (props) => (
            <Icon {...props} name={icon} />
        )
        return <Button style={styles.button} size='giant' appearance='ghost' status={status} accessoryLeft={iconEl}
                       onPress={() => {
                           buttonAnimate(name)
                           dispatch({
                               interaction: {
                                   name: name,
                                   item: getHead(state.cardItems, state.head)
                               }
                           })
                       }}>{text}</Button>
    }

    const profileAction = () => (
        <TopNavigationAction icon={() => <SettingsIcon {...styles.settingsIcon} />}
            onPress={ () => props.navigation.navigate('Login') }
        />
    )

    const addAction = () => (
        <TopNavigationAction icon={() => <PersonAdd {...styles.addIcon} />}
                             onPress={ () => props.navigation.navigate('Login') }
        />
    )

    return (
        <SafeAreaView style={styles.home}>
            <TopNavigation style={styles.top}
                           title={evaProps => <Text {...evaProps} style={styles.topTitle}>BingeMatch</Text>}
                           alignment='center'
                           accessoryRight={profileAction}
                           accessoryLeft={addAction}
            />
            <Deck
                items={state.cardItems}
                dispatch={dispatch}
            />
            <View style={styles.actions}>
                <Animated.View
                    style={{
                        flex: 1,
                        transform: [{ scale: buttonStates.get(InteractionName.ButtonDislikePress) }],
                    }}>
                    {actionButton(InteractionName.ButtonDislikePress, 'Nope', 'danger', 'close-square')}
                </Animated.View>
                <Animated.View
                    style={{
                        flex: 1,
                        transform: [{ scale: buttonStates.get(InteractionName.ButtonBackPress) }],
                    }}>
                    {actionButton(InteractionName.ButtonBackPress, 'Rewind', 'warning', 'undo')}
                </Animated.View>
                <Animated.View
                        style={{
                            flex: 1,
                            transform: [{ scale: buttonStates.get(InteractionName.ButtonLikePress) }],
                        }}>
                    {actionButton(InteractionName.ButtonLikePress, 'I\'d Watch' , 'success', 'heart')}
                </Animated.View>
            </View>
        </SafeAreaView>
);
}

//https://coolors.co/353535-3c6e71-ffffff-d9d9d9-284b63
const bg = '#284b63'

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: bg
    },

    top: {
        backgroundColor: bg,
        paddingVertical: 0,
        marginBottom: 9,
        minHeight: 35,
    },
    topTitle: {
        color: 'white',
        fontSize: 25
    },

    settingsIcon: {
        alignSelf: 'flex-end',
        backgroundColor: '#FFF',
        width: 35,
        height: 35,
    },

    addIcon: {
        alignSelf: 'flex-start',
        width: 35,
        height: 35,
    },
    actions: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center"
    },
    button: {
        flex: 1,
        flexDirection: "column",
    },
});


export default Queue;

