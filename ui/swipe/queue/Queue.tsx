import React, {createContext, Dispatch, useContext, useEffect, useLayoutEffect, useReducer} from 'react';

import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {queue} from "../model/compiled";
import {DrawerNavigationProps} from "../etc/BaseNavigationProps";
import Dependencies from "../Dependencies";
import {Deck} from "./Deck";
import {
    beforeHeadExclusive,
    countAfterHeadInclusive,
    getHead,
    getItem, headIndex,
    nextHead,
    previous,
    previousHead,
    removeFinishedAfterBacks,
    updateInPlace
} from "./QueueUtils";
import {
    activeCardMax,
    InteractionName,
    queueReducer,
    QueueReducer, queueReducerDefaults,
    StateChange,
} from "./QueueReducer";
import {Item, Sentiment, SyncStatus} from "./QueueEvents";
import QueueActions from "./Actions";
import {BingeMatch} from "../theme";
import {BarsIcon, SettingsIcon} from "../components/Icons";
import {Button} from "../components/Button";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {DrawerNavProp, RootStackParamList} from "../etc/RootStackParamList";
import {increment, useAppDispatch, useAppSelector} from "../redux/split";

const Queue: React.FC = (props) => {

    const api = Dependencies.instance.api
    const [state, dispatch] = useReducer<QueueReducer>(queueReducer, {
        cardItems: [], cacheItems: [], head: undefined
    })

    const count = useAppSelector(state => state.counter.value)
    const dis = useAppDispatch()

    const navigation = useNavigation<DrawerNavProp<'Queue'>>()
    const route = useRoute<RouteProp<RootStackParamList, 'Queue'>>()

    useLayoutEffect(() => {
        navigation.dangerouslyGetParent().setOptions({
            headerStyle: BingeMatch.theme.nav.bar,
            headerTitle: () => (<Text style={BingeMatch.theme.nav.title}>NightIn</Text>),
            headerRight: () => (
                <Button style={styles.buttons} onPress={() => navigation.navigate('Profile')}>
                    <SettingsIcon style={BingeMatch.theme.nav.icons} size={30}/>
                </Button>
            ),
            headerLeft: () => (
                <Button style={styles.buttons} onPress={() => navigation.toggleDrawer()}>
                    <BarsIcon style={BingeMatch.theme.nav.icons} size={30}/>
                </Button>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (state.cacheItems.length < activeCardMax) {
            api.getQueue()
                .then(moreActive => {
                    dispatch({addToCache: moreActive.items as queue.QueuedItem[]})
                })
        }
    }, [state.cacheItems])

    useEffect(() => {
        beforeHeadExclusive(state.cardItems, state.head)
            .filter(item => item.synced == SyncStatus.UnSynced)
            .forEach(item => {
                console.log("dis")
                dis(increment())
                dispatch({setSync: {sync: SyncStatus.Syncing, id: item.data.id}})

                api.setQueueState(item.data.id, item.sentiment.valueOf())
                    .then(() => {
                        dispatch({setSync: {sync: SyncStatus.Synced, id: item.data.id}})
                    })
            })

    }, [state.head])

    return (
        <SafeAreaView style={styles.home}>
            <Text>c: {count}</Text>
            <Deck
                items={state.cardItems}
                dispatch={dispatch}
            />
            <QueueActions
                head={getHead(state.cardItems, state.head)}
                dispatch={dispatch}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: BingeMatch.theme.queue.background,
    },

    buttons: {
        paddingHorizontal: 0
    }
});

export default Queue;

