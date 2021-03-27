import {Image, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import React from "react";
import {Item, StateChange} from "./QueueEvents";
import Swipable from "./Swipable";
import {useHeaderHeight} from '@react-navigation/stack';
import {BingeMatch} from "../theme";

interface Props {
    items: Item[]
    dispatch: React.Dispatch<StateChange>
}

//pulled from tmdb configuration
const sizes = [92,
    154,
    185,
    342,
    500,
    780]

const Deck : React.FC<Props> = (props) => {

    const headerHeight = useHeaderHeight();

    const window = useWindowDimensions()
    const cardWidth = window.width * .86
    const cardHeight = window.height * .77
    const imageHeight = (cardWidth / .66)

    const closeToRes = (img) => Math.abs(img - (imageHeight * .8))

    const posterWidth = () : number => {
        const [size] = sizes
            .sort((a, b) => {
                return closeToRes(a) - closeToRes(b)
            })
        return size
    }

    props.items.forEach((i) => {
        console.log(i.data.id)
    })

    const toCard = (item : Item) => (
        <Swipable
            item={item}
            key={item.data.id}
            dispatch={props.dispatch}>
            <View style={{...styles.card, width: cardWidth}}>
                {/*<HeartIcon {...styles.reportIcon} /> <Text>Liked by Ruoxi, Ajay and Jesi</Text>*/}
                <Image style={styles.image} width={cardWidth} height={imageHeight} source={{uri: `https://image.tmdb.org/t/p/w${posterWidth()}/${item.data.movie.posterPath}`}}>
                </Image>
                <View style={styles.details}>
                    <Text numberOfLines={2} style={styles.detailsTitle}>{item.data.movie.title}</Text>
                    <Text style={styles.detailsText} numberOfLines={4}>{item.data.movie.overview}</Text>

                    <View style={styles.detailsGenres}>
                        {item.data.movie.genres
                            .filter(genre => genre.name != null)
                            .map(genre => (
                                <Text style={styles.detailsGenresName}>{genre.name}</Text>
                            ))}
                    </View>

                    <View style={styles.detailsLastLine}>
                        <View style={styles.detailsLastLineRating}>
                            <Image style={styles.detailsLastLineRatingIcon} source={require('../assets/rt_tomato.png')}/>
                            <Text style={styles.detailsLastLineRatingPerc}>69%</Text>


                            <Image style={{...styles.detailsLastLineRatingIcon, marginLeft: 12}} source={require('../assets/rt_user.png')}/>
                            <Text style={styles.detailsLastLineRatingPerc}>89%</Text>
                        </View>

                        {/*<Text style={styles.detailsLastLineMore}>*/}
                        {/*    More*/}
                        {/*</Text>*/}
                        {/*<Button style={styles.detailsLastLineMore}*/}
                        {/*        size='large'*/}
                        {/*        appearance='ghost'*/}
                        {/*        status='info'>*/}
                        {/*    More*/}
                        {/*</Button>*/}
                    </View>
                </View>
            </View>
        </Swipable>
    )

    return (
        <View style={styles.deck}>
            {props.items
                .slice()
                .reverse()
                .map(toCard)}
        </View>
    )
}

export default Deck

const styles = StyleSheet.create({
    deck: {
        flex: 60,
        marginTop: 7,

        ...BingeMatch.shadow
    },
    card: {
        position: "absolute",
        alignSelf: "center",
        zIndex: -1,
        borderRadius: 12,
        backgroundColor: "#FFF",
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    details: {
        flex: 2,
        padding: 8,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: '700'
    },
    detailsText: {
        fontSize: 13,
    },
    detailsGenres: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        marginVertical: 4,
    },
    detailsGenresName: {
        color: '#fff',
        fontSize: 12,
        marginRight: 4,
        backgroundColor: BingeMatch.theme.genres,
        padding: 4,
    },
    detailsLastLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    detailsLastLineRating: {
        flex: 2,
        flexDirection: 'row',
        alignItems:'center',
    },
    detailsLastLineRatingIcon: {
        width: 15,
        height: 15,
        resizeMode: 'stretch',
        marginRight: 5,
    },
    detailsLastLineRatingPerc: {
        fontWeight: 'bold'
    },
    detailsLastLineMore: {
        flex: 1,
        padding: 0
    },

    reportIcon: {
        position: 'absolute',
        right: 0,
        margin: 5,
        width: 30,
        height: 30,
    },
})
