import React from "react";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {DrawerContentComponentProps} from "@react-navigation/drawer/src/types";
import {StyleSheet} from "react-native";
import {BingeMatch} from "../theme";
import {FlagIcon, HeartIcon, MovieIcon} from "../components/Icons";

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {

    // const translateX = Animated.interpolate(props.progress[" __value"],
    //     [0, 1],
    //     [-100, 0],
    // );
    const route = () => props.state.routes[props.state.index].name

    return (
        <DrawerContentScrollView {...props}
                                 style={styles.drawer}
                                 contentContainerStyle={{paddingTop: 15}}>
            {/*<Animated.View style={{ transform: [{ translateX }] }}>*/}
            {/*    <DrawerItemList {...props}*/}
            {/*                    labelStyle={styles.label}*/}
            {/*                    itemStyle={styles.item}*/}
            {/*                    activeBackgroundColor={'#5C5C5FB0'}*/}
            {/*     />*/}
            <DrawerItem
                label="Queue"
                icon={({focused}) => {
                    return <MovieIcon color={focused ? BingeMatch.colors.success: BingeMatch.colors.grey} style={styles.icon} />
                }}
                activeTintColor={BingeMatch.colors.grey}
                focused={route() == 'Queue'}
                style={styles.item}
                labelStyle={styles.label}
                onPress={() => props.navigation.navigate('Queue')} />
            <DrawerItem
                label="Likes"
                icon={({focused}) => {
                        return <HeartIcon color={focused ? BingeMatch.colors.success: BingeMatch.colors.grey} style={styles.icon} />
                }}
                focused={route() == 'Likes'}
                activeTintColor={BingeMatch.colors.grey}
                style={styles.item}
                labelStyle={styles.label}
                onPress={() => props.navigation.navigate('Likes')} />

            <DrawerItem
                    label="About"
                    icon={({focused}) => {
                        return <FlagIcon color={focused ? BingeMatch.colors.success: BingeMatch.colors.grey} style={styles.icon} />
                    }}
                    focused={route() == 'About'} //todo nothing here yet
                    activeTintColor={BingeMatch.colors.grey}
                    style={styles.item}
                    labelStyle={styles.label}
                    onPress={() => alert('Link to help')} />
            {/*</Animated.View>*/}
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({

    drawer: {
        flex: 1,
        backgroundColor: BingeMatch.colors.bg,
        paddingTop: 0
    },

    item: {
    },

    label: {
        ...BingeMatch.theme.drawer.text
    },

    icon: {
        color: BingeMatch.colors.grey,
    }
})