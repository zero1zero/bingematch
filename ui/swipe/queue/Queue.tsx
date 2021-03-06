import React, {useEffect, useReducer, useRef} from 'react';

import {Animated, SafeAreaView, StyleSheet, View} from "react-native";
import {queue} from "../model/compiled";
import {Button, Icon, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {BaseProps} from "../etc/BaseProps";
import Dependencies from "../Dependencies";
import {Action, SwipeAction} from "./Card";
import Deck from "./Deck";

interface StateAction {
    swipe?: SwipeAction

    addToCache?: queue.IItem[]
    addToCardItems?: queue.IItem[]

    checkForCardHydrate?: boolean
}

interface QueueState {
    cacheItems: queue.IItem[]
    cardItems: queue.IItem[]

    swipes: SwipeAction[]
}

const activeCardMax = 6
const moreActiveAt = 3

const reducer = (state : QueueState, action : StateAction) : QueueState => {

    if (action.swipe) {

        //skip taking action on this swipe until its offscreen
        if (action.swipe.where == 'onscreen') {
            return {
                ...state,
                swipes: state.swipes.concat(action.swipe),
            }
        }
        //todo remove any old onscreens because if we're here we cant have any that havent been processed
        // const dedupedSwipes = state.swipes.

        const poppedCardItems = state.cardItems.slice(0, -1)

        return checkForCardHydrate({
            ...state,
            swipes: state.swipes.concat(action.swipe),
            cardItems: poppedCardItems
        })
    }

    if (action.addToCache) {
        return {
            ...state,
            cacheItems: state.cacheItems.concat(action.addToCache)
        }
    }

    if (action.checkForCardHydrate) {
        return checkForCardHydrate(state)
    }
}

const checkForCardHydrate = (state : QueueState) : QueueState => {
    //if less cards than we want, load more cards
    if (state.cardItems.length <= moreActiveAt) {

        const cardsToPullFromCache = activeCardMax - state.cardItems.length

        const remainingCache = state.cacheItems.slice(cardsToPullFromCache)
        const forCards = state.cacheItems.slice(0, cardsToPullFromCache)

        const loaded = forCards
            .reverse()
            .concat(state.cardItems.slice(0, moreActiveAt))

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

    const actionAnimationState : Map<Action, Animated.Value> = new Map([
        [Action.Dislike, useRef(new Animated.Value(1)).current],
        [Action.Back, useRef(new Animated.Value(1)).current],
        [Action.Like, useRef(new Animated.Value(1)).current],
    ]);

    const actionAnimate = (action : Action) => {
        const animate = actionAnimationState.get(action)
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

    const [state, dispatch] = useReducer(reducer, {
        cardItems: [], cacheItems: [], swipes: []})

    useEffect(() => {
        if (state.cacheItems.length < activeCardMax) {
            console.log('loading more cache...')
            api.popular()
                .then(moreActive => {
                    dispatch({ addToCache: moreActive.items})
                    dispatch({ checkForCardHydrate: true})
                })
        }
    }, [state.cacheItems])

    useEffect(() => {
        const lastSwipe = state.swipes[state.swipes.length - 1]
        if (lastSwipe && lastSwipe.where == 'offscreen') {
            actionAnimate(lastSwipe.action)
        }
    }, [state.swipes])

    const actionButton = (action : Action, text : string, status : string, icon : string) => {

        const iconEl = (props) => (
            <Icon {...props} name={icon} />
        )
        return <Button style={styles.button} size='giant' appearance='ghost' status={status} accessoryLeft={iconEl}
                       onPress={() => {
                           dispatch({
                               swipe : {
                                   action, item: state.cardItems[state.cardItems.length - 1], where: 'onscreen'
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
                swipes={state.swipes}
                swipe={(action) => dispatch({ swipe: action })}
            />
            <View style={styles.actions}>
                <Animated.View
                    style={{
                        flex: 1,
                        transform: [{ scale: actionAnimationState.get(Action.Dislike) }],
                    }}>
                    {actionButton(Action.Dislike, 'Nope', 'danger', 'close-square')}
                </Animated.View>
                <Animated.View
                    style={{
                        flex: 1,
                        transform: [{ scale: actionAnimationState.get(Action.Back) }],
                    }}>
                    {actionButton(Action.Back, 'Back', 'warning', 'undo')}
                </Animated.View>
                <Animated.View
                        style={{
                            flex: 1,
                            transform: [{ scale: actionAnimationState.get(Action.Like) }],
                        }}>
                    {actionButton(Action.Like, 'I\'d Watch' , 'success', 'heart')}
                </Animated.View>
            </View>
        </SafeAreaView>
);
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        width: '100%',
        height: '100%',
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

