import React, {Component, MutableRefObject, useEffect, useRef, useState} from 'react';

import {Animated, ImageBackground, StyleSheet, TouchableHighlight, useWindowDimensions, View} from "react-native";
import Cards from "./swiper/Cards";
import Api from "./api/api";
import {queue} from "./model/compiled";
import {Button, Icon, Text} from '@ui-kitten/components';

export interface Props {
}

enum Action{
    Like, Dislike, Love, Hate, Back
}

const Deck : React.FC<Props> = (props) => {

    const [activeQueue, setActiveQueue] = useState(new queue.AllItems())

    const hydrate = () => {
        console.log("hydrating...")
        api.popular().then(items => {
            setActiveQueue(items)
        })
    }
    useEffect(() => {
        hydrate()
    }, []);

    const api = new Api()

    const window = useWindowDimensions();
    const cardHeight = window.height * .84
    const cardWidth = window.width * .92

    const actionAnimationState : Map<Action, Animated.Value> = new Map([
       [Action.Dislike, useRef(new Animated.Value(1)).current],
        [Action.Back, useRef(new Animated.Value(1)).current],
        [Action.Like, useRef(new Animated.Value(1)).current],
    ]);

    const swipe = (action : Action, item : queue.IItem, index : number) => {
        console.log(action + " - " + item.movie.posterPath)

        actionPress(action)
    }

    const actionPress = (action : Action) => {
        const animate = actionAnimationState.get(action)
        if (animate) {
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
    }

    const actionButton = (action : Action, text : string, status : string, icon : string) => {

        const iconEl = (props) => (
            <Icon {...props} name={icon} />
        )
        return <Button style={styles.button} size='giant' appearance='ghost' status={status} accessoryLeft={iconEl}
                onPress={() => {actionPress(action)}}>{text}</Button>
    }

    return (
        <View style={styles.home}>
            <View style={styles.deck}>
                <Cards
                    items={activeQueue.items}
                    showableCards={5}
                    onMoveStart={() => {}}
                    onSwipeUp={(item : queue.IItem, index) => swipe(Action.Love, item, index)}
                    onSwipeDown={(item : queue.IItem, index) => swipe(Action.Hate, item, index)}
                    onSwipeRight={(item : queue.IItem, index) => swipe(Action.Like, item, index)}
                    onSwipeLeft={(item : queue.IItem, index) => swipe(Action.Dislike, item, index)}
                    onSwipe={() => {}}
                    onDataEnd={() => {
                        hydrate()
                        console.log("done with items")
                    }}
                    renderItem={(item : queue.IItem, index : number) => (
                        <View style={{...styles.card, width: cardWidth, height: cardHeight}}>
                            <ImageBackground style={styles.image} source={{uri: `https://image.tmdb.org/t/p/w500${item.movie.posterPath}`}}/>
                            <View style={styles.details}>
                                {/*<Text category='h1'>{item.movie.title}</Text>*/}
                                <Text style={styles.detailsText} numberOfLines={4}>{item.movie.overview}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
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
        </View>
);
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    deck: {
        flex: 10,
        flexDirection: "row",
    },

    card: {
        position: "absolute",
        zIndex: -1,
        borderRadius: 5,
        backgroundColor: "#FFF",

        left: 17,
        top: 44,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },

    image: {
        flex: 7,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: 'hidden'
    },

    details: {
        flex: 2,
        padding: 5,
    },

    detailsText: {
        fontSize: 13
    },

    detailsMore: {

    },

    actions: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 16,
    },

    button: {
        flex: 1,
        flexDirection: "column",
    },
});

export default Deck;

