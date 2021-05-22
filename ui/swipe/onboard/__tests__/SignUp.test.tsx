import {fireEvent, render, waitFor, waitForElementToBeRemoved} from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';
import {jest, test} from '@jest/globals'
import * as React from 'react'
import App, {RootStackParamList} from "../../../App";
import {createStackNavigator} from "@react-navigation/stack";
import API from "../../api/API";
import Storage from '../../Storage'
import {user} from "../../model/compiled";

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const storage = new Storage()
const api = new API(storage)

let login : user.ILogin = {
    email: 'test.SignUp.test.tsx@test.com',
    password: 'horse battery staple login'
}

afterEach(async () => {
    await api.deleteUserWithLogin(login)
})

beforeEach(async () => {
    await api.deleteUserWithLogin(login)
        .then(() => api.cleanup())
})

test('given a new user I can signup and will be logged in', async () => {

    const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
    const { queryByText, getByPlaceholderText, getByText, findByText, toJSON } = render(
        <App />
    );

    await waitFor(() => getByText('BingeMatch'));

    fireEvent.changeText(
        getByPlaceholderText('Email'),
        login.email
    );

    fireEvent.changeText(
        getByPlaceholderText('Password'),
        login.password
    );

    fireEvent.changeText(
        getByPlaceholderText('Verify'),
        login.password
    );

    fireEvent.press(getByText('SIGN UP'))

    await waitForElementToBeRemoved(() => getByPlaceholderText('Email'))

    expect(getByText('Nope')).not.toBeNull()

    //insurance test is working
    expect(queryByText('whatever')).toBeNull()
});

//throwing this in here just because
test("expo storage works in test mode", async () => {
    await SecureStore.setItemAsync("tester", "foo")

    expect(await SecureStore.getItemAsync("tester")).toEqual("foo")

})
