import {fireEvent, render, waitFor, waitForElementToBeRemoved} from '@testing-library/react-native';
import {jest, test} from '@jest/globals'
import * as React from 'react'
import App, {RootStackParamList} from "../../../App";
import {createStackNavigator} from "@react-navigation/stack";
import API from "../../api/API";
import Storage from '../../Storage'
import {user} from "../../model/compiled";
import {Login} from "../Login";

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const storage = new Storage()
const api = new API(storage)

let login: user.ILogin = {
    email: 'test.Login.test.tsx@test.com',
    password: 'horse battery staple login'
}

beforeAll(async () => {
    await api.refreshForTest(login)
})

afterAll(async () => {
    await api.deleteUserWithLogin(login)
        .then(() => api.cleanup())
})

test('given a login, auth works fine', async () => {

    const {Navigator, Screen} = createStackNavigator<RootStackParamList>();
    const {getByPlaceholderText, getByText, queryByText, queryAllByPlaceholderText} = render(
        <App/>
    );

    await waitFor(() => getByText('BingeMatch'));

    fireEvent.press(getByText('Already have account? Sign In'))

    await waitFor(() => getByText('Login'));

    fireEvent.changeText(
        queryAllByPlaceholderText('Email')[1],
        login.email
    );

    fireEvent.changeText(
        queryAllByPlaceholderText('Password')[1],
        login.password
    );

    fireEvent.press(getByText('Login'))

    await waitForElementToBeRemoved(() => getByText('Login'))

    expect(getByText('Nope')).not.toBeNull()

    //insurance test is working
    expect(queryByText('whatever')).toBeNull()
});
