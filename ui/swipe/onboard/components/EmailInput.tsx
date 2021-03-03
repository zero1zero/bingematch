import React from "react";
import {Input, StyleService, Text} from "@ui-kitten/components";
import {StyleProp, TextStyle, View} from "react-native";
import {EvaStatus} from "@ui-kitten/components/devsupport";
import {EmailIcon} from "../../etc/Icons";

const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

interface Props {
    style?: StyleProp<TextStyle>
    value?: string

    checkCallback: ((verifyCheck: () => string | undefined) => void)
}
const EmailInput : React.FC<Props> = (props) => {

    const [value, setValue] = React.useState<string>(props.value)
    const [showMsg, setShowMsg] = React.useState<boolean>()
    const [status, setStatus] = React.useState<EvaStatus>('control')

    const emailCheck = () : string | undefined => {
        if (!value || value.length < 3 || !emailRegex.test(value)) {
            setShowMsg(true)
            setStatus('danger')
            return undefined
        } else {
            setShowMsg(false)
            setStatus('control')
            return value
        }
    }

    props.checkCallback(emailCheck)

    return (
        <View>
            <Text
                style={{ textAlign: 'right'}}
                status='danger'>
                {showMsg ? 'Please enter a valid email' : ' '}
            </Text>
            <Input
                size='large'
                textStyle={{fontSize: 20}}
                onBlur={emailCheck}
                style={props.style}
                status={status}
                autoCapitalize='none'
                placeholder='Email'
                autoCorrect={false}
                autoCompleteType='username'
                textContentType='emailAddress'
                keyboardType='email-address'
                accessoryLeft={EmailIcon}
                value={value}
                onChangeText={setValue}
            />
        </View>
)
}

const styles = StyleService.create({
})

export default EmailInput
