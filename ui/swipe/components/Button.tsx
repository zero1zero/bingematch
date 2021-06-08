import React from "react";
import {TextStyle, TouchableOpacity, ViewStyle} from "react-native";

interface Props {
    onPress: () => void,
    style?: ViewStyle
}

export const Button: React.FC<Props> = (props) => {


    const press = () => {
        props.onPress()
    }

    return (
        <TouchableOpacity
            style={{...style, ...props.style}}
            onPress={press}>
            {props.children}
        </TouchableOpacity>
    )
}

const style: ViewStyle | TextStyle = {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
}
