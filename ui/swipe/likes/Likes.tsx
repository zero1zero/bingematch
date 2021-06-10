import React, {useEffect, useState} from "react";
import {BaseNavigationProps} from "../etc/BaseNavigationProps";
import {
    ActivityIndicator,
    FlatList,
    Image,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Dependencies from "../Dependencies";
import {show} from "../model/compiled";
import {BingeMatch} from "../theme";
import {EllipsisIcon, EyeIcon, HeartIcon} from "../components/Icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

export const Likes: React.FC<BaseNavigationProps<'Likes'>> = (props) => {

    const api = Dependencies.instance.api

    const [likes, setLikes] = useState<show.IThinDetail[]>()

    useEffect(() => {
        //todo get likes
        function fy(a,b,c,d){//array,placeholder,placeholder,placeholder
            c=a.length;while(c)b=Math.random()*(--c+1)|0,d=a[c],a[c]=a[b],a[b]=d
        }
        api.getQueue()
            .then(likes => {
                setLikes(likes.items
                    .map(queueItem => queueItem.show)
                )
            })
    }, [])

    if (!likes) {
        return (<View style={styles.loading}>
            <ActivityIndicator size="large"/>
        </View>)
    }

    const onPress = (item: show.IThinDetail) => {
        props.navigation.navigate('Detail', {
            id: item.id
        })
    }

    const toCard = (renderItemInfo : ListRenderItemInfo<show.IThinDetail>) => {

        const item = renderItemInfo.item

        return <View style={styles.item}>
                <Image
                    style={styles.poster}
                    resizeMode={"contain"}
                    source={{uri: `https://image.tmdb.org/t/p/w92${item.posterPath}`}} />
            <TouchableOpacity style={styles.title} onPress={() => onPress(item) }>
                <Text key={item.id} style={styles.titleText}>
                    {item.title}
                </Text>
                <View style={styles.detailsLastLineRating}>
                    <Image style={styles.detailsLastLineRatingIcon} source={require('../assets/rt_tomato.png')}/>
                    <Text style={styles.detailsLastLineRatingPerc}>69%</Text>

                    <Image style={{...styles.detailsLastLineRatingIcon, marginLeft: 12}}
                           source={require('../assets/rt_user.png')}/>
                    <Text style={styles.detailsLastLineRatingPerc}>89%</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.actions}
                onPress={() => props.navigation.navigate('LikeAction', {
                    id: item.id
                })}>
                <EllipsisIcon size={15}/>
            </TouchableOpacity>
        </View>
    }

    const likesList : React.FC<BaseNavigationProps<'Likes'>> = () => {
        return <FlatList style={styles.likes} data={likes} renderItem={toCard} />
    }

    const watchedList : React.FC<BaseNavigationProps<'Likes'>> = () => {
        return <FlatList style={styles.likes} data={likes} renderItem={toCard} />
    }

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Likes') {
                        return focused
                            ? <HeartIcon size={20} color={BingeMatch.colors.success} />
                            : <HeartIcon size={20} color={BingeMatch.colors.grey} />;
                    }

                    if (route.name === 'Watched') {
                        return focused
                            ? <EyeIcon size={20} color={BingeMatch.colors.success} />
                            : <EyeIcon size={20} color={BingeMatch.colors.grey} />;
                    }
                },
            })}
            tabBarOptions={{
                style: {
                    backgroundColor: BingeMatch.colors.bg,
                    paddingTop: 7
                },
                labelStyle: {
                    fontSize: 17,
                    fontWeight: '700',
                    marginTop: 4,
                    color: BingeMatch.colors.grey,
                },
            }}>
            <Tab.Screen name="Likes" component={likesList} />
            <Tab.Screen name="Watched" component={watchedList} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

    loading: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: BingeMatch.colors.bg,
    },

    likes: {
        padding: 14,
        backgroundColor: BingeMatch.colors.bg
    },

    item: {
        flex: 1,
        flexDirection: 'row',

        height: 92 * 1.5, //poster ratio
        marginVertical: 5,
    },

    poster:  {
        width: 92,
    },

    title: {
        flex: 1,
        flexGrow: 2,
        marginLeft: 9,
        justifyContent: 'center',
    },

    titleText: {

        ...BingeMatch.theme.likes.title
    },

    actions: {
        width: 40,
        marginTop: 5,
        alignItems: 'center',
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
})
