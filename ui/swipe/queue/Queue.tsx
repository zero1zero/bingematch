import React, {useEffect, useReducer, useRef} from 'react';

import {Animated, SafeAreaView, StyleSheet, View} from "react-native";
import {queue} from "../model/compiled";
import {Button, Icon, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {BaseProps} from "../etc/BaseProps";
import Dependencies from "../Dependencies";
import Deck from "./Deck";
import {
    countAfterHeadInclusive,
    getHead,
    getItem,
    getPrevious, next,
    nextHead,
    previousHead,
    updateInPlace
} from "./HeadUtils";
import {EventName, Item, Sentiment, StateChange} from "./Event";

interface QueueState {
    cacheItems: queue.IItem[]
    cardItems: Item[]

    head: string
}

const activeCardMax = 6
const moreActiveAt = 3

type Reducer = (state : QueueState, change : StateChange) => QueueState
const reducer = (state : QueueState, change : StateChange) : QueueState => {

    if (change.addToCache) {
        console.log("add to cache")

        state.cacheItems = state.cacheItems.concat(change.addToCache)
    }

    state = checkForCardHydrate(state)

    if (change.interaction) {
        console.log("interaction" + change.interaction.event)

        //if back, lets act on the previous item instead of current
        const item = (change.interaction.event == EventName.ButtonBackPress
            ? getPrevious(state.cardItems, change.interaction.item.data.id)
            : getItem(state.cardItems, change.interaction.item.data.id))

        switch (change.interaction.event) {
            case EventName.ButtonLikePress:
            case EventName.SwipeLike:
                item.sentiment = Sentiment.Like
                break
            case EventName.ButtonDislikePress:
            case EventName.SwipeDislike:
                item.sentiment = Sentiment.Dislike
                break
            case EventName.SwipeLove:
                item.sentiment = Sentiment.Love
                break
            case EventName.SwipeHate:
                item.sentiment = Sentiment.Hate
                break
            case EventName.ButtonBackPress:
                item.sentiment = Sentiment.Unknown
                break;
        }

        console.log("updating " + item.data.movie.title)

        //we set sentiment above, still propagate new state
        updateInPlace(state.cardItems, item)

        //if we swiped, we can do this right away
        if (change.interaction.event == EventName.SwipeLike
            || change.interaction.event == EventName.SwipeDislike
            || change.interaction.event == EventName.SwipeLove
            || change.interaction.event == EventName.SwipeHate) {

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

        state.head = previousHead(state.cardItems, state.head)
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

    if (state.cardItems) {
        console.log(state.cardItems.map(i=>
            i.data.movie.title + (i.data.id == state.head ? ' - 🎥' : '')
        ))
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
                        sentiment: Sentiment.Unknown
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

    const buttonStates : Map<EventName, Animated.Value> = new Map([
        [EventName.ButtonLikePress, useRef(new Animated.Value(1)).current],
        [EventName.ButtonDislikePress, useRef(new Animated.Value(1)).current],
        [EventName.ButtonBackPress, useRef(new Animated.Value(1)).current],
    ]);

    const buttonAnimate = (event : EventName) => {
        const animate = buttonStates.get(event)
        Animated.sequence([
            Animated.timing(animate, {
                toValue: 1.4,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.spring(animate, {
                toValue: 1,
                useNativeDriver: true,
            }),
        ]).start();
    }

    const [state, dispatch] = useReducer<Reducer>(reducer, {cardItems: [], cacheItems: [], head: undefined})

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
        // const current = getHead(state.cardItems)
        // switch (current.sentiment) {
        //     case Sentiment.Like:
        //     case Sentiment.Love:
        //         buttonAnimate(ButtonType.Like)
        //         break;
        //     case Sentiment.Dislike:
        //     case Sentiment.Hate:
        //         buttonAnimate(ButtonType.Dislike)
        //         break;
        //     case Sentiment.Report:
        //         break;
        // }
        state.cardItems.forEach(item => {
        //     switch (item.lastAction) {
        //         case EventName.SwipeLike:
        //         case EventName.SwipeLove:
        //         case EventName.ButtonLikePress: {
        //             buttonAnimate(ButtonType.Like)
        //             console.log("register like")
        //             break;
        //         }
        //         case EventName.SwipeHate:
        //         case EventName.SwipeDislike:
        //         case EventName.ButtonDislikePress: {
        //             buttonAnimate(ButtonType.Dislike)
        //             console.log("register dislike")
        //             break;
        //         }
        //         case EventName.ButtonBackPress: {
        //             buttonAnimate(ButtonType.Back)
        //             console.log("register back")
        //             break;
        //         }
        //     }
        })

    }, [state.cardItems])

    const actionButton = (event : EventName, text : string, status : string, icon : string) => {

        const iconEl = (props) => (
            <Icon {...props} name={icon} />
        )
        return <Button style={styles.button} size='giant' appearance='ghost' status={status} accessoryLeft={iconEl}
                       onPress={() => {
                           buttonAnimate(event)
                           dispatch({
                               interaction: {
                                   event,
                                   item: getHead(state.cardItems, state.head)
                               }
                           })
                       }}>{text}</Button>
    }

    const profileAction = () => (
        <TopNavigationAction icon={ () => (<Icon name='settings' fill='#8F9BB3' style={styles.settingsIcon} />) }
            onPress={ () => props.navigation.navigate('Login') }
        />
    )

    const addAction = () => (
        <TopNavigationAction icon={ () => (<Icon name='person-add' fill='#8F9BB3' style={styles.settingsIcon} />) }
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
                head={state.head}
            />
            <View style={styles.actions}>
                <Animated.View
                    style={{
                        flex: 1,
                        transform: [{ scale: buttonStates.get(EventName.ButtonDislikePress) }],
                    }}>
                    {actionButton(EventName.ButtonDislikePress, 'Nope', 'danger', 'close-square')}
                </Animated.View>
                <Animated.View
                    style={{
                        flex: 1,
                        transform: [{ scale: buttonStates.get(EventName.ButtonBackPress) }],
                    }}>
                    {actionButton(EventName.ButtonBackPress, 'Rewind', 'warning', 'undo')}
                </Animated.View>
                <Animated.View
                        style={{
                            flex: 1,
                            transform: [{ scale: buttonStates.get(EventName.ButtonLikePress) }],
                        }}>
                    {actionButton(EventName.ButtonLikePress, 'I\'d Watch' , 'success', 'heart')}
                </Animated.View>
            </View>
        </SafeAreaView>
);
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#f5f3f4'
    },

    top: {
        backgroundColor: '#f5f3f4',
        paddingVertical: 0,
        marginBottom: 9,
        minHeight: 35,
    },
    topTitle: {
        fontSize: 25
    },

    settingsIcon: {
        alignSelf: 'flex-end',
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

