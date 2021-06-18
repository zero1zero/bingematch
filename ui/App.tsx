import React, {useEffect, useState} from 'react';
import Queue from "./swipe/queue/Queue";
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
import Splash from "./swipe/Splash";
import {BingeMatch} from "./swipe/theme";
import Dependencies from "./swipe/Dependencies";
import {AuthContext, AuthState} from "./swipe/api/Auth";
import {Profile} from "./swipe/user/Profile";
import {SignUp} from "./swipe/onboard/SignUp";
import {Login} from "./swipe/onboard/Login";
import {ForgotPassword} from "./swipe/onboard/ForgotPassword";
import {Detail} from "./swipe/detail/Detail";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {RootSiblingParent} from 'react-native-root-siblings';
import {CustomDrawerContent} from "./swipe/drawer/CustomDrawerContent";
import {Likes} from "./swipe/likes/Likes";
import {LikeAction} from "./swipe/likes/LikeAction";

export type RootStackParamList = {
    Splash: undefined
    Login: undefined
    SignUp: undefined
    ForgotPassword: undefined

    Home: undefined
    Queue: undefined
    Detail: {
        id: string //show id
    }

    Likes: undefined
    LikeAction: {
        id: string //show id
    }

    Profile: undefined
};

export default function App() {
    //for expo setup https://reactnavigation.org/docs/react-native-screens
    enableScreens();

    const deps = Dependencies.instance

    const window = useWindowDimensions()

    const [state, setState] = useState<AuthState>(AuthState.Loading)
    const authContext = React.useMemo(
        () => ({
            login: () => {
                setState(AuthState.Authenticated)
            },
            signOut: () => {
                setState(AuthState.Unauthenticated)
            },
        }),
        []
    );

    useEffect(() => {
        deps.storage.isLoggedIn()
            .then(authd => {
                setState(authd ? AuthState.Authenticated : AuthState.Unauthenticated)
            })
    }, [])

    if (state == AuthState.Loading) {
        return <Splash/>
    }

    const Stack = createStackNavigator<RootStackParamList>();
    const Drawer = createDrawerNavigator<RootStackParamList>();

    const cardInterpolator = ({ current: { progress } }) => ({
        cardStyle: {
            transform: [{
                translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [window.height, 0]
                }),
            }],
        },
        overlayStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
            }),
        },
    })

    const homeNav = () => (
        <Stack.Navigator initialRouteName='Home' mode={'modal'}>
            <Stack.Screen name='Home' component={home} options={{headerShown: false}}/>

            <Stack.Screen name='Detail' component={Detail} options={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'transparent',
                },
                cardOverlayEnabled: true,
                cardStyleInterpolator: cardInterpolator,
                gestureResponseDistance: {vertical: 1000},
            }}/>

            <Stack.Screen name='LikeAction' component={LikeAction} options={{
                headerShown: false,
                cardOverlayEnabled: true,
                cardStyle: {
                    backgroundColor: 'transparent',
                },
                cardStyleInterpolator: cardInterpolator,
                gestureResponseDistance: {vertical: 1000},
            }} />

        </Stack.Navigator>
    )

    const home = () => (
        <Stack.Navigator initialRouteName='Queue'>
            <Stack.Screen name='Queue' component={drawer}/>

            <Stack.Screen name='Profile' component={Profile}/>
        </Stack.Navigator>
    )

    const drawer = () => (
        <Drawer.Navigator
            drawerType={'slide'}
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerStyle={{width: '48%'}}>
            <Stack.Screen name='Queue' component={Queue}/>
            <Stack.Screen name='Likes' component={Likes}/>
        </Drawer.Navigator>
    )

    const onboardNav = () => (
        <Stack.Navigator initialRouteName={'SignUp'} mode={'modal'}>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='Login' component={Login} options={{
                animationTypeForReplace: 'push',
                cardStyle: {
                    backgroundColor: 'transparent',
                },
                cardOverlayEnabled: true,
                cardOverlay: props => <View style={styles.overlay} />,
                gestureResponseDistance: {vertical: 1000},
            }}/>
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{
                animationTypeForReplace: 'push'
            }}/>
        </Stack.Navigator>
    )

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={BingeMatch.navigation}>
                <RootSiblingParent>
                    {state != AuthState.Authenticated ? onboardNav() : homeNav()}
                </RootSiblingParent>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        backgroundColor: 'black',
        opacity: .5
    },
})
