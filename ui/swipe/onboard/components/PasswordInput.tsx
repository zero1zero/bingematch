import {Text, ViewStyle} from "react-native";
import React from "react";
import {StateChange, verify} from "../SignUpReducer";
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
                icon={faLock}
                onBlur={() => props.dispatch({password: verify})}
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
