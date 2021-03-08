import {ImageBackground, StyleSheet, useWindowDimensions, View} from "react-native";
import {queue} from "../model/compiled";
import {Text} from "@ui-kitten/components";
import React from "react";
import {afterHeadInclusive, beforeHeadExclusive} from "./HeadUtils";
import {Event, Item, StateChange} from "./Event";
import Card from "./Card";


interface Props {
    items: Item[]
    dispatch: React.Dispatch<StateChange>
    head: string,
}

const Deck : React.FC<Props> = (props) => {

    const window = useWindowDimensions();
    const cardHeight = window.height * .78
    const cardWidth = window.width * .96

    const toCard = (item : Item) => (
        <Card
            item={item}
            key={item.data.id}
            dispatch={props.dispatch}>
            <View style={{...styles.card, width: cardWidth, height: cardHeight}}>
                <ImageBackground style={styles.image} source={{uri: `https://image.tmdb.org/t/p/w500${item.data.movie.posterPath}`}}/>
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
        borderRadius: 5,
        backgroundColor: "#FFF",
    },
    image: {
        flex: 7,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: 'hidden'
    },
    details: {
        flex: 2,
        padding: 8,
    },
    detailsText: {
        fontSize: 13,
    },
})
