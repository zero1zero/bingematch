import {ImageBackground, StyleSheet, useWindowDimensions, View} from "react-native";
import {Icon, Text} from "@ui-kitten/components";
import React from "react";
import {Item, StateChange} from "./QueueEvents";
import Card from "./Card";
import {ReportIcon} from "../etc/Icons";


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

    const window = useWindowDimensions();
    const cardHeight = window.height * .80
    const cardWidth = window.width * .94

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
                    <ReportIcon {...styles.reportIcon} />
                </ImageBackground>
                <View style={styles.details}>
                    {/*<Text category='h1'>{item.movie.title}</Text>*/}
                    <Text style={styles.detailsText} numberOfLines={4}>{item.data.movie.overview}</Text>
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
        flex: 10,

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
        flex: 11,//aspect ratio should be .666 for images
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
    reportIcon: {
        alignSelf: 'flex-end',
        margin: 5,
        width: 30,
        height: 30,
    },
})
