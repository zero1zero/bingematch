import React from "react";
import {KeyboardAvoidingView, SafeAreaView, View} from "react-native";
import {Button, StyleService, Text} from "@ui-kitten/components";
import {ImageOverlay} from "../etc/ImageOverlay";
import Social from "./components/Social";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import {BaseProps} from "../etc/BaseProps";
import Dependencies from "../Dependencies";

const SignUp : React.FC<BaseProps> = (props) => {

    const api = Dependencies.instance.api

    const emailRef = React.useRef<() => string | undefined>()
    const emailRefCallback = (verifyCheck: () => string | undefined) => {
        emailRef.current = verifyCheck
    }

    const passwordRef = React.useRef<() => string | undefined>()
    const passwordRefCallback = (verifyCheck: () => string | undefined) => {
        passwordRef.current = verifyCheck
    }

    const onSignUpButtonPress = (): void => {
        const email = emailRef.current()
        const password = passwordRef.current()

        if (!email || !password) {
            return
        }

        api.signup({
            email: email,
            password: password

        }).then(token => {
            props.navigation.navigate('Deck');
        })
    };

    const onLoginButtonPress = (): void => {
        props.navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <ImageOverlay
                style={{ flex: 1}}
                source={require('../assets/super.png')}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text
                            category='h1'
                            status='control'>
                            Sign Up
                        </Text>
                        <Text
                            category='s1'
                            status='control'>
                            Sign in to your account
                        </Text>
                    </View>
                    <View style={styles.formContainer}>
                        <EmailInput
                            checkCallback={emailRefCallback}/>
                        <PasswordInput
                            verify={true}
                            checkCallback={passwordRefCallback}/>
                        <Button
                            style={styles.signUpButton}
                            size='giant'
                            onPress={onSignUpButtonPress}>
                            SIGN UP
                        </Button>

                        <Social text={"Or Sign Up Using Social Media"}/>
                    </View>
                    <Button
                        style={styles.loginButton}
                        appearance='ghost'
                        status='control'
                        onPress={onLoginButtonPress}>
                        Already have account? Sign In
                    </Button>

                </SafeAreaView>
            </ImageOverlay>
        </KeyboardAvoidingView>
    )
}

const styles = StyleService.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 3,
        paddingHorizontal: 16,
    },
    signUpButton: {
        marginTop: 32,
        marginHorizontal: 16,
    },
    loginButton: {
        marginVertical: 12,
    },
});

export default SignUp
