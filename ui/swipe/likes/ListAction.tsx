import React from "react";
import {BaseNavigationProps} from "../etc/BaseNavigationProps";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {BingeMatch} from "../theme";
import {Button} from "../components/Button";
import {BackIcon} from "../components/Icons";

//todo remove me?
export const ListAction: React.FC<BaseNavigationProps<'ListAction'>> = (props) => {

    const close = () => {
        props.navigation.goBack()
    }

    const watched = () => {
        props.navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Pressable style={{flex: 5}} onPress={close}>
            </Pressable>
            <View style={styles.actions}>
                    <Button style={styles.button} onPress={watched}>
                    <BackIcon size={20} style={{marginRight: 8}}/>
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
