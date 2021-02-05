import React, {useEffect, useRef, useState} from 'react';

import { Cards } from 'react-native-cards-swipr';
import {data} from "./data";
import {View, StyleSheet, Text, Animated, ImageBackground} from "react-native";

export interface Props {
}

const Deck : React.FC<Props> = (props) => {

    const [status, setstatus] = useState(null);
    const scale = useRef(new Animated.Value(1)).current;

    const cards = data

    // removing any status
    useEffect(() => {
        setstatus(null);
    }, []);
    return (
        <View style={styles.container}>
            <Cards
                items={data}
                showableCards={2}
                onSwipeUp={() => {
                    setstatus("LATER");
                }}
                onSwipeRight={() => {
                    setstatus("YES");
                }}
                onSwipeLeft={() => {
                    setstatus("NO");
                }}
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
                    cards.push(...data)
                    // hiding the status after one second of the final swipe
                    // setTimeout(() => {
                    //     Animated.spring(scale, {
                    //         toValue: 0,
                    //         useNativeDriver: true,
                    //     }).start();
                    // }, 1000);

                }}
                renderItem={(item) => (
                    <View style={[styles.box, styles.shadow]}>
                        <ImageBackground style={{ height: 300, width: 300 }} source={{uri: item.pics[0]}}>
                            <Text>{item.name}</Text>
                        </ImageBackground>
                    </View>
                )}
            />
            {status && (
                <Animated.Text
                    style={{
                        position: "absolute",
                        bottom: 50,
                        transform: [{ scale }],
                        fontSize: 40,
                    }}
                >
                    {status}
                </Animated.Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        height: 300,
        width: 300,
        backgroundColor: "tomato",
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

