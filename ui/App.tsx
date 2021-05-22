import React, {useEffect, useState} from 'react';
import Queue from "./swipe/queue/Queue";
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Splash from "./swipe/Splash";
import {BingeMatch} from "./swipe/theme";
import Dependencies from "./swipe/Dependencies";
import {AuthContext, AuthState} from "./swipe/api/Auth";
import {Profile} from "./swipe/user/Profile";
import {SignUp} from "./swipe/onboard/SignUp";
import {Login} from "./swipe/onboard/Login";
import {ForgotPassword} from "./swipe/onboard/ForgotPassword";
import {Detail} from "./swipe/detail/Detail";
import {Pressable, StyleSheet, TouchableOpacity, View} from "react-native";

export type RootStackParamList = {
    Splash: undefined
    Login: undefined
    SignUp: undefined
    ForgotPassword: undefined

    Queue: undefined
    Detail: {
        id: string //show id
    }
    Profile: undefined
    Burger: undefined
};

export default function App() {
    //for expo setup https://reactnavigation.org/docs/react-native-screens
    enableScreens();

    const deps = Dependencies.instance

    const [state, setState] = useState<AuthState>( AuthState.Loading )
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
        return <Splash />
    }

    const Stack  = createStackNavigator<RootStackParamList>();
    const Drawer = createDrawerNavigator<RootStackParamList>();

    const closeDetail = () => {
        console.log('lakdjs')
    }

    const homeNav = () => (
        <Stack.Navigator initialRouteName='Queue' mode={'modal'}>
            <Stack.Screen name='Queue' component={queueNav} options={{headerShown: false}} />

            <Stack.Screen name='Detail' component={Detail} options={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'transparent',
                },
                cardOverlayEnabled: true,
                cardOverlay: props => <Pressable style={styles.overlay} onPress={closeDetail} />,
                /**
                 * Distance from top to register swipe to dismiss modal gesture. Default (135)
                 * https://reactnavigation.org/docs/en/stack-navigator.html#gestureresponsedistance
                 */
                gestureResponseDistance: { vertical: 1000 },
            }} />
            <Stack.Screen name='Burger' component={burgerNav} />
        </Stack.Navigator>
    )

    const queueNav = () => (
        <Stack.Navigator initialRouteName='Queue' mode={'card'}>
            <Stack.Screen name='Queue' component={Queue} />
            <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
    )

    //todo not sure how this will work
    const burgerNav = () => (
        <Drawer.Navigator>
            <Stack.Screen name='Profile' component={Profile} />
        </Drawer.Navigator>
    )

    const onboardNav = () => (
        <Stack.Navigator initialRouteName={'SignUp'} mode={'modal'}>
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='Login' component={Login} options={{
                animationTypeForReplace: 'push'
            }} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </Stack.Navigator>
    )

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={BingeMatch.navigation}>
                {state != AuthState.Authenticated ? onboardNav() : homeNav()}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        backgroundColor: 'black',
        opacity: .5
    }
})
