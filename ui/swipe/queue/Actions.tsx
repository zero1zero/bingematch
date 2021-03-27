import {InteractionName, Item, StateChange} from "./QueueEvents";
import React, {useRef} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";
import {BingeMatch} from "../theme";
import {BackIcon, HeartIcon, XIcon} from "../etc/Icons";
import {Button} from "../components/Button";

interface Props {
    head: Item
    dispatch: React.Dispatch<StateChange>
}

const QueueActions : React.FC<Props> = (props) => {

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

    const press = (name : InteractionName) => {

        buttonAnimate(name)
        props.dispatch({
            interaction: {
                name: name,
                item: props.head
            }
        })
    }

    return (
        <View style={styles.actions}>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{ scale: buttonStates.get(InteractionName.ButtonDislikePress) }],
                }}>
                <Button style={styles.button}
                        // iconSource={() => <XIcon size={30}  color={BingeMatch.actions.nope}/>}
                        // labelStyle={{...styles.buttonText, color: BingeMatch.actions.nope}}
                        onPress={() => press(InteractionName.ButtonDislikePress)}>
                    <XIcon size={30} color={BingeMatch.theme.actions.nope}/>
                    <Text style={{...styles.buttonText, color: BingeMatch.theme.actions.nope}}>Nope</Text>
                </Button>
            </Animated.View>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{ scale: buttonStates.get(InteractionName.ButtonBackPress) }],
                }}>
                <Button style={styles.button}
                        onPress={() => press(InteractionName.ButtonBackPress)}>
                    <BackIcon size={30} color={BingeMatch.theme.actions.back}/>
                    <Text style={{...styles.buttonText, color: BingeMatch.theme.actions.back}}>Rewind</Text>
                </Button>
            </Animated.View>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{ scale: buttonStates.get(InteractionName.ButtonLikePress) }],
                }}>
                <Button style={styles.button}
                        onPress={() => press(InteractionName.ButtonLikePress)}>
                    <HeartIcon size={30} color={BingeMatch.theme.actions.watch}/>
                    <Text style={{...styles.buttonText, color: BingeMatch.theme.actions.watch}}>I'd Watch</Text>
                </Button>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    actions: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
    },
    buttonHolder: {
        flex: 1,
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',

        ...BingeMatch.shadow
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '800',

        ...BingeMatch.shadow
    }
});

export default QueueActions
