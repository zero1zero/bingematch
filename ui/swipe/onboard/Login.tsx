import React, {useEffect, useLayoutEffect, useReducer} from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ImageOverlay} from '../etc/ImageOverlay';
import Social from "./components/Social";
import {BaseProps} from "../etc/BaseProps";
import Dependencies from "../Dependencies";
import {isReadyToValidate, isValid, UserEvents, userReduder, ValidationStatus} from "./UserReducer";
import {Button} from "../components/Button";
import {BingeMatch} from "../theme";
import {PasswordInput} from "./components/PasswordInput";
import {EmailInput} from "./components/EmailInput";
import {AuthContext} from "../api/Auth";

const Login : React.FC<BaseProps> = (props) => {

    const api = Dependencies.instance.api

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
        if (!state.submit
            || !isReadyToValidate(state.email.validation, state.password.validation)) {
            return
        }

        //ready to submit, abort if not valid
        if (!isValid(state.email.validation, state.password.validation)) {
            dispatch({ submit: false})
            return
        }

        api.login({
            email: state.email.value,
            password: state.password.value
        }).then(() => {
            login()
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
                        <Text style={BingeMatch.h1}>
                            BingeMatch
                        </Text>
                        <Text style={BingeMatch.h2}>
                            Login
                        </Text>
                    </View>
                    <View style={styles.formContainer}>
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
                            <Text style={BingeMatch.buttonText}>Sign In</Text>
                        </Button>

                        <Social text={"Or Login Using Social Media"}/>

                    </View>
                    <Button
                        style={styles.signUpButton}
                        onPress={onSignUpButtonPress}>
                        <Text style={styles.signUpButtonText}>Don't have an account? Sign Up</Text>
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
        marginTop: 10,
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
    signUpButton: {
        marginVertical: 12,
    },

    signUpButtonText: {
        color: 'white'
    }
});


export default Login;
