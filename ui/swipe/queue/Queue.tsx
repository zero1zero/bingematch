import React, {useEffect, useLayoutEffect} from 'react';

import {SafeAreaView, StyleSheet, Text} from "react-native";
import {queue} from "../model/compiled";
import Dependencies from "../Dependencies";
import {Deck} from "./Deck";
import {beforeHeadExclusive, getHead} from "./QueueUtils";
import {activeCardMax, addToCache, setSync,} from "./reducer";
import {SyncStatus} from "./QueueEvents";
import QueueActions from "./Actions";
import {BingeMatch} from "../theme";
import {BarsIcon, SettingsIcon} from "../components/Icons";
import {Button} from "../components/Button";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {DrawerNavProp, RootStackParamList} from "../etc/RootStackParamList";
import {useAppDispatch, useAppSelector} from "../redux/hooks";

const Queue: React.FC = (props) => {

    const api = Dependencies.instance.api

    const state = useAppSelector(state => state.queue)
    const dispatch = useAppDispatch()

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
                    dispatch(addToCache(moreActive.items as queue.IQueuedItem[]))
                })
        }
    }, [state.cacheItems])

    useEffect(() => {
        beforeHeadExclusive(state.cardItems, state.head)
            .filter(item => item.synced == SyncStatus.UnSynced)
            .forEach(item => {
                dispatch(setSync({sync: SyncStatus.Syncing, id: item.data.id}))

                api.setQueueState(item.data.id, item.sentiment.valueOf())
                    .then(() => {
                        dispatch(setSync({sync: SyncStatus.Synced, id: item.data.id}))
                    })
            })

    }, [state.head])

    return (
        <SafeAreaView style={styles.home}>
            <Deck
                items={state.cardItems} />
            <QueueActions
                head={getHead(state.cardItems, state.head)} />
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

