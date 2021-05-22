import React from "react";
import {Pressable, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {BingeMatch} from "../theme";

interface Props {
    onPress : () => void,
    style? : ViewStyle
}

export const Button : React.FC<Props> = (props) => {

    return (
        <Pressable
            style={{...style, ...props.style}}
            onPress={props.onPress}>
            {props.children}
        </Pressable>
    )
}

const style : ViewStyle | TextStyle = {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,

    ...BingeMatch.shadow
}
