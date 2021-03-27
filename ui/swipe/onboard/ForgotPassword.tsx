import React from "react";
import {SafeAreaView, Text} from "react-native";
import {BaseProps} from "../etc/BaseProps";

const ForgotPassword : React.FC<BaseProps> = (props) => {

    return (
        <SafeAreaView>
            {/*<TopNavigation accessoryLeft={BackAction} />*/}
            <Text>Forgot password? too bad</Text>
        </SafeAreaView>
    )
}

export default ForgotPassword
