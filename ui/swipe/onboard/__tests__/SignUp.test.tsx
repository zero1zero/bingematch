import {fireEvent, render} from '@testing-library/react-native';
import {jest, test} from '@jest/globals'
import * as React from 'react'
import {RootStackParamList} from "../../../App";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import SignUp from "../SignUp";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test('given new SignUp, we can register a new user', async () => {

    const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
    const { getByPlaceholderText, getByText, getByTestId } = render(
        <ApplicationProvider {...eva}  theme={eva.light}>
            <IconRegistry icons={EvaIconsPack} />
            <NavigationContainer>
                <Navigator headerMode='none'>
                    <Screen name='SignUp' component={SignUp}/>
                </Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    );

    fireEvent.changeText(
        getByPlaceholderText('Email'),
        'jimbo@jimbo.com'
    );

    fireEvent.changeText(
        getByPlaceholderText('Password'),
        'password'
    );

    fireEvent.changeText(
        getByPlaceholderText('Verify Password'),
        'password'
    );

    // fireEvent.press(getByText('SIGN UP'))
});

