import React, {useRef} from "react";
import {Animated, PanResponder, useWindowDimensions} from "react-native";

export interface Props {
    movable,
    onSwipe,
    cardStyles,
    item,
    index,
    renderItem,
    onSwipeRight,
    onSwipeLeft,
    onSwipeUp,
    onSwipeDown,
    onMoveStart,
}

let triggerRightSwipe = (props : Props) => {
    props.onSwipe(props.item, props.index);
    if (props.onSwipeRight) {
        props.onSwipeRight(props.item, props.index);
    }
}

let triggerLeftSwipe = (props : Props) => {
    props.onSwipe(props.item, props.index);
    if (props.onSwipeLeft) {
        props.onSwipeLeft(props.item, props.index);
    }
}

let triggerUpSwipe = (props : Props) => {
    props.onSwipe(props.item, props.index);
    if (props.onSwipeUp) {
        props.onSwipeUp(props.item, props.index);
    }
}

let triggerDownSwipe = (props : Props) => {
    props.onSwipe(props.item, props.index);
    if (props.onSwipeDown) {
        props.onSwipeDown(props.item, props.index);
    }
}

const Card : React.FC<Props> = (props) => {
    if (!props.movable) {
        return (
            <Animated.View style={props.cardStyles}>
                {props.renderItem(props.item, props.index)}
            </Animated.View>
        );
    }

    const card = useRef(new Animated.ValueXY()).current;
    const scale = useRef(new Animated.Value(1)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const left = useRef(new Animated.Value(0)).current;
    const right = useRef(new Animated.Value(0)).current;

    const window = useWindowDimensions();
    const WIDTH_HALF = window.width / 2;
    const HEIGHT_HALF = window.height / 2;

    const panResponder = useRef(
        PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // whenever the touch starts it will scale the card to 1.2 value
                Animated.spring(scale, {
                    toValue: 1.2,
                    useNativeDriver: true,
                }).start();
                if (props.onMoveStart) {
                    props.onMoveStart();
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                // whenever the touch moves it sets the card position depending
                // on the change on x and y
                card.setValue({
                    x: gestureState.dx,
                    y: gestureState.dy,
                });
                // and it also sets the rotation value
                rotate.setValue(gestureState.dx * (1 / WIDTH_HALF));

                const value = (gestureState.dx / WIDTH_HALF) * 2;
                if (gestureState.dx > 0) {
                    right.setValue(value > 1 ? 1 : value);
                    left.setValue(0);
                } else {
                    left.setValue(value < -1 ? 1 : value * -1);
                    right.setValue(0);
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // whenever the touch is released it will get everything back to the starting point
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start();
                Animated.spring(rotate, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();

                Animated.spring(left, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
                Animated.spring(right, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();

                // if the card was in a place that is right or left or up it will swipe it
                // in that place, the more the number that is multiplied by
                // (gestureState.dx / WIDTH_HALF) the shorter the distance between the card and
                // its swipe position and the less it becomes the more the distance between the
                // card and its swipe position.
                const value = (gestureState.dx / WIDTH_HALF) * 2;
                const upValue = (gestureState.dy / HEIGHT_HALF) * 2;
                // right
                if (value > 1) {
                    Animated.spring(card, {
                        toValue: {
                            x: WIDTH_HALF * 2,
                            y: 0,
                        },
                        useNativeDriver: true,
                    }).start();
                    setTimeout(triggerRightSwipe, 200, props)
                    // left
                } else if (value < -1) {
                    Animated.spring(card, {
                        toValue: {
                            x: -WIDTH_HALF * 2,
                            y: 0,
                        },
                        useNativeDriver: true,
                    }).start();
                    setTimeout(triggerLeftSwipe, 200, props)
                    // up
                } else if (upValue < -1) {
                    Animated.spring(card, {
                        toValue: {
                            x: 0,
                            y: HEIGHT_HALF * -2,
                        },
                        useNativeDriver: true,
                    }).start();
                    setTimeout(triggerUpSwipe, 200, props)
                    // down
                } else if (upValue > 1) {
                    Animated.spring(card, {
                        toValue: {
                            x: 0,
                            y: HEIGHT_HALF * 2,
                        },
                        useNativeDriver: true,
                    }).start();
                    setTimeout(triggerDownSwipe, 200, props)
                    // the card didn't reach its swipe position
                } else {
                    Animated.spring(card, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true,
                    }).start();
                }
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        })
    ).current;

    return (
        <Animated.View
            style={{
                ...props.cardStyles,
                transform: [
                    { scale },
                    { translateX: card.x },
                    { translateY: card.y },
                    { rotateZ: rotate },
                ],
            }}
            {...panResponder.panHandlers}
        >
            {props.renderItem(props.item, props.index)}
        </Animated.View>
    );
}

export default Card;
