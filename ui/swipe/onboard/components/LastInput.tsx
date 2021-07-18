import React from "react";
import {Text, ViewStyle} from "react-native";
import {StateChange, verify} from "../SignUpReducer";
import {BingeMatch} from "../../theme";
import {Input} from "../../components/Input";


interface Props {
    style?: ViewStyle
    value: string
    message?: string

    dispatch: React.Dispatch<StateChange>
}

export const LastInput: React.FC<Props> = (props) => {

    const message = () => {
        if (props.message) {
            return <Text style={BingeMatch.form.message}>
                {props.message}
            </Text>
        }
    }

    return (
        <>
            {message()}

            <Input
                style={props.style}
                placeholder='Last'
                autoCorrect={false}
                autoCompleteType='name'
                textContentType='familyName'
                keyboardType='default'
                value={props.value}
                onBlur={() => props.dispatch({last: verify})}
                onChangeText={(value) => props.dispatch({last: {value: value}})}
            />
        </>
    )
}
