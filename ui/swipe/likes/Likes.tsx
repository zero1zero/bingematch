import React, {useCallback, useEffect, useState} from "react";
import {DrawerNavigationProps} from "../etc/BaseNavigationProps";
import {ActivityIndicator, Image, Pressable, StyleSheet, Text, View} from "react-native";
import Dependencies from "../Dependencies";
import {queue, show} from "../model/compiled";
import {BingeMatch} from "../theme";
import DraggableFlatList, {RenderItemParams} from "react-native-draggable-flatlist";
import {Swipeable} from "react-native-gesture-handler";

export const Likes: React.FC<DrawerNavigationProps<'Likes'>> = (props) => {

    const api = Dependencies.instance.api

    const [likes, setLikes] = useState<queue.QueuedItem[]>()

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            setLikes(null)
            //hydrate if likes is empty
            api.getLikes()
                .then(likes => {
                    setLikes(likes.items as queue.QueuedItem[]) //reverse to put ~newest at top
                })
        })
    }, [props.navigation])

    const updateOrder = (likes : queue.QueuedItem[]) => {
        //todo no backend support yet

        // api.setQueueState(item.id, queue.QueueItemState.Queued)
        //     .then(() => {
        //         //todo no error handling for this
        //     })
    }

    const onPress = (item: show.ThinDetail) => {
        props.navigation.navigate('Detail', {
            id: item.id
        })
    }

    const remove = (index : Number, item : queue.QueuedItem) => {
        setLikes( likes.filter(item => item.id != item.id))

        api.setQueueState(item.id, queue.QueueItemState.Queued)
            .then(() => {
                //todo no error handling for this
            })
    };

    const toCard = useCallback(({ item, index, drag, isActive }: RenderItemParams<queue.QueuedItem>) => {
        const show = item.show as show.ThinDetail
        return <Swipeable
            renderRightActions={() => renderActions(index, item)}>
            <View style={styles.item}>
                <Image
                    style={styles.poster}
                    resizeMode={"contain"}
                    source={{uri: `https://image.tmdb.org/t/p/w92${show.posterPath}`}} />
                <Pressable style={styles.title}
                           onPress={() => onPress(show)}
                           onLongPress={drag}>
                    <Text key={show.id} style={styles.titleText}>
                        {show.title}
                    </Text>
                    <View style={styles.detailsLastLineRating}>
                        <Image style={styles.detailsLastLineRatingIcon} source={require('../assets/rt_tomato.png')}/>
                        <Text style={styles.detailsLastLineRatingPerc}>69%</Text>

                        <Image style={{...styles.detailsLastLineRatingIcon, marginLeft: 12}}
                               source={require('../assets/rt_user.png')}/>
                        <Text style={styles.detailsLastLineRatingPerc}>89%</Text>
                    </View>
                    <Text numberOfLines={4} style={{marginBottom: 9}}>
                        {show.overview}
                    </Text>
                </Pressable>
            </View>
        </Swipeable>
        }, [])

    const renderActions = (index : Number, item : queue.QueuedItem) => (
        <View style={styles.actionsRow}>
            <Pressable
                style={[styles.actionsButton, styles.moreAction]}
                onPress={() => alert(item.id)}>
                <Text style={BingeMatch.theme.likes.actions.text}>More</Text>
            </Pressable>
            <Pressable
                style={[styles.actionsButton, styles.removeAction]}
                onPress={() => remove(index, item)}>
                <Text style={BingeMatch.theme.likes.actions.text}>Remove</Text>
            </Pressable>
        </View>
    );

    if (!likes) {
        return <View style={styles.loading}>
            <ActivityIndicator size="large"/>
        </View>
    }


    return <DraggableFlatList
        style={styles.likes}
        data={likes}
        renderItem={toCard}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `list-item-${index}`}
        onDragEnd={({ data }) => updateOrder(data)}
    />
}

const styles = StyleSheet.create({

    loading: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: BingeMatch.colors.bg,
    },

    likes: {
        padding: 14,
        backgroundColor: BingeMatch.colors.bg,
    },

    item: {
        flex:1,
        flexDirection: 'row',

        height: 92 * 1.5, //poster ratio
        marginVertical: 5,
        backgroundColor: BingeMatch.colors.bg,
    },

    poster:  {
        width: 92,
    },

    title: {
        flex: 1,
        marginLeft: 9,
        justifyContent: 'center',
    },

    titleText: {

        ...BingeMatch.theme.likes.title
    },

    detailsLastLineRating: {
        flex: 2,
        flexDirection: 'row',
        marginTop: 5
    },
    detailsLastLineRatingIcon: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    detailsLastLineRatingPerc: {
        fontWeight: 'bold'
    },

    container: {
        marginVertical: 5,
        flex: 1,
    },

    actionsRow: {
        backgroundColor: '#DDD',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },

    actionsButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
    },

    removeAction: {
        backgroundColor: BingeMatch.theme.likes.actions.removeColor
    },

    moreAction: {
        backgroundColor: BingeMatch.theme.likes.actions.moreColor
    },
})

