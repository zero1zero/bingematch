import React, {ReactNode, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import Card from "./Card";
import {queue} from "../model/compiled";

let offset = 0;

export interface Props {
    showableCards,
    items : queue.IItem[],
    renderItem : (item : queue.IItem, index : number) => ReactNode,
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
        <>
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
        </>
    );
};

export default Cards;
