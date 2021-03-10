import React, {useEffect, useReducer} from "react";
import {KeyboardAvoidingView, SafeAreaView, View} from "react-native";
import {Button, StyleService, Text} from "@ui-kitten/components";
import {ImageOverlay} from "../etc/ImageOverlay";
import Social from "./components/Social";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import {BaseProps} from "../etc/BaseProps";
import Dependencies from "../Dependencies";
import _ from 'lodash';
import {reducer, Reducer, ValidationStatus} from "./OnboardEvents";

const SignUp : React.FC<BaseProps> = (props) => {

    const api = Dependencies.instance.api

    const [state, dispatch] = useReducer<Reducer>(reducer, {
        email: { validation: { status: ValidationStatus.Input }},
        password: { validation: { status: ValidationStatus.Input}},
        verify: { validation: { status: ValidationStatus.Input}}
    })

    const onSignUpButtonPress = (): void => {
        dispatch({
            email: { validation: { status: ValidationStatus.Verify}},
            password: { validation: { status: ValidationStatus.Verify}},
            verify: { validation: { status: ValidationStatus.Verify}},
            submit: true
        })
    };

    useEffect(() => {
        if (!state.submit
            || _.intersection([ValidationStatus.Input, ValidationStatus.Verify],
                [state.email.validation.status,
                    state.password.validation.status,
                    state.verify.validation.status]).length > 0) {
            return
        }

        //ready to submit, abort if not valid
        if (state.email.validation.status != ValidationStatus.Valid
            || state.password.validation.status != ValidationStatus.Valid
            || state.verify.validation.status != ValidationStatus.Valid) {
            dispatch({ submit: false})
            return
        }

        api.signup({
            email: state.email.value,
            password: state.password.value
        }).then(() => {
            props.navigation.navigate('Queue');
        })
    }, [state])

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
                            BingeMatch
                        </Text>
                        <Text
                            category='s1'
                            status='control'>
                            Create a new account
                        </Text>
                    </View>
                    <View style={styles.formContainer}>
                        <EmailInput
                            state={state.email}
                            dispatch={dispatch} />
                        <PasswordInput
                            passwordState={state.password}
                            dispatch={dispatch}
                            addVerify={true}
                            verifyState={state.verify} />
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
