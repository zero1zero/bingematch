import React, {useEffect, useRef, useState} from 'react';

import {Animated, ImageBackground, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import Cards from "./swiper/Cards";
import Api from "./api/api";
import {queue} from "./model/compiled";
import {act} from "react-dom/test-utils";

export interface Props {
}

const Deck : React.FC<Props> = (props) => {

    const [activeQueue, setActiveQueue] = useState(new queue.AllItems())

    const api = new Api()

    const window = useWindowDimensions();
    const cardHeight = window.height * .9
    const cardWidth = window.width * .9

    const [status, setStatus] = useState("");
    const scale = useRef(new Animated.Value(1)).current;

    const update = (status, item, index) => {
        setStatus(status)
    }

    const hydrate = () => {
        api.popular().then(items => {
            setActiveQueue(items)
        })
    }
    // removing any status
    useEffect(() => {
        setStatus("");
        hydrate()

    }, []);
    return (
        <View style={styles.container}>
            <Cards
                items={activeQueue.items}
                showableCards={5}
                onMoveStart={() => {}}
                onSwipeUp={(item, index) => update("up", item, index)}
                onSwipeDown={(item, index) => update("down", item, index)}
                onSwipeRight={(item, index) => update("right", item, index)}
                onSwipeLeft={(item, index) => update("left", item, index)}
                onSwipe={() => {
                    // whenever a swipe happens a bounce animation will happen to the status text
                    Animated.sequence([
                        Animated.timing(scale, {
                            toValue: 1.4,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                        Animated.spring(scale, {
                            toValue: 1,
                            useNativeDriver: true,
                        }),
                    ]).start();
                }}
                onDataEnd={() => {
                    hydrate()
                    console.log("done with items")
                    // hiding the status after one second of the final swipe
                    setTimeout(() => {
                        Animated.spring(scale, {
                            toValue: 0,
                            useNativeDriver: true,
                        }).start();
                    }, 1000);

                }}
                renderItem={(item : queue.IItem) => (
                    <View style={{height: cardHeight, width: cardWidth, ...styles.box, ...styles.shadow}}>
                        <ImageBackground style={styles.image} source={{uri: `https://image.tmdb.org/t/p/w500${item.movie.posterPath}`}}/>
                        <Text>{item.movie.title}</Text>
                    </View>
                )}
            />
            <Animated.Text
                style={{
                    position: "absolute",
                    bottom: 50,
                    transform: [{ scale }],
                    fontSize: 40,
                }}>
                {status}
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end"
    },
    box: {
        backgroundColor: "#d58888",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});

export default Deck;

