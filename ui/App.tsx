import React, {createContext, useEffect, useMemo, useReducer, useState} from 'react';
import Queue from "./swipe/queue/Queue";
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Splash from "./swipe/Splash";
import {BingeMatch} from "./swipe/theme";
import Dependencies from "./swipe/Dependencies";
import {Profile} from "./swipe/user/Profile";
import {SignUp} from "./swipe/onboard/SignUp";
import {Login} from "./swipe/onboard/Login";
import {ForgotPassword} from "./swipe/onboard/ForgotPassword";
import {Detail} from "./swipe/detail/Detail";
import {LogBox, useWindowDimensions} from "react-native";
import {RootSiblingParent} from 'react-native-root-siblings';
import {CustomDrawerContent} from "./swipe/drawer/CustomDrawerContent";
import {Likes} from "./swipe/likes/Likes";
import {ListAction} from "./swipe/likes/ListAction";
import {RootStackParamList} from "./swipe/etc/RootStackParamList";
import {AddGenres} from "./swipe/genres/AddGenres";
import {SeenIt} from "./swipe/queue/SeenIt";
import {Provider} from "react-redux";
import {store} from "./swipe/redux/store";
import {useAppDispatch, useAppSelector} from "./swipe/redux/hooks";
import {AuthStatus, login, logout} from "./swipe/auth/auth";

//can remove with upgrade of react-native-draggable-flatlist above ^2.6.2
LogBox.ignoreLogs([
    'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
]);

export default function App() {
    //for expo setup https://reactnavigation.org/docs/react-native-screens
    enableScreens();

    return (
        <Provider store={store}>
            <NavigationContainer theme={BingeMatch.navigation}>
                <RootSiblingParent>
                    <Splash />
                </RootSiblingParent>
            </NavigationContainer>
        </Provider>
    );
}
