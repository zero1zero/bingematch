import {Text, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import {SafeAreaView, StyleSheet, View} from "react-native";
import React from "react";
import {PersonAdd, SettingsIcon} from "../etc/Icons";
import {BaseProps} from "../etc/BaseProps";
import {BingeMatch} from "../theme";


const QueueHeader : React.FC<BaseProps> = (props) => {
    const profileAction = () => (
        <TopNavigationAction icon={() => <SettingsIcon {...styles.settingsIcon} />}
                             onPress={ () => props.navigation.navigate('Login') }
        />
    )

    const addAction = () => (
        <TopNavigationAction icon={() => <PersonAdd {...styles.addIcon} />}
                             onPress={ () => props.navigation.navigate('Login') }
        />
    )

    return (
        <View style={styles.top}>
            <TopNavigation
                style={styles.topNavigation}
                title={evaProps => {
                    return (
                        <Text {...evaProps} style={styles.topTitle}>BingeMatch</Text>
                    )
                }}
                alignment='center'
                accessoryRight={profileAction}
                accessoryLeft={addAction}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        flex: 2,
        backgroundColor: BingeMatch.bg,
    },
    topNavigation: {
        flex: 1,
        backgroundColor: BingeMatch.bg,
        minHeight: 0
    },
    topTitle: {
        color: 'white',
        fontSize: 25
    },

    settingsIcon: {
        alignSelf: 'flex-end',
        backgroundColor: '#FFF',
        width: 35,
        height: 35,
    },

    addIcon: {
        alignSelf: 'flex-start',
        width: 35,
        height: 35,
    },
})

export default QueueHeader
