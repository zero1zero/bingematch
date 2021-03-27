import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {FacebookIcon, GoogleIcon, TwitterIcon} from "../../etc/Icons";
import {Button} from "../../components/Button";

interface Props {
    text: string
}

const Social : React.FC<Props> = (props) => {
    return (
        <View style={styles.socialAuthContainer}>
            <Text style={styles.socialAuthHintText}>
                {props.text}
            </Text>
            <View style={styles.socialAuthButtonsContainer}>
                <Button onPress={() => {}}>
                    <GoogleIcon color='#fff' size={25} />
                </Button>
                <Button onPress={() => {}}>
                    <FacebookIcon color='#fff' size={25} />
                </Button>
                <Button onPress={() => {}}>
                    <TwitterIcon color='#fff' size={25} />
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
        color: '#fff'
    },

})

export default Social
