import React from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import Splash from "./swipe/Splash";
import {BingeMatch} from "./swipe/theme";
import {LogBox} from "react-native";
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from "react-redux";
import {store} from "./swipe/redux/store";

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
