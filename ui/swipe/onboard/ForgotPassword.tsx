import React from "react";
import {Icon, Text, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import {SafeAreaView} from "react-native";
import {BaseProps} from "../../App";

const ForgotPassword : React.FC<BaseProps> = (props) => {

    const BackIcon = (props) => (
        <Icon {...props} name='arrow-back'/>
    );

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => props.navigation.navigate('Login')}/>
    );

    return (
        <SafeAreaView>
            <TopNavigation accessoryLeft={BackAction} />
            <Text>Forgot password? too bad</Text>
        </SafeAreaView>
    )
}

export default ForgotPassword
