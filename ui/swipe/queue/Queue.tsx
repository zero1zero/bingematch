import React, {useEffect, useLayoutEffect} from 'react';

import {SafeAreaView, StyleSheet, Text} from "react-native";
import Dependencies from "../Dependencies";
import {Deck} from "./Deck";
import {beforeHeadExclusive, getHead} from "./QueueUtils";
import {activeCardMax, addToCache, interaction, InteractionName, resetLastAddedCount, setSync,} from "./reducer";
import {Sentiment, SyncStatus} from "./QueueEvents";
import QueueActions from "./Actions";
import {BingeMatch} from "../theme";
import {BarsIcon, SettingsIcon} from "../components/Icons";
import {Button} from "../components/Button";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {DrawerNavProp, RootStackParamList} from "../etc/RootStackParamList";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {show} from "../model/compiled";
import {listsUpdated} from "../likes/reducer";

const Queue: React.FC = (props) => {

    const api = Dependencies.instance.api

    const queueState = useAppSelector(state => state.queue)
    const seenItState = useAppSelector(state => state.seenIt)
    const dispatch = useAppDispatch()

    const navigation = useNavigation<DrawerNavProp<'Queue'>>()
    const route = useRoute<RouteProp<RootStackParamList, 'Queue'>>()

    useLayoutEffect(() => {
        navigation.dangerouslyGetParent().setOptions({
            headerStyle: BingeMatch.theme.nav.bar,
            headerTitle: () => (<Text style={BingeMatch.theme.nav.title}>Night In</Text>),
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
        //we will cause a loop because there are not enough queue items to add
        if (queueState.lastAddedCount < activeCardMax) {
            setTimeout(() => {
                dispatch(resetLastAddedCount())
            }, 3000)

            return
        }

        if (queueState.cacheItems.length < activeCardMax) {
            api.getQueue()
                .then(moreActive => {
                    const hydrates = moreActive
                        .map((item) : Promise<show.IDetail> =>
                            api.getShow(item.show)
                        )

                    if (hydrates.length > 0) {
                        Promise.all(hydrates)
                            //todo error handing for images?
                            .then((shows) => dispatch(addToCache(shows)))
                    }
                })
        }
    }, [queueState.cacheItems])

    useEffect(() => {

        //everything not synced thats been swiped
        beforeHeadExclusive(queueState.cardItems, queueState.head)
            .filter(item => item.synced == SyncStatus.UnSynced)
            .forEach(item => {
                dispatch(setSync({sync: SyncStatus.Syncing, id: item.show.id}))

                const after = () => {
                    dispatch(setSync({sync: SyncStatus.Synced, id: item.show.id}))
                    dispatch(listsUpdated())
                }

                switch(item.sentiment) {
                    case Sentiment.Like: {
                        api.like(item.show.id)
                            .then(after)
                        break;
                    }

                    case Sentiment.Dislike: {
                        api.dislike(item.show.id)
                            .then(after)
                        break;
                    }
                }
            })

        //if a head that has been gone back on, reset its state and sync status
        const head = getHead(queueState.cardItems, queueState.head)
        if (head && head.synced == SyncStatus.DeSynced) {
            dispatch(setSync({sync: SyncStatus.Syncing, id: head.show.id}))
            api.back(head.show.id)
                .then(() => {
                    dispatch(setSync({sync: SyncStatus.UnSynced, id: head.show.id}))
                    dispatch(listsUpdated())
                })
        }

    }, [queueState.head, queueState.cardItems])

    useEffect(() => {

        if (queueState.head == undefined || seenItState.lastSeenItShow.show != queueState.head) {
            return
        }

        dispatch(interaction( {
            name: seenItState.lastSeenItShow.rating >= .5 ? InteractionName.SwipeLike : InteractionName.SwipeDislike,
            item: {
                ...getHead(queueState.cardItems, queueState.head),
                synced: SyncStatus.Synced //pretend its synced because it was already marked as watched
            }
        }))
    }, [seenItState.lastSeenItShow])

    return (
        <SafeAreaView style={styles.home}>
            <Deck
                items={queueState.cardItems} />
            <QueueActions
                head={getHead(queueState.cardItems, queueState.head)} />
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

