import React, {useEffect, useLayoutEffect, useReducer, useState} from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ImageOverlay} from '../components/ImageOverlay';
import Social from "./components/Social";
import {BaseNavigationProps} from "../etc/BaseNavigationProps";
import Dependencies from "../Dependencies";
import {isReadyToValidate, isValid, UserEvents, userReduder, ValidationStatus} from "./UserReducer";
import {Button} from "../components/Button";
import {BingeMatch} from "../theme";
import {PasswordInput} from "./components/PasswordInput";
import {EmailInput} from "./components/EmailInput";
import {AuthContext} from "../api/Auth";

export const Login : React.FC<BaseNavigationProps<'Login'>> = (props) => {

    const api = Dependencies.instance.api

    const [serverMessage, setServerMessage] = useState('')

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerShown: false
        });
    }, [props.navigation]);

        const [state, dispatch] = useReducer<UserEvents>(userReduder, {
            email: { validation: { status: ValidationStatus.Input }},
            password: { validation: { status: ValidationStatus.Input}},
        })

    const onLoginButtonPress = () : void => {

            dispatch({
                email: { validation: { status: ValidationStatus.Verify}},
                password: { validation: { status: ValidationStatus.Verify}},
                submit: true
            })
    };

    const { login } = React.useContext(AuthContext);

    useEffect(() => {

        setServerMessage('')

        if (!state.submit
            || !isReadyToValidate(state.email.validation, state.password.validation)) {
            return
        }

        //ready to submit, abort if not valid
        if (!isValid(state.email.validation, state.password.validation)) {
            dispatch({ submit: false})
            return
        }

        dispatch({submit: false})

        api.login({
            email: state.email.value,
            password: state.password.value
        })
            .then(() => {
                login()
                props.navigation.navigate('Queue');
            })
            .catch((e) => {
                setServerMessage("Sorry, no one with that email and password")
            })
    }, [state.submit, state.email, state.password])

    const onForgotPasswordButtonPress = (): void => {
        props.navigation.navigate('ForgotPassword');
    };

    return (
        <SafeAreaView
            style={styles.container}>
            <KeyboardAvoidingView style={{flex: 1}}>
                <View style={styles.headerContainer}>
                    <Text style={BingeMatch.h1}>
                        Login
                    </Text>
                    <Text style={BingeMatch.h2}>
                        Already have an account?
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={BingeMatch.form.message}>
                        {serverMessage}
                    </Text >
                    <EmailInput
                        message={state.email.validation.message}
                        value={state.email.value}
                        dispatch={dispatch} />
                    <PasswordInput
                        message={state.password.validation.message}
                        value={state.password.value}
                        dispatch={dispatch} />

                    <View style={styles.forgotPasswordContainer}>
                        <Button
                            style={styles.forgotPasswordButton}
                            onPress={onForgotPasswordButtonPress}>
                            <Text>Forgot your password?</Text>
                        </Button>
                    </View>
                    <Button
                        style={styles.loginButton}
                        onPress={onLoginButtonPress}>
                        <Text style={BingeMatch.theme.button.text}>Login</Text>
                    </Button>
                </View>

                <Social text={"Or Login Using Social Media"}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        marginTop: '50%',
        backgroundColor: BingeMatch.theme.onboard.loginbg,
        flex: 1,
    },
    headerContainer: {
        flex: 1,
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
        width: '100%',
        backgroundColor: 'white'
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
});


