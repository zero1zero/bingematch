import {interaction, InteractionName} from "./reducer";
import React, {useRef} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";
import {BingeMatch} from "../theme";
import {BackIcon, EyeIcon, PlusIcon, XIcon} from "../components/Icons";
import {Button} from "../components/Button";
import {useNavigation} from "@react-navigation/native";
import {Item} from "./QueueEvents";
import {useAppDispatch} from "../redux/hooks";

interface Props {
    head: Item
}

const QueueActions: React.FC<Props> = (props) => {

    const dispatch = useAppDispatch()
    const navigation = useNavigation()

    const buttonStates: Map<InteractionName, Animated.Value> = new Map([
        [InteractionName.ButtonLikePress, useRef(new Animated.Value(1)).current],
        [InteractionName.ButtonDislikePress, useRef(new Animated.Value(1)).current],
        [InteractionName.ButtonBackPress, useRef(new Animated.Value(1)).current],
        [InteractionName.ButtonSeenItPress, useRef(new Animated.Value(1)).current],
    ]);

    const buttonAnimate = (event: InteractionName) => {
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

    const press = (name: InteractionName) => {

        buttonAnimate(name)
        dispatch(interaction( {
            name: name,
            item: props.head
        }))
    }

    return (
            <View style={styles.actions}>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{scale: buttonStates.get(InteractionName.ButtonDislikePress)}],
                }}>
                <Button style={styles.button}
                        onPress={() => press(InteractionName.ButtonDislikePress)}>
                    <XIcon size={30} style={BingeMatch.theme.actions.nopeIcon}/>
                    <Text style={{...BingeMatch.theme.actions.nope}}>Nope</Text>
                </Button>
            </Animated.View>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{scale: buttonStates.get(InteractionName.ButtonBackPress)}],
                }}>
                <Button style={styles.button}
                        onPress={() => press(InteractionName.ButtonBackPress)}>
                    <BackIcon size={28} style={BingeMatch.theme.actions.backIcon}/>
                    <Text style={{...BingeMatch.theme.actions.back}}>Back</Text>
                </Button>
            </Animated.View>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{scale: buttonStates.get(InteractionName.ButtonSeenItPress)}],
                }}>
                <Button style={styles.button}
                        onPress={() => {
                            navigation.navigate('SeenIt', {
                                show: props.head.show.id
                            })
                        }}>
                    <EyeIcon size={28} style={BingeMatch.theme.actions.seenItIcon}/>
                    <Text style={{...BingeMatch.theme.actions.seenIt}}>Seen It</Text>
                </Button>
            </Animated.View>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{scale: buttonStates.get(InteractionName.ButtonLikePress)}],
                }}>
                <Button style={styles.button}
                        onPress={() => press(InteractionName.ButtonLikePress)}>
                    <PlusIcon size={30} style={BingeMatch.theme.actions.watchIcon}/>
                    <Text style={{...BingeMatch.theme.actions.watch}}>Watch</Text>
                </Button>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        height: 63,
        marginTop: 8,
    },
    buttonHolder: {
        flex: 1,
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default QueueActions
