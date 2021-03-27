import React from "react";
import {ColorValue, StyleSheet, TextInput, TextInputProps, View, ViewStyle} from "react-native";
import {BingeMatch} from "../theme";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

interface Props extends TextInputProps {
    style? : ViewStyle
    outline? : ColorValue
    icon? : IconDefinition
}

export const Input : React.FC<Props> = (props) => {

    const border = props.outline ? props.outline : 'white'

    return (
        <View style={styles.container}>
            <FontAwesomeIcon style={styles.icon}
                             size={20}
                             color='#fff'
                             icon={props.icon} />
            <TextInput
                {...props}
                style={{
                    ...props.style,
                    ...styles.input,
                    borderColor: border
                }}
                placeholderTextColor='#ffffffB3'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },

    icon: {
        position: 'absolute',
        top: 15,
        left: 15,
    },

    input: {
        height: 50,
        paddingLeft: 45,
        borderRadius: 4,
        backgroundColor: '#ffffff40',
        borderColor: '#fff',
        color: '#fff',
        borderWidth: 1,
        padding: 12,
        fontSize: 18,

        ...BingeMatch.shadow
    }
})

