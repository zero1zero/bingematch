import React, {useEffect, useLayoutEffect, useReducer, useState} from "react";
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {ImageOverlay} from "../components/ImageOverlay";
import Social from "./components/Social";
import {BaseNavigationProps} from "../etc/BaseNavigationProps";
import Dependencies from "../Dependencies";
import {defaultReducer, isReadyToValidate, isValid, UserEvents, userReduder, verify} from "./UserReducer";
import {Button} from "../components/Button";
import {BingeMatch} from "../theme";
import {PasswordInput} from "./components/PasswordInput";
import {VerifyInput} from "./components/VerifyPassword";
import {EmailInput} from "./components/EmailInput";
import {AuthContext} from "../api/Auth";

export const SignUp : React.FC<BaseNavigationProps<'Login'>> = (props) => {

    const api = Dependencies.instance.api

    const [serverMessage, setServerMessage] = useState('')

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerShown: false
        });
    }, [props.navigation]);

    const [state, dispatch] = useReducer<UserEvents>(userReduder, defaultReducer)

    const onSignUpButtonPress = (): void => {
        dispatch({
            email: verify,
            password: verify,
            verify: verify,
            submit: true
        })
    };

    const { login } = React.useContext(AuthContext);

    useEffect(() => {
        setServerMessage('')

        if (!state.submit
            || !isReadyToValidate(state.email.validation, state.password.validation, state.verify.validation)) {
            return
        }

        //ready to submit, abort if not valid
        if (!isValid(state.email.validation,
            state.password.validation,
            state.verify.validation)) {
            dispatch({ submit: false})
            return
        }

        dispatch({submit: false})

        api.signup({
            email: state.email.value,
            password: state.password.value
        }).then(() => {
            login()
            props.navigation.navigate('Queue');
        })
            .catch((e) => {
                //todo this isnt all the use cases here but probably the main one
                setServerMessage("An account with that username already exists")
            })
    }, [state])

    const onLoginButtonPress = (): void => {
        props.navigation.navigate('Login');
    };

    return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={{flex: 1}}>
                <View style={styles.headerContainer}>
                    <Text style={BingeMatch.h1}>
                        BingeMatch
                    </Text>
                    <Text style={BingeMatch.h2}>
                        Create a new account
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={BingeMatch.form.message}>
                        {serverMessage}
                    </Text >
                    <View>
                        <EmailInput
                            style={{marginBottom: 10}}
                            message={state.email.validation.message}
                            value={state.email.value}
                            dispatch={dispatch} />
                        <PasswordInput
                            style={{marginBottom: 6}}
                            message={state.password.validation.message}
                            value={state.password.value}
                            dispatch={dispatch} />
                        <VerifyInput
                            value={state.verify.value}
                            dispatch={dispatch} />
                    </View>
                    <Button
                        style={styles.signUpButton}
                        onPress={onSignUpButtonPress}>
                        <Text style={BingeMatch.theme.button.text}>Sign Up</Text>
                    </Button>

                    <Social text={"Or Sign Up Using Social Media"}/>
                </View>
                <Button
                    style={styles.loginButton}
                    onPress={onLoginButtonPress}>
                    <Text style={styles.loginButtonText}>Already have account? Sign In</Text>
                </Button>
                </KeyboardAvoidingView>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        ...BingeMatch.theme.onboard.signup.bg
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
        width: '100%',
        backgroundColor: 'white'
    },
    loginButton: {
        marginVertical: 12,
    },

    loginButtonText: {
        ...BingeMatch.theme.onboard.signup.text
    }
});

