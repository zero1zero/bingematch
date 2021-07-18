import React from "react";
import {SafeAreaView, Text} from "react-native";
import {BaseNavigationProps} from "../etc/BaseNavigationProps";

export const ForgotPassword: React.FC<BaseNavigationProps<'ForgotPassword'>> = (props) => {

    return (
        <SafeAreaView>
            {/*<TopNavigation accessoryLeft={BackAction} />*/}
            <Text>Forgot password? too bad</Text>
        </SafeAreaView>
    )
}
