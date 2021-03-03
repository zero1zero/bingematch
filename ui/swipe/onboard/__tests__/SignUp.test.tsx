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
import API from "../../api/API";
import Storage from '../../Storage'
import Deck from "../../deck/Deck";
import {user} from "../../model/compiled";

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const storage = new Storage()
const api = new API(storage)

let login : user.ILogin = {
    email: 'test@test.com',
    password: 'horse battery staple login'
}

beforeAll(async () => {
    await api.refreshForTest(login)
})

afterAll(async () => {
    await api.deleteCurrentUser()
})

test('given new SignUp, we can register a new user', async () => {

    const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
    const { getByPlaceholderText, getByText, findByText, toJSON } = render(
        <ApplicationProvider {...eva}  theme={eva.light}>
            <IconRegistry icons={EvaIconsPack} />
            <NavigationContainer>
                <Navigator headerMode='none'>
                    <Screen name='SignUp' component={SignUp} />
                    <Screen name='Deck' component={Deck} />
                </Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    );

    fireEvent.changeText(
        getByPlaceholderText('Email'),
        'jimbo8@jimbo.com'
    );

    fireEvent.changeText(
        getByPlaceholderText('Password'),
        'password'
    );

    fireEvent.changeText(
        getByPlaceholderText('Verify Password'),
        'password'
    );

    fireEvent.press(getByText('SIGN UP'))

    const nope = await findByText('Nope')
    expect(nope).toBeTruthy()
});

