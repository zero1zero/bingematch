import React from "react";
import {Input, Text} from "@ui-kitten/components";
import {StyleProp, TextStyle, View} from "react-native";
import {EvaStatus} from "@ui-kitten/components/devsupport";
import {EmailIcon} from "../../etc/Icons";

const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

interface Props {
    style?: StyleProp<TextStyle>;
    value: string;
    onValidChange: (valid: boolean) => void;
    onTextChange: (email: string) => void;

}
const EmailInput : React.FC<Props> = (props) => {

    const [value, doSetValue] = React.useState<string>(props.value)
    const [showMsg, setShowMsg] = React.useState<boolean>()
    const [status, setStatus] = React.useState<EvaStatus>('control')

    const setValue = (email : string) => {
        doSetValue(email)
        props.onTextChange(email)
    }

    const emailCheck = () => {
        if (!value || value.length < 3 || !emailRegex.test(value)) {
            setShowMsg(true)
            setStatus('danger')
            props.onValidChange(false)
        } else {
            setShowMsg(false)
            setStatus('control')
            props.onValidChange(true)
        }
    }

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

export default EmailInput
