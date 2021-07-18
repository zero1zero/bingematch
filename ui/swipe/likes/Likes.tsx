import React, {useEffect, useState} from "react";
import {DrawerNavigationProps} from "../etc/BaseNavigationProps";
import {
    ActivityIndicator,
    Image,
    ListRenderItemInfo,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Dependencies from "../Dependencies";
import {queue, show} from "../model/compiled";
import {BingeMatch} from "../theme";
import {SwipeListView, SwipeRow} from "react-native-swipe-list-view";

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

    if (!likes) {
        return (<View style={styles.loading}>
            <ActivityIndicator size="large"/>
        </View>)
    }

    const onPress = (item: show.ThinDetail) => {
        props.navigation.navigate('Detail', {
            id: item.id
        })
    }

    const remove = (renderItemInfo : ListRenderItemInfo<queue.QueuedItem>, rowMap) => {
        const row : SwipeRow<show.ThinDetail> = rowMap[renderItemInfo.index]
        row.closeRow()

        setLikes( likes.filter(item => item.id != renderItemInfo.item.id))

        api.setQueueState(renderItemInfo.item.id, queue.QueueItemState.Queued)
            .then(() => {
                //todo no error handling for this
            })
    };

    const toCard = (renderItemInfo : ListRenderItemInfo<queue.QueuedItem>) => {

        const show = renderItemInfo.item.show as show.ThinDetail

        return <View style={styles.item}>
            <Image
                style={styles.poster}
                resizeMode={"contain"}
                source={{uri: `https://image.tmdb.org/t/p/w92${show.posterPath}`}} />
            <Pressable style={styles.title} onPress={() => onPress(show) }>
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
    }

    const renderHiddenItem = (renderItemInfo : ListRenderItemInfo<queue.QueuedItem>, rowMap) => (
        <View style={styles.rowBack}>
            <Text>Left</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                // onPress={() => alertt(rowMap, data.item.key)}
            >
                <Text style={BingeMatch.theme.likes.actions.text}>More</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => remove(renderItemInfo, rowMap)}
            >
                <Text style={BingeMatch.theme.likes.actions.text}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

        return <SwipeListView style={styles.likes}
                              data={likes}
                              renderItem={toCard}
                              showsVerticalScrollIndicator={false}
                              renderHiddenItem={renderHiddenItem}
                              leftOpenValue={75}
                              rightOpenValue={-150}
                              previewOpenValue={-150}
                              previewOpenDelay={2000}
                              keyExtractor={(item, index) => index.toString()}
                              previewRowKey={'0'}
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
    rowFront: {
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        marginVertical: 5,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        right: 75,

        backgroundColor: BingeMatch.colors.blue
    },
    backRightBtnRight: {
        right: 0,

        backgroundColor: BingeMatch.theme.likes.actions.remColor
    },
})

