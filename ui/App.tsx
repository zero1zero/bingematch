import React from 'react';
import Deck from "./swipe/deck/Deck";
import * as eva from '@eva-design/eva';
import { enableScreens } from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {createStackNavigator} from '@react-navigation/stack';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Login from "./swipe/onboard/Login";
import SignUp from "./swipe/onboard/SignUp";
import ForgotPassword from "./swipe/onboard/ForgotPassword";
import Splash from "./swipe/Splash";

export type RootStackParamList = {
    Splash: undefined
    Login: undefined
    SignUp: undefined
    ForgotPassword: undefined

    Deck: undefined
    Profile: undefined
};

export default function App() {

    const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

    //for expo setup https://reactnavigation.org/docs/react-native-screens
    enableScreens();

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <IconRegistry icons={EvaIconsPack} />
            <NavigationContainer>
                <Navigator headerMode='none'
                           initialRouteName='Splash'
                           mode="modal">
                    <Screen name='Splash' component={Splash} />
                    <Screen name='Login' component={Login} />
                    <Screen name='Deck' component={Deck}/>
                    <Screen name='SignUp' component={SignUp}/>
                    <Screen name='ForgotPassword' component={ForgotPassword}/>
                </Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    );
}
