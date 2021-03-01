import React from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text, TopNavigation} from '@ui-kitten/components';
import {ImageOverlay} from '../etc/ImageOverlay';
import {api, BaseProps} from "../../App";
import Social from "./components/Social";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";

interface InputStatus {
    status: 'danger' | 'control',
    message: string
}

const validStatus : InputStatus = {
    status: 'control',
    message: ''
}

const Login : React.FC<BaseProps> = (props) => {

    const [email, setEmail] = React.useState<string>()
    const [emailValid, setEmailValid] = React.useState<boolean>()

    const [password, setPassword] = React.useState<string>()
    const [passwordValid, setPasswordValid] = React.useState<boolean>()

    const onLoginButtonPress = (): void => {

        if (!emailValid || !passwordValid) {
            return
        }

        api.signup({
            email: email,
            password: password
        }).then(token => {
            console.log(token)
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
                    <TopNavigation style={{ backgroundColor: 'transparent' }} />
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
                            value={email}
                            onTextChange={setEmail}
                            onValidChange={setEmailValid}
                        />
                        <PasswordInput
                            value={password}
                            verify={false}
                            onValidChange={setPasswordValid}
                            onTextChange={setPassword} />

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
