import React from "react";
import {Text, ViewStyle} from "react-native";
import {StateChange, verify} from "../SignUpReducer";
import {BingeMatch} from "../../theme";
import {Input} from "../../components/Input";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";


interface Props {
    style?: ViewStyle
    value: string
    message?: string

    dispatch: React.Dispatch<StateChange>
}

export const EmailInput: React.FC<Props> = (props) => {

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
                icon={faEnvelope}
                onBlur={() => props.dispatch({email: verify})}
                autoCapitalize='none'
                placeholder='Email'
                autoCorrect={false}
                autoCompleteType='username'
                textContentType='emailAddress'
                keyboardType='email-address'
                value={props.value}
                onChangeText={(value) => props.dispatch({email: {value: value}})}
            />
        </>
    )
}
