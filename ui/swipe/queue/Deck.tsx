import {Image, ImageBackground, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import React from "react";
import {BingeMatch} from "../theme";
import {Swipable} from "./Swipable";
import {Item} from "./QueueEvents";


interface Props {
    items: Item[]
}

//pulled from tmdb configuration
const sizes = [92,
    154,
    185,
    342,
    500,
    780]

export const Deck: React.FC<Props> = (props) => {

    const window = useWindowDimensions()
    const cardWidth = window.width * .86
    // const cardHeight = window.height * .77
    const imageHeight = (cardWidth / .66)

    const closeToRes = (img) => Math.abs(img - (imageHeight * .8))

    const posterWidth = (): number => {
        const [size] = sizes
            .sort((a, b) => {
                return closeToRes(a) - closeToRes(b)
            })
        return size
    }

    const toCard = (item : Item) => {
        const date = new Date(item.show.date)
        return <Swipable
            style={{...styles.card, width: cardWidth}}
            item={item}
            key={`card-${item.show.id}`}>
            {/*<HeartIcon {...styles.reportIcon} /> <Text>Liked by Ruoxi, Ajay and Jesi</Text>*/}
            <View>
                <View style={{...styles.image}}>
                    <ImageBackground
                        style={{height: '100%'}}
                        blurRadius={10}
                        source={{uri: `https://image.tmdb.org/t/p/w${posterWidth()}/${item.show.posterPath}`}}>
                        <Image
                            style={{height: '100%'}}
                            resizeMode={"contain"}
                            source={{uri: `https://image.tmdb.org/t/p/w${posterWidth()}/${item.show.posterPath}`}}>
                        </Image>
                    </ImageBackground>
                </View>
            </View>
            <View style={styles.details}>
                <Text numberOfLines={2} style={styles.detailsTitle}>{item.show.title} ({date.getFullYear()}) - {item.show.movie ? 'Movie' : 'TV'}</Text>
                <Text style={styles.detailsText} numberOfLines={4}>{item.show.overview}</Text>

                <ScrollView style={styles.detailsGenres} horizontal={true}>
                    {(item.show.genres || []) //todo i think we can remove once we filter by more than 1 genre
                        .filter(genre => genre.name != null)
                        .map(genre => (
                            <Text style={styles.detailsGenresName}
                                  key={`genre-${genre.id}`}>
                                {genre.name}
                            </Text>
                        ))}
                </ScrollView>

                <View style={styles.detailsLastLine}>
                    <View style={styles.detailsLastLineRating}>
                        <Image style={styles.detailsLastLineRatingIcon} source={require('../assets/rt_tomato.png')}/>
                        <Text style={styles.detailsLastLineRatingPerc}>69%</Text>

                        <Image style={{...styles.detailsLastLineRatingIcon, marginLeft: 12}}
                               source={require('../assets/rt_user.png')}/>
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
        </Swipable>
    }

    return (
        <View style={styles.deck}>
            {props.items
                .slice()
                .reverse()
                .map(toCard)}
        </View>
    )
}

const styles = StyleSheet.create({
    deck: {
        marginTop: 7,
        flex: 1,

        ...BingeMatch.shadow
    },
    card: {
        alignSelf: "center",
        position: "absolute",
        zIndex: -1,
        borderRadius: 12,
        backgroundColor: "#FFF",
        top: 0,
        bottom: 0,
        overflow: "hidden"
    },
    image: {
        height: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: -160,
    },
    details: {
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
        height: 160,
        padding: 8,
    },
    detailsTitle: {
        maxHeight: 23,
        marginBottom: 5,

        fontSize: 18,
        fontWeight: '700'
    },
    detailsText: {
        fontSize: 13,
        minHeight: 65
    },
    detailsGenres: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        marginVertical: 4,
        maxHeight: 25
    },
    detailsGenresName: {
        padding: 4,
        marginVertical: 2,
        marginRight: 4,
        borderRadius: 5,
        alignSelf: 'center',
        overflow: 'hidden',

        ...BingeMatch.theme.queue.genres
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
        alignItems: 'center',
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
