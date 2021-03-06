import React, {useEffect, useRef} from "react";
import {
    Animated,
    Easing,
    GestureResponderEvent,
    PanResponder,
    PanResponderGestureState,
    useWindowDimensions
} from "react-native";
import {queue} from "../model/compiled";

export interface Props {
    onSwipe: (action : SwipeAction) => void,
    item: queue.IItem,
    swipes: SwipeAction[]
}

export enum Action{
    Like, Dislike, Love, Hate, Back
}

export interface SwipeAction {
    action: Action
    item: queue.IItem
    where: 'onscreen' | 'offscreen'
}

const Card : React.FC<Props> = (props) => {
    const card = useRef(new Animated.ValueXY()).current;
    const scale = useRef(new Animated.Value(1)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const left = useRef(new Animated.Value(0)).current;
    const right = useRef(new Animated.Value(0)).current;

    const window = useWindowDimensions();
    const WIDTH_HALF = window.width / 2;
    const HEIGHT_HALF = window.height / 2;
    const moved = (evt : GestureResponderEvent, gestureState : PanResponderGestureState) => {
        return Math.abs(gestureState.dx) >= 1 || Math.abs(gestureState.dy) >= 1
    }

    const triggerSwipe = (action : Action) => {
        props.onSwipe({
            action,
            item: props.item,
            where: 'offscreen'
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
                // whenever the touch starts it will scale the card to 1.2 value
                Animated.spring(scale, {
                    toValue: 1.05,
                    useNativeDriver: true,
                }).start();
                // if (props.onMoveStart) {
                //     props.onMoveStart(item);
                // }
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
                    }).start();
                    setTimeout(() => triggerSwipe(Action.Like), 200, props)
                    // left
                } else if (value < -1) {
                    Animated.spring(card, {
                        toValue: {
                            x: -WIDTH_HALF * 2,
                            y: 0,
                        },
                        useNativeDriver: true,
                    }).start();
                    setTimeout(() => triggerSwipe(Action.Dislike), 200, props)
                    // up
                } else if (upValue < -1) {
                    Animated.spring(card, {
                        toValue: {
                            x: 0,
                            y: HEIGHT_HALF * -2,
                        },
                        useNativeDriver: true,
                    }).start();
                    setTimeout(() => triggerSwipe(Action.Love), 200, props)
                    // down
                } else if (upValue > 1) {
                    Animated.spring(card, {
                        toValue: {
                            x: 0,
                            y: HEIGHT_HALF * 2,
                        },
                        useNativeDriver: true,
                    }).start();
                    setTimeout(() => triggerSwipe(Action.Hate), 200, props)
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

    const throwitXYs : Map<Action, Animated.ValueXY> = new Map([
        [Action.Dislike, new Animated.ValueXY({
            x: -WIDTH_HALF * 3,
            y: -HEIGHT_HALF * .15
        })],
        // [Action.Back, new Animated.Value(1)],
        [Action.Like, new Animated.ValueXY({
            x: WIDTH_HALF * 3,
            y: -HEIGHT_HALF * .15
        })],
        // [Action.Love, new Animated.Value(1)],
    ]);
    const throwitRotates : Map<Action, Animated.Value> = new Map([
        [Action.Dislike, new Animated.Value(-.10)],
        // [Action.Back, new Animated.Value(1)],
        [Action.Like, new Animated.Value(.10)],
        // [Action.Love, new Animated.Value(1)],
    ]);

    const throwit = (action : Action) => {
        Animated.parallel([
            Animated.timing(scale, {
                toValue: 1.1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(rotate, {
                toValue: throwitRotates.get(action),
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(card, {
                toValue: throwitXYs.get(action),
                easing: Easing.back(1),
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start()
    }

    useEffect(() => {
        props.swipes.forEach(swipe => {
            if (swipe.where == 'onscreen' && swipe.item.id == props.item.id) {
                throwit(swipe.action)

                setTimeout(() => triggerSwipe(swipe.action), 400, props)
            }
        })
    }, [props.swipes])

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
            {/*<View style={{*/}
            {/*    position: 'absolute',*/}
            {/*    left: 100,*/}
            {/*    top: 100*/}
            {/*}}>*/}
            {/*    <Button title="THROW ME" onPress={teerow} />*/}
            {/*</View>*/}
        </Animated.View>
    );
}

export default Card;
