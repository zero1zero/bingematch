import {InteractionName, StateChange} from "./QueueReducer";
import React, {createContext, Dispatch, useRef} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";
import {BingeMatch} from "../theme";
import {BackIcon, EyeIcon, PlusIcon, XIcon} from "../components/Icons";
import {Button} from "../components/Button";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../etc/RootStackParamList";
import {DrawerNavigationProps} from "../etc/BaseNavigationProps";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {getHead} from "./QueueUtils";
import {useNavigation} from "@react-navigation/native";
import {Item, SyncStatus} from "./QueueEvents";

interface Props {
    head: Item
    dispatch: React.Dispatch<StateChange>
}

const QueueActions: React.FC<Props> = (props) => {

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
                    transform: [{scale: buttonStates.get(InteractionName.ButtonDislikePress)}],
                }}>
                <Button style={styles.button}
                        onPress={() => press(InteractionName.ButtonDislikePress)}>
                    <XIcon size={30} style={BingeMatch.theme.actions.nopeIcon}/>
                    <Text style={{...styles.buttonText, ...BingeMatch.theme.actions.nope}}>Nope</Text>
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
                    <Text style={{...styles.buttonText, ...BingeMatch.theme.actions.back}}>Back</Text>
                </Button>
            </Animated.View>
            <Animated.View
                style={{
                    ...styles.buttonHolder,
                    transform: [{scale: buttonStates.get(InteractionName.ButtonSeenItPress)}],
                }}>
                <Button style={styles.button}
                        onPress={() => {
                            navigation.navigate('SeenIt')
                            // press(InteractionName.ButtonSeenItPress)
                        }}>
                    <EyeIcon size={28} style={BingeMatch.theme.actions.backIcon}/>
                    <Text style={{...styles.buttonText, ...BingeMatch.theme.actions.back}}>Seen It</Text>
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
                    <Text style={{...styles.buttonText, ...BingeMatch.theme.actions.watch}}>Watch</Text>
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
    buttonText: {}
});

export default QueueActions
