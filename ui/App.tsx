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
import {InteractionName, QueueReducer, queueReducer, queueReducerDefaults} from "./swipe/queue/QueueReducer";
import {Provider} from "react-redux";
import {store} from "./swipe/redux/split";

//can remove with upgrade of react-native-draggable-flatlist above ^2.6.2
LogBox.ignoreLogs([
    'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
]);


export enum AuthState {
    Loading, Authenticated, Unauthenticated
}

export interface AuthContext {
    login: () => void
    signOut: () => void
}

export const AuthContext = createContext<AuthContext>({
    login: () => {},
    signOut: () => {}
})

export default function App() {
    //for expo setup https://reactnavigation.org/docs/react-native-screens
    enableScreens();

    const deps = Dependencies.instance

    const window = useWindowDimensions()

    const [authState, setAuthState] = useState<AuthState>(AuthState.Loading)

    const authContext : AuthContext = useMemo(
        () => ({
            login: () => {
                setAuthState(AuthState.Authenticated)
            },
            signOut: () => {
                setAuthState(AuthState.Unauthenticated)
            },
        }),
        []
    );

    useEffect(() => {
        deps.storage.isLoggedIn()
            .then(authd => {
                //todo we should make the state object here more complex to effectively casche the user
                setAuthState(authd ? AuthState.Authenticated : AuthState.Unauthenticated)
            })
    }, [])

    //todo replace with expo splash loading screen
    if (authState == AuthState.Loading) {
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
                })
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

    const modalScreenOptions = () => ({
        headerShown: false,
        cardStyle: {
            backgroundColor: 'transparent',
        },
        cardOverlayEnabled: true,
            cardStyleInterpolator: cardInterpolator,
            gestureResponseDistance: {vertical: 1000},
    })

    const HomeNav = () => (
        <Stack.Navigator initialRouteName='Home' mode={'modal'}>
            <Stack.Screen name='Home' component={home} options={{headerShown: false}}/>

            <Stack.Screen name='Detail' component={Detail} options={modalScreenOptions}/>

            <Stack.Screen name='SeenIt' component={SeenIt} options={modalScreenOptions}/>

        </Stack.Navigator>
    )

    const home = () => (
        <Stack.Navigator initialRouteName='Queue'>
            <Stack.Screen name='Queue' component={drawer}/>

            <Stack.Screen name='Profile' component={profile} options={{
                headerShown: false,
            }}/>
        </Stack.Navigator>
    )

    const profile = () => (
        <Stack.Navigator initialRouteName='Profile' mode={'modal'}  screenOptions={{
            cardStyle: {
                backgroundColor: BingeMatch.colors.bg
            }
        }}>
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen name='AddGenres' component={AddGenres} options={modalScreenOptions} />
        </Stack.Navigator>
    )

    const drawer = () => (
        <Drawer.Navigator
            drawerType={'slide'}
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerStyle={{width: '53%'}}>

            <Stack.Screen name='Queue' initialParams={{advanceHead: InteractionName.SwipeLike}} component={Queue}/>

            <Stack.Screen name='ListAction' component={ListAction} options={modalScreenOptions} />
            <Stack.Screen name='Likes' component={Likes} initialParams={{
                list: 'Likes'
            }}/>

            <Stack.Screen name='Watched' component={Likes} initialParams={{
                list: 'Watched'
            }}/>
            <Stack.Screen name='Matched' component={Likes} initialParams={{
                list: 'Matched'
            }}/>
        </Drawer.Navigator>
    )

    const OnBoardNav = () => (
        <Stack.Navigator initialRouteName={'SignUp'} mode={'modal'}>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='Login' component={Login} options={modalScreenOptions} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{
                animationTypeForReplace: 'push'
            }}/>
        </Stack.Navigator>
    )

    return (
        <Provider store={store}>
        <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={BingeMatch.navigation}>
                <RootSiblingParent>
                    {authState != AuthState.Authenticated ? OnBoardNav() : HomeNav()}
                </RootSiblingParent>
            </NavigationContainer>
        </AuthContext.Provider>
        </Provider>
    );
}
