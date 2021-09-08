import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {ActivityIndicator, Image, Pressable, StyleSheet, Text, View} from "react-native";
import Dependencies from "../Dependencies";
import {show, user} from "../model/compiled";
import {BingeMatch} from "../theme";
import DraggableFlatList, {RenderItemParams} from "react-native-draggable-flatlist";
import {Swipeable} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavProp} from "../etc/RootStackParamList";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {Button} from "../components/Button";
import {BarsIcon} from "../components/Icons";

type LikeAndDetail = {
    show: show.IDetail
    like: user.ILikedShow
}

export const Likes: React.FC = (props) => {

    const api = Dependencies.instance.api
    const dispatch = useAppDispatch()
    const navigation = useNavigation<DrawerNavProp<'Likes'>>()

    const listsState = useAppSelector(state => state.lists)

    const [likes, setLikes] = useState<LikeAndDetail[]>()

    useLayoutEffect(() => {
        navigation.dangerouslyGetParent().setOptions({
            headerStyle: BingeMatch.theme.nav.bar,
            headerTitle: () => (<Text style={BingeMatch.theme.nav.title}>Your Likes</Text>),
            headerLeft: () => (
                <Button style={styles.buttons} onPress={() => navigation.toggleDrawer()}>
                    <BarsIcon style={BingeMatch.theme.nav.icons} size={30}/>
                </Button>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        setLikes(null)
    }, [listsState.updated])

    useEffect(() => {
        navigation.addListener('focus', () => {

            if (likes != null) {
                return
            }

            //hydrate if likes is empty
            api.getLikes()
                .then(showLikes => {
                    api.getShows(showLikes.map(like => like.show))
                        .then(details => {

                            //reverse to have newest at the top
                            const lad = details
                                .map((detail, index) => (
                                    {show: detail, like: showLikes[index]} as LikeAndDetail
                                ))
                                .reverse()

                            setLikes(lad)
                        })
                })
        })
    }, [navigation])

    const updateOrder = (from : number, to : number) => {
        //todo no backend support yet

        // api.setQueueState(item.id, queue.QueueItemState.Queued)
        //     .then(() => {
        //         //todo no error handling for this
        //     })
    }

    const onPress = (show: string) => {
        navigation.navigate('Detail', {
            show: show
        })
    }

    const remove = (index : Number, item : LikeAndDetail) => {
        setLikes( likes.filter(remove => remove.show.id != item.show))

        // api.setQueueState(item.id, queue.QueueItemState.Queued)
        //     .then(() => {
        //         //todo no error handling for this
        //     })
    };

    const toCard = useCallback(({ item, index, drag, isActive }: RenderItemParams<LikeAndDetail>) => {

        return <Swipeable
            renderRightActions={() => renderActions(index, item)}>
            <View style={styles.item}>
                <Image
                    style={styles.poster}
                    resizeMode={"contain"}
                    source={{uri: `https://image.tmdb.org/t/p/w92${item.show.posterPath}`}} />
                <Pressable style={styles.title}
                           onPress={() => onPress(item.show.id)}
                           onLongPress={drag}>
                    <Text key={item.show.id} style={styles.titleText}>
                        {item.show.title}
                    </Text>
                    <View style={styles.detailsLastLineRating}>
                        <Image style={styles.detailsLastLineRatingIcon} source={require('../assets/rt_tomato.png')}/>
                        <Text style={styles.detailsLastLineRatingPerc}>69%</Text>

                        <Image style={{...styles.detailsLastLineRatingIcon, marginLeft: 12}}
                               source={require('../assets/rt_user.png')}/>
                        <Text style={styles.detailsLastLineRatingPerc}>89%</Text>
                    </View>
                    <Text numberOfLines={4} style={{marginBottom: 9}}>
                        {item.show.overview}
                    </Text>
                </Pressable>
            </View>
        </Swipeable>
        }, [])

    const watched = (index : number, item : LikeAndDetail) => {
        navigation.navigate('SeenIt', {
            show: item.show.id
        })
    }

    const renderActions = (index : number, item : LikeAndDetail) => (
        <View style={styles.actionsRow}>
            <Pressable
                style={[styles.actionsButton, styles.moreAction]}
                onPress={() => watched(index, item)}>
                <Text style={BingeMatch.theme.likes.actions.text}>Seen It</Text>
            </Pressable>
            <Pressable
                style={[styles.actionsButton, styles.removeAction]}
                onPress={() => remove(index, item)}>
                <Text style={BingeMatch.theme.likes.actions.text}>Remove</Text>
            </Pressable>
        </View>
    );

    return !likes ?
        <View style={styles.loading}>
            <ActivityIndicator size="large"/>
        </View>
        :
        <DraggableFlatList
            style={styles.likes}
            data={likes}
            renderItem={toCard}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `list-item-${index}`}
            onDragEnd={({ from, to}) => updateOrder(from, to)}
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

    buttons: {
        paddingHorizontal: 0
    }
})

