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
import {StyleSheet, View} from "react-native";
import {RootSiblingParent} from 'react-native-root-siblings';

export type RootStackParamList = {
    Splash: undefined
    Login: undefined
    SignUp: undefined
    ForgotPassword: undefined

    Queue: undefined
    QueueNav: undefined
    Detail: {
        id: string //show id
    }
    Profile: undefined
    Drawer: undefined
};

export default function App() {
    //for expo setup https://reactnavigation.org/docs/react-native-screens
    enableScreens();

    const deps = Dependencies.instance

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

    const homeNav = () => (
        <Stack.Navigator initialRouteName='QueueNav' mode={'modal'}>
            <Stack.Screen name='QueueNav' component={queueNav} options={{headerShown: false}}/>

            <Stack.Screen name='Detail' component={Detail} options={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'transparent',
                },
                cardOverlayEnabled: true,
                cardOverlay: props => <View style={styles.overlay} />,
                /**
                 * Distance from top to register swipe to dismiss modal gesture. Default (135)
                 * https://reactnavigation.org/docs/en/stack-navigator.html#gestureresponsedistance
                 */
                gestureResponseDistance: {vertical: 1000},
            }}/>

        </Stack.Navigator>
    )

    const queueNav = () => (
        <Stack.Navigator initialRouteName='Queue'>
            <Stack.Screen name='Queue' component={drawer}/>

            <Stack.Screen name='Profile' component={Profile}/>
        </Stack.Navigator>
    )

    const drawer = () => (
        <Drawer.Navigator>
            <Stack.Screen name='Queue' component={Queue}/>
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
    }
})
