import React, {useEffect, useRef} from 'react';
import Queue from "./swipe/queue/Queue";
import * as eva from '@eva-design/eva';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {createStackNavigator} from '@react-navigation/stack';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Login from "./swipe/onboard/Login";
import SignUp from "./swipe/onboard/SignUp";
import ForgotPassword from "./swipe/onboard/ForgotPassword";
import Splash from "./swipe/Splash";
import {BingeMatch} from "./swipe/theme";

export type RootStackParamList = {
    Splash: undefined
    Login: undefined
    SignUp: undefined
    ForgotPassword: undefined

    Queue: undefined
    Profile: undefined
};

export default function App() {

    const navRef = useRef()

    //for expo setup https://reactnavigation.org/docs/react-native-screens
    enableScreens();

    const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

    useEffect(() => {

    }, [])

    return (
        <ApplicationProvider {...eva} theme={BingeMatch.values}>
            <IconRegistry icons={EvaIconsPack} />
            <NavigationContainer ref={navRef}>
                <Navigator headerMode='none'
                           initialRouteName='Queue'
                           mode="modal">
                    <Screen name='Splash' component={Splash} />
                    <Screen name='Login' component={Login} />
                    <Screen name='Queue' component={Queue}/>
                    <Screen name='SignUp' component={SignUp}/>
                    <Screen name='ForgotPassword' component={ForgotPassword}/>
                </Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    );
}
