import {StyleProp, TextStyle, View} from "react-native";
import React from "react";
import {Input, StyleService, Text} from "@ui-kitten/components";
import {EvaStatus} from "@ui-kitten/components/devsupport";
import {PasswordIcon} from "../../etc/Icons";

const validMsg = ' '

interface Props {
    style?: StyleProp<TextStyle>;
    value: string;
    verify: boolean;

    onValidChange: (valid: boolean) => void;
    onTextChange: (email: string) => void;
}
const PasswordInput : React.FC<Props> = (props) => {

    const [password, doSetPassword] = React.useState<string>(props.value)
    const [passwordValid, setPasswordValid] = React.useState<boolean>(false)
    const [passwordMsg, setPasswordMsg] = React.useState<string>(validMsg)
    const [passwordStatus, setPasswordStatus] = React.useState<EvaStatus>('control')

    const [verify, setVerify] = React.useState<string>(props.value)
    const [verifyStatus, setVerifyStatus] = React.useState<string>('control')

    const setPassword = (password : string) => {
        doSetPassword(password)
        props.onTextChange(password)
    }

    const verifyCheck = () => {
        //wait for valid password first
        if (!passwordValid) {
            return
        }

        if (password != verify) {
            setPasswordMsg('Please double check the two password fields match')
            setVerifyStatus('danger')
            props.onValidChange(false)
            return
        }

        setPasswordMsg(validMsg)
        setVerifyStatus('control')
        props.onValidChange(true)
    }

    const passwordCheck = () => {
        //verify or not, we need a value
        if (!password) {
            setPasswordMsg('Please enter your password')
            setPasswordStatus('danger')
            props.onValidChange(false)
            setPasswordValid(false)
            return
        }

        //rest is for verify, i.e. new signups and password edits
        if (props.verify) {
            //secure enough
            if (!password || password.length < 8) {
                setPasswordMsg('Your password needs to be at least 8 characters')
                setPasswordStatus('danger')
                props.onValidChange(false)
                setPasswordValid(false)
                return
            }
        }

        //we're good
        setPasswordMsg(validMsg)
        setPasswordStatus('control')
        props.onValidChange(true)
        setPasswordValid(true)
    }
    const passwordInput = () => (
        <Input
            size='large'
            style={[props.style, styles]}
            onBlur={passwordCheck}
            status={passwordStatus}
            autoCapitalize='none'
            secureTextEntry={true}
            autoCompleteType='password'
            placeholder='Password'
            textContentType='newPassword'
            accessoryLeft={PasswordIcon}
            textStyle={{fontSize: 20}}
            value={password}
            onChangeText={setPassword}
        />
)
    const passwordTooltip = () => (
        <Text
            style={{ textAlign: 'right'}}
            status='danger'>
            {passwordMsg}
        </Text>
    )

    const verifyInput = () => (
        <Input
            size='large'
            textStyle={{fontSize: 20}}
            onBlur={verifyCheck}
            status={verifyStatus}
            autoCapitalize='none'
            secureTextEntry={true}
            accessoryLeft={PasswordIcon}
            autoCompleteType='password'
            placeholder='Verify Password'
            textContentType='newPassword'
            value={verify}
            onChangeText={setVerify}
        />
    )

    return props.verify ? (
        <View>
            {passwordTooltip()}
            {passwordInput()}
            {verifyInput()}
        </View>
    ) : (
        <View>
            {passwordTooltip()}
            {passwordInput()}
        </View>
    )
}

const styles = StyleService.create({
})

export default PasswordInput
