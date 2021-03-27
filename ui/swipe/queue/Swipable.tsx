import React, {useEffect, useRef} from "react";
import {
    Animated,
    Easing,
    EasingFunction,
    GestureResponderEvent,
    PanResponder,
    PanResponderGestureState,
    useWindowDimensions
} from "react-native";
import {InteractionName, Item, Sentiment, StateChange} from "./QueueEvents";

export interface Props {
    item: Item,
    dispatch: React.Dispatch<StateChange>,
}

interface AnimValues {
    scale: number
    xy: { x: number, y: number },
    rotate: number
    easing: EasingFunction
}

const Swipable : React.FC<Props> = (props) => {
    const window = useWindowDimensions();
    const WIDTH_HALF = window.width / 2;
    const HEIGHT_HALF = window.height / 2;

    const animValues : Map<Sentiment, AnimValues> = new Map([
        [Sentiment.Dislike, {
            scale: 1.05,
            xy: {
                x: -WIDTH_HALF * 2.5,
                y: 0
            },
            rotate: -.10,
            easing: Easing.in(Easing.back(1))
        }],
        [Sentiment.Like, {
            scale: 1.05,
            xy: {
                x: WIDTH_HALF * 2.5,
                y: 0
            },
            rotate: .10,
            easing: Easing.in(Easing.back(1))
        }],
        [Sentiment.Love, {
            scale: 1.05,
            xy: {
                x: 0,
                y: -HEIGHT_HALF * 2.5,
            },
            rotate: 0,
            easing: Easing.in(Easing.back(1))
        }],
        [Sentiment.Hate, {
            scale: 1.05,
            xy: {
                x: 0,
                y: HEIGHT_HALF * 2.5,
            },
            rotate: 0,
            easing: Easing.in(Easing.back(1))
        }],

        [Sentiment.Unknown, {
            scale: 1,
            xy: {
                x: 0,
                y: 0
            },
            rotate: 0,
            easing: Easing.out(Easing.back(1))
        }],
    ])

    const card = useRef(new Animated.ValueXY()).current;
    const scale = useRef(new Animated.Value(1)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const left = useRef(new Animated.Value(0)).current;
    const right = useRef(new Animated.Value(0)).current;

    const moved = (evt : GestureResponderEvent, gestureState : PanResponderGestureState) => {
        return Math.abs(gestureState.dx) >= 1 || Math.abs(gestureState.dy) >= 1
    }

    const triggerSwipe = (action : InteractionName) => {
        props.dispatch({
            setOffscreen: props.item.data.id,
            interaction: {
                name: action,
                item: props.item
            }
        })
    }

    const panResponder = useRef(
        PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: moved,
            onStartShouldSetPanResponderCapture: moved,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                // whenever the touch starts it will scale the card
                Animated.spring(scale, {
                    toValue: animValues.get(Sentiment.Like).scale,
                    useNativeDriver: true,
                }).start();
            },
            onPanResponderMove: (evt, gestureState) => {
                // whenever the touch moves it sets the card position depending
                // on the change on x and y
                card.setValue({
                    x: gestureState.dx,
                    y: gestureState.dy,
                });
                // and it also sets the rotation value
                rotate.setValue(gestureState.dx * (.1 / WIDTH_HALF));

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
                    }).start()
                    setTimeout(() => triggerSwipe(InteractionName.SwipeLike), 200, props)
                    // left
                } else if (value < -1) {
                    Animated.spring(card, {
                        toValue: {
                            x: -WIDTH_HALF * 2,
                            y: 0,
                        },
                        useNativeDriver: true,
                    }).start();
                    setTimeout(() => triggerSwipe(InteractionName.SwipeDislike), 200, props)
                    // up
                } else if (upValue < -1) {
                    Animated.spring(card, {
                        toValue: {
                            x: 0,
                            y: HEIGHT_HALF * -2,
                        },
                        useNativeDriver: true,
                    }).start();
                    setTimeout(() => triggerSwipe(InteractionName.SwipeLove), 200, props)
                    // down
                } else if (upValue > 1) {
                    Animated.spring(card, {
                        toValue: {
                            x: 0,
                            y: HEIGHT_HALF * 2,
                        },
                        useNativeDriver: true,
                    }).start();
                    setTimeout(() => triggerSwipe(InteractionName.SwipeHate), 200, props)
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

    const throwit = (animations: AnimValues) => {
        Animated.parallel([
            Animated.timing(scale, {
                toValue: animations.scale,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(card, {
                toValue: animations.xy,
                easing: animations.easing,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(rotate, {
                toValue: animations.rotate,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start()
    }

    useEffect(() => {

        const anims = animValues.get(props.item.sentiment)

        //unscaled with a sentiment means there must have been a like/dislike button press
        if (props.item.sentiment != Sentiment.Unknown && props.item.onscreen) {
            switch (props.item.sentiment) {
                case Sentiment.Like:
                case Sentiment.Dislike:
                    throwit(anims)
                    break;
            }
            setTimeout(() => {
                props.dispatch({
                    setOffscreen: props.item.data.id,
                    advanceHead: props.item.data.id
                })
            }, 300)

            return
        }

        //off screen but with no sentiment means back button!
        if (props.item.sentiment == Sentiment.Unknown && !props.item.onscreen) {

            throwit(anims)

            // after timeout, regress head
            setTimeout(() => {
                props.dispatch({
                    setOnscreen: props.item.data.id,
                    regressHead: props.item.data.id
                })
            }, 300)
            return
        }

        if (props.item.sentiment != Sentiment.Unknown) {
            scale.setValue(anims.scale)
            card.setValue(anims.xy)
            rotate.setValue(anims.rotate)
        }

    }, [props.item])

    return (
        <Animated.View
            style={{
                transform: [
                    { scale },
                    { translateX: card.x },
                    { translateY: card.y },
                    { rotateZ: rotate },
                ],
            }}
            {...panResponder.panHandlers}
        >
            {props.children}
        </Animated.View>
    );
}

export default Swipable;
