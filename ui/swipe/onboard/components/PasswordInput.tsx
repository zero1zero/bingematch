import {ColorValue, Text, ViewStyle} from "react-native";
import React from "react";
import {StateChange, ValidationStatus} from "../UserReducer";
import {Input} from "../../components/Input";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {BingeMatch} from "../../theme";

interface Props {
    style?: ViewStyle
    value?: string
    message?: string

    dispatch: React.Dispatch<StateChange>
}

export const PasswordInput: React.FC<Props> = (props) => {

    return (
        <>
            <Text style={BingeMatch.form.message}>
                {props.message}
            </Text>

            <Input
                style={props.style}
                icon={faLock}
                onBlur={() => props.dispatch({password: {validation: {status: ValidationStatus.Verify}}})}
                clearTextOnFocus={true}
                autoCapitalize='none'
                secureTextEntry={true}
                autoCompleteType='password'
                placeholder='Password'
                textContentType='newPassword'
                value={props.value}
                onChangeText={(value) => props.dispatch({password: {value}})}
            />
        </>
    )
}
