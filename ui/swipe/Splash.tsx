import React, {useEffect} from "react";
import {useWindowDimensions} from "react-native";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {AuthStatus, login, logout} from "./auth/auth";
import Dependencies from "./Dependencies";
import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParamList} from "./etc/RootStackParamList";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Detail} from "./detail/Detail";
import {SeenIt} from "./seenit/SeenIt";
import {BingeMatch} from "./theme";
import {Profile} from "./user/Profile";
import {AddGenres} from "./genres/AddGenres";
import {CustomDrawerContent} from "./drawer/CustomDrawerContent";
import Queue from "./queue/Queue";
import {ListAction} from "./likes/ListAction";
import {Likes} from "./likes/Likes";
import {SignUp} from "./onboard/SignUp";
import {Login} from "./onboard/Login";
import {ForgotPassword} from "./onboard/ForgotPassword";

const Splash: React.FC = (props) => {

    const deps = Dependencies.instance
    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const Stack = createStackNavigator<RootStackParamList>();
    const Drawer = createDrawerNavigator<RootStackParamList>();

    const window = useWindowDimensions()

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

            <Stack.Screen name='Queue' component={Queue}/>

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


    useEffect(() => {
        deps.storage.isLoggedIn()
            .then(authd => {
                dispatch(authd ? login() : logout())
            })
    }, [])

    return <>
        {auth.status != AuthStatus.Authenticated ? OnBoardNav() : HomeNav()}
    </>

}

export default Splash;
