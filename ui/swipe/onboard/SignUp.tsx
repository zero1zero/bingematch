import React, {useEffect, useLayoutEffect, useReducer, useState} from "react";
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View} from "react-native";
import Social from "./components/Social";
import {BaseNavigationProps} from "../etc/BaseNavigationProps";
import Dependencies from "../Dependencies";
import {defaultReducer, isReadyToValidate, isValid, UserEvents, userReduder, verify} from "./SignUpReducer";
import {Button} from "../components/Button";
import {BingeMatch} from "../theme";
import {PasswordInput} from "./components/PasswordInput";
import {VerifyInput} from "./components/VerifyPassword";
import {EmailInput} from "./components/EmailInput";
import {FirstInput} from "./components/FirstInput";
import {LastInput} from "./components/LastInput";
import {useAppDispatch} from "../redux/hooks";
import {login} from "../auth/auth";

export const SignUp: React.FC<BaseNavigationProps<'Login'>> = (props) => {

    const dispatch = useAppDispatch()
    const api = Dependencies.instance.api

    const [serverMessage, setServerMessage] = useState('')

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerShown: false
        });
    }, [props.navigation]);

    const [state, olddispatch] = useReducer<UserEvents>(userReduder, defaultReducer)

    const onSignUpButtonPress = (): void => {
        olddispatch({
            email: verify,
            first: verify,
            last: verify,
            password: verify,
            verify: verify,
            submit: true
        })
    };

    useEffect(() => {
        setServerMessage('')

        if (!state.submit || !isReadyToValidate(state)) {
            return
        }

        //ready to submit, abort if not valid
        if (!isValid(state)) {
            olddispatch({submit: false})
            return
        }

        olddispatch({submit: false})

        api.signup({
            email: state.email.value,
            first: state.first.value,
            last: state.last.value,
            password: state.password.value
        }).then(() => {
            dispatch(login())
            props.navigation.navigate('Queue');
        })
            .catch((e) => {
                //todo this isnt all the use cases here but probably the main one. wire up error cases
                setServerMessage("An account with that username already exists")
            })
    }, [state])

    const onLoginButtonPress = (): void => {
        props.navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
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
                </Text>
                <KeyboardAvoidingView>
                    <FirstInput
                        style={{marginBottom: 10}}
                        message={state.first.validation.message}
                        value={state.first.value}
                        dispatch={olddispatch}/>
                    <LastInput
                        style={{marginBottom: 30}}
                        message={state.last.validation.message}
                        value={state.last.value}
                        dispatch={olddispatch}/>

                    <EmailInput
                        style={{marginBottom: 10}}
                        message={state.email.validation.message}
                        value={state.email.value}
                        dispatch={olddispatch}/>

                    <PasswordInput
                        style={{marginBottom: 6}}
                        message={state.password.validation.message}
                        value={state.password.value}
                        dispatch={olddispatch}/>
                    <VerifyInput
                        value={state.verify.value}
                        dispatch={olddispatch}/>
                </KeyboardAvoidingView>
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        ...BingeMatch.theme.onboard.signup.bg
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 4,
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
    },
});

