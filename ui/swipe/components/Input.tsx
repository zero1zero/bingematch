import React from "react";
import {StyleSheet, TextInput, TextInputProps, View, ViewStyle} from "react-native";
import {BingeMatch} from "../theme";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

interface Props extends TextInputProps {
    style?: ViewStyle
    icon?: IconDefinition
}

export const Input: React.FC<Props> = (props) => {

    return (
        <View style={styles.container}>
            <FontAwesomeIcon style={styles.icon}
                             size={20}
                             icon={props.icon}/>
            <TextInput
                {...props}
                style={{
                    ...props.style,
                    ...styles.input,
                }}
                placeholderTextColor={BingeMatch.theme.button.placeholder}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},

    icon: {
        position: 'absolute',
        top: 15,
        left: 15,

        // @ts-ignore
        ...BingeMatch.theme.input.icon
    },

    input: {
        height: 50,
        paddingLeft: 45,
        borderRadius: 12,
        borderWidth: 1,
        padding: 12,

        ...BingeMatch.theme.input.field
    }
})

