import React, {useEffect, useLayoutEffect, useReducer} from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BaseNavigationProps} from "../etc/BaseNavigationProps";
import Dependencies from "../Dependencies";
import {reducer, Reducer, ValidationStatus} from "./ProfileEvents";
import {BingeMatch} from "../theme";
import {Button} from "../components/Button";
import {AuthContext} from "../api/Auth";
import {EmailInput} from "../onboard/components/EmailInput";
import {PasswordInput} from "../onboard/components/PasswordInput";
import {VerifyInput} from "../onboard/components/VerifyPassword";
import {user} from "../model/compiled";
import {isReadyToValidate, isValid} from "../onboard/UserReducer";
import Toast from 'react-native-root-toast';

export const Profile: React.FC<BaseNavigationProps<'Profile'>> = (props) => {

    const api = Dependencies.instance.api
    const storage = Dependencies.instance.storage

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerStyle: BingeMatch.theme.nav.bar,
            headerTitle: () => (<Text style={BingeMatch.theme.nav.title}>Profile</Text>),
            headerBackTitleStyle: BingeMatch.theme.nav.back,
            headerTintColor: BingeMatch.colors.grey
        });

        api.getUser()
            .then((user) => {
                dispatch({
                    email: {value: user.email},
                    password: {value: 'stopnow1!'},
                    verify: {value: 'stopnow1!'}
                })
            })
    }, [props.navigation]);

    const [state, dispatch] = useReducer<Reducer>(reducer, {
        email: {validation: {status: ValidationStatus.Input}},
        password: {validation: {status: ValidationStatus.Input}},
        verify: {validation: {status: ValidationStatus.Input}}
    })

    const onSavePress = (): void => {
        dispatch({
            email: {validation: {status: ValidationStatus.Verify}},
            password: {validation: {status: ValidationStatus.Verify}},
            submit: true
        })
    };

    const {signOut} = React.useContext(AuthContext);

    const onLogoutPress = (): void => {
        storage.clearToken()
            .then(signOut)
    }

    useEffect(() => {
        if ((!state.submit
            || !isReadyToValidate(state.email.validation, state.password.validation))) {
            return
        }

        //ready to submit, abort if not valid
        if (!isValid(state.email.validation, state.password.validation)) {
            dispatch({submit: false})
            return
        }

        //we are submitting now
        dispatch({submit: false})

        const emailParams = {email: state.email.value}

        //if just the junk password, dont send
        const updated = user.Update.create(state.password.value == 'stopnow1!' ? emailParams : {
            ...emailParams,
            password: state.password.value
        })

        api.userUpdate(updated)
            .then(r => {
                // Add a Toast on screen.
                Toast.show('Updated', {
                    keyboardAvoiding: true,
                    duration: Toast.durations.LONG,
                });
            })
    }, [state.submit, state.email, state.password])

    return (
        <SafeAreaView
            style={styles.container}>
            <KeyboardAvoidingView style={{flex: 1}}>
                <View style={styles.formContainer}>
                    <EmailInput
                        message={state.email.validation.message}
                        value={state.email.value}
                        dispatch={dispatch}/>
                    <PasswordInput
                        message={state.password.validation.message}
                        style={{marginBottom: 12}}
                        value={state.password.value}
                        dispatch={dispatch}/>
                    <VerifyInput
                        value={state.verify.value}
                        dispatch={dispatch}/>
                    <Button
                        style={styles.saveButton}
                        onPress={onSavePress}>
                        <Text style={BingeMatch.theme.button.text}>Update</Text>
                    </Button>

                    <Button
                        onPress={onLogoutPress}
                        style={styles.logoutButton}>
                        <Text style={BingeMatch.theme.button.text}>Logout</Text>
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BingeMatch.theme.queue.background,
    },
    formContainer: {
        paddingHorizontal: 16,
    },
    saveButton: {
        marginTop: 10,
        marginHorizontal: 16,
        width: '100%',

        ...BingeMatch.theme.profile.save
    },
    logoutButton: {
        bottom: 0,
        width: '100%',

        marginTop: 30,

        ...BingeMatch.theme.profile.logout
    },
});
