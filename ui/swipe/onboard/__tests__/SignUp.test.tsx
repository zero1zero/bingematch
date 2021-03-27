import {fireEvent, render} from '@testing-library/react-native';
import {jest, test} from '@jest/globals'
import * as React from 'react'
import {RootStackParamList} from "../../../App";
import SignUp from "../SignUp";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import API from "../../api/API";
import Storage from '../../Storage'
import Queue from "../../queue/Queue";
import {user} from "../../model/compiled";


jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const storage = new Storage()
const api = new API(storage)

let login : user.ILogin = {
    email: 'test.signup@test.com',
    password: 'horse battery staple login'
}

beforeAll(async () => {
    await api.refreshForTest(login)
})

afterAll(async () => {
    await api.deleteCurrentUser()
    await api.cleanup()
})

test('given new SignUp, we can register a new user', async () => {

    const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
    const { queryByText, getByPlaceholderText, getByText, findByText, toJSON } = render(
        <NavigationContainer>
            <Navigator headerMode='none'>
                <Screen name='SignUp' component={SignUp} />
                <Screen name='Queue' component={Queue} />
            </Navigator>
        </NavigationContainer>
    );

    fireEvent.changeText(
        getByPlaceholderText('Email'),
        login.email
    );

    fireEvent.changeText(
        getByPlaceholderText('Password'),
        login.password
    );

    fireEvent.changeText(
        getByPlaceholderText('Verify Password'),
        login.password
    );

    fireEvent.press(getByText('SIGN UP'))

    expect(queryByText('Nope')).toBeDefined()
});
