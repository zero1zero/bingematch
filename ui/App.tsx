import React, {useEffect, useState} from 'react';
import Queue from "./swipe/queue/Queue";
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from "./swipe/onboard/Login";
import SignUp from "./swipe/onboard/SignUp";
import ForgotPassword from "./swipe/onboard/ForgotPassword";
import Splash from "./swipe/Splash";
import {BingeMatch} from "./swipe/theme";
import Dependencies from "./swipe/Dependencies";
import Profile from "./swipe/user/Profile";
import {AuthContext, AuthState} from "./swipe/api/Auth";

export type RootStackParamList = {
    Splash: undefined
    Login: undefined
    SignUp: undefined
    ForgotPassword: undefined

    Queue: undefined
    Profile: undefined
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

    const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={BingeMatch.navigation}>
                <Navigator initialRouteName='Queue'>

                    {state == AuthState.Authenticated ?
                        <>
                            <Screen name='Queue' component={Queue} />
                            <Screen name='Profile' component={Profile}/>
                        </>
                        :
                        <>
                            <Screen name='SignUp' component={SignUp}/>
                            <Screen name='Login' component={Login} options={{
                                animationTypeForReplace: 'push'
                            }} />
                            <Screen name='ForgotPassword' component={ForgotPassword}/>
                        </>
                    }

                </Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
