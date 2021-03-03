import React from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import {ImageOverlay} from '../etc/ImageOverlay';
import Social from "./components/Social";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import {BaseProps} from "../etc/BaseProps";
import Dependencies from "../Dependencies";

const Login : React.FC<BaseProps> = (props) => {

    const api = Dependencies.instance.api

    const emailRef = React.useRef<() => string | undefined>()
    const emailRefCallback = (verifyCheck: () => string | undefined) => {
        emailRef.current = verifyCheck
    }

    const passwordRef = React.useRef<() => string | undefined>()
    const passwordRefCallback = (verifyCheck: () => string | undefined) => {
        passwordRef.current = verifyCheck
    }

    const onLoginButtonPress = () : void => {
        const email = emailRef.current()
        const password = passwordRef.current()

        if (!email || !password) {
            return
        }

        api.login({
            email: email,
            password: password
        }).then(token => {
            props.navigation.navigate('Deck');
        })
    };

    const onSignUpButtonPress = (): void => {
        props.navigation.navigate('SignUp');
    };

    const onForgotPasswordButtonPress = (): void => {
        props.navigation.navigate('ForgotPassword');
    };

    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <ImageOverlay
                style={{ flex: 1}}
                source={require('../assets/image-background.jpg')}>
                <SafeAreaView
                    style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text
                            category='h1'
                            status='control'>
                            BingeMatch
                        </Text>
                        <Text
                            style={styles.loginLabel}
                            category='s1'
                            status='control'>
                            Sign in to your account
                        </Text>
                    </View>
                    <View style={styles.formContainer}>
                        <EmailInput
                            checkCallback={emailRefCallback}/>
                        <PasswordInput
                            verify={false}
                            checkCallback={passwordRefCallback}/>

                        <View style={styles.forgotPasswordContainer}>
                            <Button
                                style={styles.forgotPasswordButton}
                                appearance='ghost'
                                status='control'
                                onPress={onForgotPasswordButtonPress}>
                                Forgot your password?
                            </Button>
                        </View>
                        <Button
                            style={styles.loginButton}
                            size='giant'
                            testID='login'
                            onPress={onLoginButtonPress}>
                            SIGN IN
                        </Button>

                        <Social text={"Or Login Using Social Media"}/>

                    </View>
                    <Button
                        style={styles.signUpButton}
                        appearance='ghost'
                        status='control'
                        onPress={onSignUpButtonPress}>
                        Don't have an account? Sign Up
                    </Button>
                </SafeAreaView>
            </ImageOverlay>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
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
    loginLabel: {
        marginTop: 16,
    },
    passwordInput: {
        marginTop: 16,
    },
    loginButton: {
        marginTop: 30,
        marginHorizontal: 16,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
    signUpButton: {
        marginVertical: 12,
    },
});

export default Login;
