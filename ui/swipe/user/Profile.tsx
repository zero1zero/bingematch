import React, {useContext, useEffect, useLayoutEffect, useReducer, useState} from 'react';
import {KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BaseNavigationProps} from "../etc/BaseNavigationProps";
import Dependencies from "../Dependencies";
import {profileReducer, ProfileReducer} from "./ProfileReducer";
import {BingeMatch} from "../theme";
import {Button} from "../components/Button";
import {EmailInput} from "../onboard/components/EmailInput";
import {PasswordInput} from "../onboard/components/PasswordInput";
import {VerifyInput} from "../onboard/components/VerifyPassword";
import {show, user} from "../model/compiled";
import {defaultReducer, isReadyToValidate, isValid, verify} from "../onboard/SignUpReducer";
import Toast from 'react-native-root-toast';
import {FirstInput} from "../onboard/components/FirstInput";
import {LastInput} from "../onboard/components/LastInput";
import {PlusIcon, TheatreMasks, UserPlus} from "../components/Icons";
import {AuthContext} from "../../App";

export const Profile: React.FC<BaseNavigationProps<'Profile'>> = (props) => {

    const auth = useContext(AuthContext)
    const api = Dependencies.instance.api
    const storage = Dependencies.instance.storage

    //this should be immutable after initial set
    const [userGenres, setUserGenres] = useState<show.IGenre[]>([])
    const [state, dispatch] = useReducer<ProfileReducer>(profileReducer, defaultReducer)

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerStyle: BingeMatch.theme.nav.bar,
            headerTitle: () => (<Text style={BingeMatch.theme.nav.title}>Profile</Text>),
            headerBackTitleStyle: BingeMatch.theme.nav.back,
            headerTintColor: BingeMatch.colors.grey
        });

        props.navigation.addListener('focus', () => {
            //refresh genres every focus
            setUserGenres([])
            api.getUser()
                .then(user =>
                    setUserGenres(user.genres)
                )
                .catch(e => {
                    //todo handle failure case
                    console.error(e)
                })
        })

        api.getUser()
            .then(user => {
                setUserGenres(user.genres)
                api.getUser()
                    .then((user) => {
                        setUserGenres(user.genres)
                        dispatch({
                            email: {value: user.email},
                            first: {value: user.first},
                            last: {value: user.last},
                            password: {value: 'stopnow1!'},
                            verify: {value: 'stopnow1!'}
                        })
                    })
            })
    }, [props.navigation]);


    const onSavePress = (): void => {
        dispatch({
            email: verify,
            first: verify,
            last: verify,
            password: verify,
            verify: verify,
            submit: true
        })
    };

    const {signOut} = auth

    const onLogoutPress = (): void => {
        storage.clearToken()
            .then(signOut)
    }

    useEffect(() => {

        if (!state.submit || !isReadyToValidate(state)) {
            return
        }

        //ready to submit, abort if not valid
        if (!isValid(state)) {
            dispatch({submit: false})
            return
        }

        //we are submitting now
        dispatch({submit: false})

        const restParams = {
            email: state.email.value,
            first: state.first.value,
            last: state.last.value
        }

        //if just the junk password, dont send
        const updated = user.Update.create(state.password.value == 'stopnow1!' ? restParams : {
            ...restParams,
            password: state.password.value
        })

        api.userUpdate(updated)
            .catch(e => {
                //todo handle failure case
                console.error(e)
            })
            .then(r => {

                // Add a Toast on screen.
                Toast.show('Saved', {
                    keyboardAvoiding: true,
                    duration: Toast.durations.SHORT,
                });
            })
    }, [state.submit, state.email, state.password])

    const addGenres = () => {
        props.navigation.navigate('AddGenres', {
            genres: userGenres
        })
    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={{flex: 1}}>

                    <View style={styles.formContainer}>

                        <View style={styles.profileActions}>
                            {/*<Text style={styles.label}></Text>*/}
                            <Button
                                style={styles.addFriends}
                                onPress={addGenres}>
                                <View style={{alignItems: "center", flexDirection: "row"}}>
                                    <UserPlus size={25} style={{marginRight: 5}}/>
                                    <Text style={styles.addGenresText}>Your Friends</Text>
                                </View>
                            </Button>

                            <Button
                                style={styles.addGenres}
                                onPress={addGenres}>
                                <View style={{alignItems: "center", flexDirection: "row"}}>
                                    <TheatreMasks size={25} style={{marginRight: 5}}/>
                                    <Text style={styles.addGenresText}>Your Genres</Text>
                                </View>
                            </Button>
                        </View>

                        <Text style={styles.label}>First</Text>
                        <FirstInput
                            message={state.first.validation.message}
                            value={state.first.value}
                            dispatch={dispatch}/>

                        <Text style={styles.label}>Last</Text>
                        <LastInput
                            message={state.last.validation.message}
                            value={state.last.value}
                            dispatch={dispatch}/>

                        <Text style={styles.label}>Email</Text>
                        <EmailInput
                            message={state.email.validation.message}
                            value={state.email.value}
                            dispatch={dispatch}/>

                        <Text style={styles.label}>Password</Text>
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
                            <Text style={BingeMatch.theme.button.text}>Save</Text>
                        </Button>

                        <Button
                            onPress={onLogoutPress}
                            style={styles.logoutButton}>
                            <Text style={BingeMatch.theme.button.text}>Logout</Text>
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView>
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
        marginTop: 20,
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
    label: {
        marginTop: 20,
        marginBottom: 4,

        ...BingeMatch.theme.profile.label
    },

    addGenres: {
        alignSelf: "flex-start",

        ...BingeMatch.theme.button.button
    },

    profileActions: {
        flexDirection: "row",
        marginTop: 5
    },

    addFriends: {
        alignSelf: "flex-start",

        marginRight: 10,

        ...BingeMatch.theme.button.button
    },

    addGenresText: {
        ...BingeMatch.theme.button.text,

        fontSize: 18,
    },
});
