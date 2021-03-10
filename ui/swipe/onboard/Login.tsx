import React, {useEffect, useReducer} from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import {ImageOverlay} from '../etc/ImageOverlay';
import Social from "./components/Social";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import {BaseProps} from "../etc/BaseProps";
import Dependencies from "../Dependencies";
import {reducer, Reducer, ValidationStatus} from "./OnboardEvents";
import _ from 'lodash';

const Login : React.FC<BaseProps> = (props) => {

    const api = Dependencies.instance.api

        const [state, dispatch] = useReducer<Reducer>(reducer, {
            email: { validation: { status: ValidationStatus.Input }},
            password: { validation: { status: ValidationStatus.Input}},
            verify: { validation: { status: ValidationStatus.Input}}
        })

    const onLoginButtonPress = () : void => {
            dispatch({
                email: { validation: { status: ValidationStatus.Verify}},
                password: { validation: { status: ValidationStatus.Verify}},
                submit: true
            })
    };

    useEffect(() => {
        if (!state.submit
            || _.intersection([ValidationStatus.Input, ValidationStatus.Verify],
                [state.email.validation.status, state.password.validation.status]).length > 0) {
            return
        }

        //ready to submit, abort if not valid
        if (state.email.validation.status != ValidationStatus.Valid
            || state.password.validation.status != ValidationStatus.Valid) {
            dispatch({ submit: false})
            return
        }

        api.login({
            email: state.email.value,
            password: state.password.value
        }).then(() => {
            props.navigation.navigate('Queue');
        })
    }, [state.submit, state.email, state.password])

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
                source={require('../assets/bp.jpg')}>
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
                            state={state.email}
                            dispatch={dispatch} />
                        <PasswordInput
                            passwordState={state.password}
                            dispatch={dispatch} />

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
