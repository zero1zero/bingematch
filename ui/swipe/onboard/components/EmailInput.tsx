import React, {useEffect} from "react";
import {Input, StyleService, Text} from "@ui-kitten/components";
import {StyleProp, TextStyle, View} from "react-native";
import {EvaStatus} from "@ui-kitten/components/devsupport";
import {EmailIcon} from "../../etc/Icons";
import {InputState, StateChange, ValidationStatus} from "../OnboardEvents";

const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

interface Props {
    style?: StyleProp<TextStyle>
    state: InputState

    dispatch: React.Dispatch<StateChange>
}
const EmailInput : React.FC<Props> = (props) => {

    const [status, setStatus] = React.useState<EvaStatus>('control')

    useEffect(() => {
        if (props.state.validation.status != ValidationStatus.Verify) {
            return
        }

        const email = props.state.value

        if (!email || email.length < 3 || !emailRegex.test(email)) {
            setStatus('danger')
            props.dispatch({ email: {
                    validation: {
                        status: ValidationStatus.Invalid,
                        message: 'Please enter a valid email'
                    }}})
            return
        }

        setStatus('success')
        props.dispatch({ email: { validation: { status: ValidationStatus.Valid, message: '' }}})
    }, [props.state])

    return (
        <View>
            <Text
                style={{ textAlign: 'right', height: 20 }}
                status='danger'>
                {props.state.validation.message}
            </Text>
            <Input
                size='large'
                textStyle={{fontSize: 20}}
                onBlur={() => props.dispatch({ email: { validation: { status: ValidationStatus.Verify }}})}
                style={props.style}
                status={status}
                autoCapitalize='none'
                placeholder='Email'
                autoCorrect={false}
                autoCompleteType='username'
                textContentType='emailAddress'
                keyboardType='email-address'
                accessoryLeft={EmailIcon}
                value={props.state.value}
                onChangeText={(value) => props.dispatch({ email: { value }})}
            />
        </View>
)
}

const styles = StyleService.create({
})

export default EmailInput
