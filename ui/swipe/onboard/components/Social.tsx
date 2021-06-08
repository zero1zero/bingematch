import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {FacebookIcon, GoogleIcon, TwitterIcon} from "../../components/Icons";
import {Button} from "../../components/Button";
import {BingeMatch} from "../../theme";

interface Props {
    text: string
}

const Social: React.FC<Props> = (props) => {
    return (
        <View style={styles.socialAuthContainer}>
            <Text style={styles.socialAuthHintText}>
                {props.text}
            </Text>
            <View style={styles.socialAuthButtonsContainer}>
                <Button onPress={() => {
                }}>
                    <GoogleIcon style={BingeMatch.theme.onboard.social.icon} size={25}/>
                </Button>
                <Button onPress={() => {
                }}>
                    <FacebookIcon style={BingeMatch.theme.onboard.social.icon} size={25}/>
                </Button>
                <Button onPress={() => {
                }}>
                    <TwitterIcon style={BingeMatch.theme.onboard.social.icon} size={25}/>
                </Button>
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

        ...BingeMatch.theme.onboard.social.title
    },

})

export default Social
