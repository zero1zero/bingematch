import {ColorValue, StyleProp, TextStyle} from "react-native";
import React from "react";
import {StateChange, verify} from "../UserReducer";
import {Input} from "../../components/Input";
import {faLock} from "@fortawesome/free-solid-svg-icons";

interface Props {
    style?: StyleProp<TextStyle>
    value?: string

    dispatch: React.Dispatch<StateChange>
}

export const VerifyInput: React.FC<Props> = (props) => {

    return (
        <Input
            icon={faLock}
            onBlur={() => props.dispatch({verify})}
            autoCapitalize='none'
            clearTextOnFocus={true}
            secureTextEntry={true}
            autoCompleteType='password'
            placeholder='Verify'
            textContentType='password'
            value={props.value}
            onChangeText={(value) => props.dispatch({verify: {value}})}
        />
    )
}
