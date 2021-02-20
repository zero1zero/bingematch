import React, {useEffect, useRef, useState} from 'react';

import {Animated, ImageBackground, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import Cards from "./swiper/Cards";

export interface Props {
}

const Deck : React.FC<Props> = (props) => {

    const queue = []

    fetch('http://192.168.64.2/api/queue/', {
        method: 'GET',
    }).then(r => {
        console.log(r.status)

    })
        // let deserialize = AllItems.decode()
        // let item : Item = allItems[0]
        // console.log(item.getId())
    // .then(bytes => {
    //     // let allItems = proto.queue.AllItems.deserializeBinary(Uint8Array.from(bytes))
    //     // console.log(allItems[0])
    // })

    // fetch('http://192.168.64.2/api/queue/', {
    //     method: 'GET',
    // }).then(r => {
    //     return r.blob()
    // }).then(blob => {
    //     let t = new TextEncoder()
    //     console.log(blob)
    //     // let item : proto.queue.Item = allItems[0]
    //     // console.log(item.getId())
    //     // return r.blob()
    // })
    //     .catch(e => {
    //         console.log(e)
    //     })
    // // .then(bytes => {
    // //     // let allItems = proto.queue.AllItems.deserializeBinary(Uint8Array.from(bytes))
    // //     // console.log(allItems[0])
    // // })


    const window = useWindowDimensions();
    const cardHeight = window.height * .9
    const cardWidth = window.width * .9

    const [status, setStatus] = useState("");
    const scale = useRef(new Animated.Value(1)).current;

    const update = (status, item, index) => {
        setStatus(status)
    }

    // removing any status
    useEffect(() => {
        setStatus("");
    }, []);
    return (
        <View style={styles.container}>
            <Cards
                items={queue}
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
                    console.log("done with items")
                    // hiding the status after one second of the final swipe
                    setTimeout(() => {
                        Animated.spring(scale, {
                            toValue: 0,
                            useNativeDriver: true,
                        }).start();
                    }, 1000);

                }}
                renderItem={(item) => (
                    <View style={{height: cardHeight, width: cardWidth, ...styles.box, ...styles.shadow}}>
                        <ImageBackground style={styles.image} source={{uri: item.pics[0]}}/>
                        <Text>{item.name}</Text>
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

