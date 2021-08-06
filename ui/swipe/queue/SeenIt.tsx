import React, {useContext} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {BingeMatch} from "../theme";
import {Button} from "../components/Button";
import {BackIcon} from "../components/Icons";
import {Item, Sentiment, SyncStatus} from "./QueueEvents";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../etc/RootStackParamList";
import {StackNavigationProp} from "@react-navigation/stack";
import {InteractionName} from "./QueueReducer";

export const SeenIt : React.FC = (props) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SeenIt'>>()

    const close = () => {
        navigation.goBack()
    }

    const watched = () => {
        navigation.navigate('Queue', {
            advanceHead: InteractionName.ButtonLikePress, //todo pull
        })
    }

    return (
        <View style={styles.container}>
            <Pressable style={{flex: 5}} onPress={close}>
            </Pressable>
            <View style={styles.actions}>
                <Button style={styles.button} onPress={watched}>
                    <BackIcon size={20} style={{marginRight: 8}} />
                    <Text style={BingeMatch.theme.button.text}>
                        I Watched
                    </Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    actions: {
        flex: 1,
        backgroundColor: BingeMatch.colors.bg,
        justifyContent: 'center',
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',

        ...BingeMatch.theme.button.button
    },
})
