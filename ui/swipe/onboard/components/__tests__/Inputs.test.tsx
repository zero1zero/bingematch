import {act, fireEvent, render} from '@testing-library/react-native';
import {expect, jest, test} from '@jest/globals'
import * as React from 'react'
import EmailInput from "../EmailInput";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import PasswordInput from "../PasswordInput";

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test('invalid email gives error and valid removes', async () => {
    let emailRef : () => string | undefined
    const emailRefCallback = (verifyCheck: () => string | undefined) => {
        emailRef = verifyCheck
    }
    const { getByPlaceholderText, getByText, queryByPlaceholderText } = render(
        <ApplicationProvider {...eva}  theme={eva.light}>
            <IconRegistry icons={EvaIconsPack} />
            <EmailInput
                checkCallback={emailRefCallback}/>
        </ApplicationProvider>
    );

    fireEvent.changeText(
        getByPlaceholderText('Email'),
        'jimbo'
    );
    fireEvent(getByPlaceholderText('Email'), 'blur');

    getByText('Please enter a valid email')

    fireEvent.changeText(
        getByPlaceholderText('Email'),
        'jimbo@jimbo.com'
    );
    fireEvent(getByPlaceholderText('Email'), 'blur');

    expect(queryByPlaceholderText('Please enter a valid email')).toBeNull()

    act(() => expect(emailRef()).toEqual("jimbo@jimbo.com"))
});

test('invalid password flow checks multiple bad password things', async () => {
    let passwordRef : () => string | undefined
    const passwordRefCallback = (verifyCheck: () => string | undefined) => {
        passwordRef = verifyCheck
    }
    const { getByPlaceholderText, getByText, queryByPlaceholderText } = render(
        <ApplicationProvider {...eva}  theme={eva.light}>
            <IconRegistry icons={EvaIconsPack} />
            <PasswordInput
                verify={true}
                checkCallback={passwordRefCallback}/>
        </ApplicationProvider>
    );

    //yell that password is missing
    fireEvent(getByPlaceholderText('Password'), 'blur');
    getByText('Please enter your password')

    //to short
    fireEvent.changeText(
        getByPlaceholderText('Password'),
        'jimbo'
    );
    fireEvent(getByPlaceholderText('Password'), 'blur');
    expect(queryByPlaceholderText('Please enter your password')).toBeNull() //first error gone
    getByText('Your password needs to be at least 8 characters')

    //just right but no verify
    fireEvent.changeText(
        getByPlaceholderText('Password'),
        'jimbojones'
    );
    fireEvent(getByPlaceholderText('Password'), 'blur');
    expect(queryByPlaceholderText('Your password needs to be at least 8 characters')).toBeNull() //length error gone

    //verify should stop us
    getByText('Please double check the two password fields match')
    fireEvent.changeText(
        getByPlaceholderText('Verify Password'),
        'jimbojones'
    );
    expect(queryByPlaceholderText('Please double check the two password fields match')).toBeNull()

    act(() => expect(passwordRef()).toEqual("jimbojones"))
});

