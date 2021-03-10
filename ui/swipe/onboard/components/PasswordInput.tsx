import {StyleProp, TextStyle, View} from "react-native";
import React, {useEffect} from "react";
import {Input, StyleService, Text} from "@ui-kitten/components";
import {EvaStatus} from "@ui-kitten/components/devsupport";
import {PasswordIcon} from "../../etc/Icons";
import {InputState, StateChange, ValidationStatus} from "../OnboardEvents";

interface Props {
    style?: StyleProp<TextStyle>
    passwordState: InputState

    verifyState?: InputState
    addVerify?: boolean

    dispatch: React.Dispatch<StateChange>
}
const PasswordInput : React.FC<Props> = (props) => {

    const [passwordStatus, setPasswordStatus] = React.useState<EvaStatus>('control')
    const [verifyStatus, setVerifyStatus] = React.useState<string>('control')

    useEffect(() => {
        if (props.passwordState.validation.status == ValidationStatus.Verify) {
            passwordCheck()
            return
        }

        if (props.verifyState?.validation?.status == ValidationStatus.Verify) {
            verifyCheck()
            return
        }

    }, [props.passwordState, props.verifyState])

    const verifyCheck = () : boolean => {

        if (props.passwordState.value != props.verifyState.value) {
            setVerifyStatus('danger')
            props.dispatch({
                verify: { validation: { status: ValidationStatus.Invalid }},
                password: { validation: { message: 'Please double check the two password fields match' }} //message on password field
            })
            return false
        }

        setVerifyStatus('success')
        props.dispatch({
            verify: { validation: { status: ValidationStatus.Valid }},
            password: { validation: { message: '' }} //message on password field
        })

        return true
    }

    const passwordCheck = () : boolean => {
        //verify or not, we need a value
        if (!props.passwordState.value) {
            setPasswordStatus('danger')
            props.dispatch({ password: { validation: { status: ValidationStatus.Invalid, message: 'Please enter your password' }}})
            return false
        }

        //secure enough
        if (props.addVerify && props.passwordState.value.length < 8) {
            setPasswordStatus('danger')
            props.dispatch({ password: { validation: { status: ValidationStatus.Invalid, message: 'Your password needs to be at least 8 characters' }}})
            return false
        }

        setPasswordStatus('success')
        props.dispatch({ password: { validation: { status: ValidationStatus.Valid, message: '' }}})

        return true
    }

    const passwordInput = (
        <Input
            size='large'
            style={[props.style, styles]}
            onBlur={() => props.dispatch({ password: { validation: {status: ValidationStatus.Verify }}}) }
            status={passwordStatus}
            autoCapitalize='none'
            secureTextEntry={true}
            autoCompleteType='password'
            placeholder='Password'
            textContentType='newPassword'
            accessoryLeft={PasswordIcon}
            textStyle={{fontSize: 20}}
            value={props.passwordState.value}
            onChangeText={(value) => props.dispatch({ password: { value }})}
        />
)
    const passwordTooltip = (
        <Text
            style={{ textAlign: 'right', height: 20 }}
            status='danger'>
            {props.passwordState.validation.message}
        </Text>
    )

    const verifyInput = (
        <Input
            size='large'
            textStyle={{fontSize: 20}}
            onBlur={() => props.dispatch({ verify: { validation: {status: ValidationStatus.Verify }}}) }
            status={verifyStatus}
            autoCapitalize='none'
            secureTextEntry={true}
            accessoryLeft={PasswordIcon}
            autoCompleteType='password'
            placeholder='Verify Password'
            textContentType='newPassword'
            value={props.verifyState?.value}
            onChangeText={(value) => props.dispatch({ verify: { value }})}
        />
    )

    return props.addVerify ? (
        <View>
            {passwordTooltip}
            {passwordInput}
            {verifyInput}
        </View>
    ) : (
        <View>
            {passwordTooltip}
            {passwordInput}
        </View>
    )
}

const styles = StyleService.create({
})

export default PasswordInput
