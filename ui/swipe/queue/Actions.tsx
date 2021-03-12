import {InteractionName, Item, StateChange} from "./QueueEvents";
import {Button, Icon} from "@ui-kitten/components";
import {getHead} from "./QueueUtils";
import React, {useRef} from "react";
import {BaseProps} from "../etc/BaseProps";
import {Animated, SafeAreaView, StyleSheet, View} from "react-native";

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
    const actionButton = (name : InteractionName, text : string, status : string, icon : string) => {

        //todo i dont like this
        const iconEl = (props) => (
            <Icon {...props} name={icon} />
        )

        return (
            <Button style={styles.button}
                    size='giant'
                    appearance='ghost'
                    status={status}
                    accessoryLeft={iconEl}
                    onPress={() => {
                        buttonAnimate(name)
                        props.dispatch({
                            interaction: {
                                name: name,
                                item: props.head
                            }
                        })
                    }}>{text}</Button>
        )
    }

    return (
        <View style={styles.actions}>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{ scale: buttonStates.get(InteractionName.ButtonDislikePress) }],
                }}>
                {actionButton(InteractionName.ButtonDislikePress, 'Nope', 'danger', 'close-square')}
            </Animated.View>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{ scale: buttonStates.get(InteractionName.ButtonBackPress) }],
                }}>
                {actionButton(InteractionName.ButtonBackPress, 'Rewind', 'warning', 'undo')}
            </Animated.View>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{ scale: buttonStates.get(InteractionName.ButtonLikePress) }],
                }}>
                {actionButton(InteractionName.ButtonLikePress, 'I\'d Watch' , 'success', 'heart')}
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    actions: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center"
    },
    buttonHolder: {
        flex: 1,
    },
    button: {
        flex: 1,
        flexDirection: "column",
        paddingBottom: 0
    },
});

export default QueueActions
