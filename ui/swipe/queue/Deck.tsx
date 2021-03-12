import {Dimensions, ImageBackground, StyleSheet, useWindowDimensions, View, Image} from "react-native";
import {Button, Icon, Text} from "@ui-kitten/components";
import React from "react";
import {Item, StateChange} from "./QueueEvents";
import Card from "./Card";
import {ArrowDown, ReportIcon} from "../etc/Icons";
import { LinearGradient } from 'expo-linear-gradient';

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

    const window = Dimensions.get("window")
    const cardHeight = window.height * .80
    const cardWidth = window.width * .90

    const closeToRes = (img) => Math.abs(img - cardHeight * .8)

    const posterWidth = () : number => {
        const [size] = sizes
            .sort((a, b) => {
                return closeToRes(a) - closeToRes(b)
            })
        return size
    }

    const toCard = (item : Item) => (
        <Card
            item={item}
            key={item.data.id}
            dispatch={props.dispatch}>
            <View style={{...styles.card, width: cardWidth, height: cardHeight}}>
                <ImageBackground style={styles.image} source={{uri: `https://image.tmdb.org/t/p/w${posterWidth()}/${item.data.movie.posterPath}`}}>
                {/*<ReportIcon {...styles.reportIcon} />*/}
                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} />
                    <View style={{width: "100%"}}>
                    </View>
                </ImageBackground>
                <View style={styles.details}>
                    <Text category='h6' numberOfLines={2}>{item.data.movie.title}</Text>
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
        </Card>
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
        flex: 40,
        // backgroundColor: '#fff',
        paddingTop: 7,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    card: {
        position: "absolute",
        alignSelf: "center",
        zIndex: -1,
        borderRadius: 12,
        backgroundColor: "#FFF",
    },
    image: {
        flex: 8,//aspect ratio should be .666 for images
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    details: {
        flex: 2,
        padding: 8,
    },
    detailsText: {
        fontSize: 13,
    },
    detailsGenres: {
        alignSelf: 'flex-start',
        flexDirection: 'row'
    },
    detailsGenresName: {

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
