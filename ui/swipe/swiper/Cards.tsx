import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Card from "./Card";

let offset = 0;

export interface Props {
    showableCards,
    items,
    renderItem,
    onSwipe,
    onSwipeUp,
    onSwipeDown,
    onSwipeRight,
    onSwipeLeft,
    onMoveStart,
    onDataEnd,
}
const Cards : React.FC<Props> = (props) => {

    const [currentCardIdx, setCurrentCardIdx] = useState(0);

    useEffect(() => {
        setCurrentCardIdx(0);
    }, []);

    return (
        <View>
            {props.items
                .slice(0, props.showableCards)
                .reverse()
                .map((item, index) => {
                    // initializing the index according to the showing cards number
                    index =
                        props.items.length >= props.showableCards
                            ? props.showableCards - index - 1
                            : props.items.length - index - 1;
                    return (
                        <Card
                            movable={currentCardIdx === index + offset}
                            onSwipe={() => {
                                props.items.shift();
                                offset++;
                                setCurrentCardIdx(currentCardIdx + 1);
                                if (props.onSwipe) {
                                    props.onSwipe();
                                }
                                if (props.onDataEnd && props.items.length === 0) {
                                    props.onDataEnd();
                                }
                            }}
                            cardStyles={{
                                ...(currentCardIdx !== index + offset
                                    ? { ...styles.card }
                                    : {}),
                            }}
                            onSwipeUp={props.onSwipeUp}
                            onSwipeDown={props.onSwipeDown}
                            onSwipeRight={props.onSwipeRight}
                            onSwipeLeft={props.onSwipeLeft}
                            onMoveStart={props.onMoveStart}
                            renderItem={props.renderItem}
                            item={item}
                            index={index + offset}
                            key={index + offset}
                        />
                    );
                })}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        position: "absolute",
        zIndex: -1,
    },
});

export default Cards;
