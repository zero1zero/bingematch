import React from "react";
import {ImageStyle, KeyboardAvoidingView, SafeAreaView, View} from "react-native";
import {Button, Icon, IconElement, StyleService, Text, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import {ImageOverlay} from "../etc/ImageOverlay";
import Social from "./components/Social";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import {BaseProps} from "../etc/BaseProps";
import API from "../api/API";

export const PersonIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='person'/>
);

export const PlusIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='plus'/>
);

const SignUp : React.FC<BaseProps> = (props) => {
    const BackIcon = (props) => (
        <Icon {...props} name='arrow-back' fill='#FFF' />
    );
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => props.navigation.navigate('Login')} />
    );

    const [email, setEmail] = React.useState<string>()
    const [emailValid, setEmailValid] = React.useState<boolean>()

    const [password, setPassword] = React.useState<string>()
    const [passwordValid, setPasswordValid] = React.useState<boolean>()

    const onSignUpButtonPress = (): void => {
        if (!emailValid || !passwordValid) {
            return
        }

        API.instance.login({
            email: email,
            password: password
        }).then(token => {
            console.log(token)
        })
    };

    const onLoginButtonPress = (): void => {
        props.navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <ImageOverlay
                style={{ flex: 1}}
                source={require('../assets/image-background.jpg')}>
                <SafeAreaView style={styles.container}>
                    <TopNavigation accessoryLeft={BackAction} style={{ backgroundColor: 'transparent' }} />
                    <View style={styles.headerContainer}>
                        <Text
                            category='h1'
                            status='control'>
                            Sign Up
                        </Text>
                        <Text
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
                            onValidChange={setPasswordValid}
                            onTextChange={setPassword}
                            verify={true} />
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
