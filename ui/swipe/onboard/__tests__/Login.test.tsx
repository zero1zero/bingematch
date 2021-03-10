import {fireEvent, render} from '@testing-library/react-native';
import {jest, test} from '@jest/globals'
import * as React from 'react'
import {RootStackParamList} from "../../../App";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import API from "../../api/API";
import Storage from '../../Storage'
import Queue from "../../queue/Queue";
import {user} from "../../model/compiled";
import Login from "../Login";

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const storage = new Storage()
const api = new API(storage)

let login : user.ILogin = {
    email: 'test.login@test.com',
    password: 'horse battery staple login'
}

beforeAll(async () => {
    await api.refreshForTest(login)
})

afterAll(async () => {
    await api.deleteCurrentUser()
    await api.cleanup()
})

test('given a login, auth works fine', async () => {

    const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
    const { getByPlaceholderText, getByText, queryByText } = render(
        <ApplicationProvider {...eva}  theme={eva.light}>
            <IconRegistry icons={EvaIconsPack} />
            <NavigationContainer>
                <Navigator headerMode='none'>
                    <Screen name='Login' component={Login} />
                    <Screen name='Queue' component={Queue} />
                </Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    );

    fireEvent.changeText(
        getByPlaceholderText('Email'),
        login.email
    );

    fireEvent.changeText(
        getByPlaceholderText('Password'),
        login.password
    );

    fireEvent.press(getByText('SIGN IN'))

    expect(queryByText('Nope')).toBeDefined()
});
