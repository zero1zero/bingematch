import React, {useEffect, useRef, useState} from 'react';

import {Animated, ImageBackground, SafeAreaView, StyleSheet, useWindowDimensions, View} from "react-native";
import Cards from "./Cards";
import {queue} from "../model/compiled";
import {Button, Icon, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {BaseProps} from "../etc/BaseProps";
import Dependencies from "../Dependencies";

enum Action{
    Like, Dislike, Love, Hate, Back
}

const Deck : React.FC<BaseProps> = (props) => {

    const api = Dependencies.instance.api

    const [activeQueue, setActiveQueue] = useState(new queue.AllItems())
    const [empty, setEmpty] = useState(true)

    useEffect(() => {
        api.popular().then(items => {
            setActiveQueue(items)
        })

        return () => api.cleanup()
    }, [empty]);

    const window = useWindowDimensions();
    const cardHeight = window.height * .78
    const cardWidth = window.width * .96

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

    const actionButton = (action : Action, text : string, status : string, icon : string) => {

        const iconEl = (props) => (
            <Icon {...props} name={icon} />
        )
        return <Button style={styles.button} size='giant' appearance='ghost' status={status} accessoryLeft={iconEl}
                onPress={() => {actionPress(action)}}>{text}</Button>
    }

    const profileAction = () => (
        <TopNavigationAction icon={ () => (<Icon name='person' fill='#8F9BB3' style={styles.settingsIcon} />) }
            onPress={ () => props.navigation.navigate('Login') }
        />
    )

    return (
        <SafeAreaView style={styles.home}>
            <TopNavigation style={styles.top}
                title='BingeMatch'
                accessoryRight={profileAction}
            />
            <View style={styles.deck}>
                <Cards
                    items={activeQueue.items}
                    showableCards={20}
                    onMoveStart={() => {}}
                    onSwipeUp={(item : queue.IItem, index) => swipe(Action.Love, item, index)}
                    onSwipeDown={(item : queue.IItem, index) => swipe(Action.Hate, item, index)}
                    onSwipeRight={(item : queue.IItem, index) => swipe(Action.Like, item, index)}
                    onSwipeLeft={(item : queue.IItem, index) => swipe(Action.Dislike, item, index)}
                    onSwipe={() => {}}
                    onDataEnd={() => {
                        setEmpty(true)
                    }}
                    renderItem={(item : queue.IItem, index : number) => (
                        <View style={{...cardStyles.card, width: cardWidth, height: cardHeight}}>
                            <ImageBackground style={cardStyles.image} source={{uri: `https://image.tmdb.org/t/p/w500${item.movie.posterPath}`}}/>
                            <View style={cardStyles.details}>
                                {/*<Text category='h1'>{item.movie.title}</Text>*/}
                                <Text style={cardStyles.detailsText} numberOfLines={4}>{item.movie.overview}</Text>
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
        minHeight: 35
    },
    settingsIcon: {
        alignSelf: 'flex-end',
        width: 35,
        height: 35,
    },
    deck: {
        flex: 10,
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

const cardStyles = StyleSheet.create({
    card: {
        position: "absolute",
        alignSelf: "center",
        zIndex: -1,
        borderRadius: 5,
        backgroundColor: "#FFF",

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
})

export default Deck;

