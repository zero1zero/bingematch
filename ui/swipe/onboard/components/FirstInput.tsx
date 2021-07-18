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

export const FirstInput: React.FC<Props> = (props) => {

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
                placeholder='First'
                autoCorrect={false}
                autoCompleteType='name'
                textContentType='givenName'
                keyboardType='default'
                value={props.value}
                onBlur={() => props.dispatch({first: verify})}
                onChangeText={(value) => props.dispatch({first: {value: value}})}
            />
        </>
    )
}
