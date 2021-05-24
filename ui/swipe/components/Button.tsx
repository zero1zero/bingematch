import React from "react";
import {Pressable, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {BingeMatch} from "../theme";
// import Animated, {
//     Extrapolate,
//     interpolate,
//     useAnimatedStyle,
//     useSharedValue,
//     withSpring
// } from "react-native-reanimated";

interface Props {
    onPress : () => void,
    style? : ViewStyle
}

export const Button : React.FC<Props> = (props) => {

    // const liked = useSharedValue(0);
    //
    // const outlineStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [
    //             {
    //                 scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    //             },
    //         ],
    //     };
    // });

    const press = () => {
        // liked.value = withSpring(liked.value ? 0 : 1)
        props.onPress()
    }

    return (
        <Pressable
            style={{...style, ...props.style}}
            onPress={press}>
            {/*<Animated.View style={[outlineStyle]}>*/}
                {props.children}
            {/*</Animated.View>*/}
        </Pressable>
    )
}

const style : ViewStyle | TextStyle = {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
}
