import {StyleSheet, View} from "react-native";
import {Button, Text} from "@ui-kitten/components";
import React from "react";
import {FacebookIcon, GoogleIcon, TwitterIcon} from "../../etc/Icons";

interface Props {
    text: string
}

const Social : React.FC<Props> = (props) => {
    return (
        <View style={styles.socialAuthContainer}>
            <Text
                style={styles.socialAuthHintText}
                status='control'>
                {props.text}
            </Text>
            <View style={styles.socialAuthButtonsContainer}>
                <Button
                    appearance='ghost'
                    status='control'
                    size='giant'
                    accessoryLeft={GoogleIcon}
                />
                <Button
                    appearance='ghost'
                    status='control'
                    size='giant'
                    accessoryLeft={FacebookIcon}
                />
                <Button
                    appearance='ghost'
                    status='control'
                    size='giant'
                    accessoryLeft={TwitterIcon}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    socialAuthContainer: {
        marginTop: 32,
    },
    socialAuthButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    socialAuthHintText: {
        alignSelf: 'center',
        marginBottom: 16,
    },

})

export default Social
