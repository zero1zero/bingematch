import React from "react";
import {BaseNavigationProps} from "../etc/BaseNavigationProps";
import {Text, View} from "react-native";

export const DrawerContent: React.FC<BaseNavigationProps<'Drawer'>> = (props) => {

    return (
        <View style={{width: '50%'}}>
            <Text>Whatever</Text>
        </View>
    )
}
