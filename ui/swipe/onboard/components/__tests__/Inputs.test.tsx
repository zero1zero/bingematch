import {fireEvent, render} from '@testing-library/react-native';
import {expect, jest, test} from '@jest/globals'
import * as React from 'react'
import {useReducer} from 'react'
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import {UserEvents, userReduder, ValidationStatus} from "../../UserReducer";
import {renderHook} from '@testing-library/react-hooks'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test('invalid email gives error and valid removes', async () => {
    const { result } = renderHook(() => useReducer<UserEvents>(userReduder, {
        email: { validation: { status: ValidationStatus.Input }},
        password: { validation: { status: ValidationStatus.Input}},
        verify: { validation: { status: ValidationStatus.Input}}
    }));
    const [state, dispatch] = result.current;

    const { getByPlaceholderText, queryByPlaceholderText, queryByText } = render(
        <EmailInput state={state.email} dispatch={dispatch} />
    );

    fireEvent.changeText(
        getByPlaceholderText('Email'),
        'jimbo'
    );
    fireEvent(getByPlaceholderText('Email'), 'blur')

    expect(queryByText('Please enter a valid email')).toBeDefined()

    fireEvent.changeText(
        getByPlaceholderText('Email'),
        'jimbo@jimbo.com'
    );
    fireEvent(getByPlaceholderText('Email'), 'blur');

    expect(queryByPlaceholderText('Please enter a valid email')).toBeNull()

    const [stateFinal] = result.current;
    expect(stateFinal.email.value).toEqual("jimbo@jimbo.com")
});

test('invalid password flow checks multiple bad password things', async () => {
    const { result } = renderHook(() => useReducer<UserEvents>(userReduder, {
        email: { validation: { status: ValidationStatus.Input }},
        password: { validation: { status: ValidationStatus.Input}},
        verify: { validation: { status: ValidationStatus.Input}}
    }));
    const [state, dispatch] = result.current;

    const { getByPlaceholderText, queryByText, queryByPlaceholderText } = render(
        <PasswordInput
            passwordState={state.password}
            dispatch={dispatch}
            addVerify={true}
            verifyState={state.verify} />
    );

    //yell that password is missing
    fireEvent(getByPlaceholderText('Password'), 'blur');
    expect(queryByText('Please enter your password')).toBeDefined()

    //to short
    fireEvent.changeText(
        getByPlaceholderText('Password'),
        'jimbo'
    );
    fireEvent(getByPlaceholderText('Password'), 'blur');
    expect(queryByPlaceholderText('Please enter your password')).toBeNull() //first error gone
    expect(queryByText('Your password needs to be at least 8 characters')).toBeDefined()

    //just right but no verify
    fireEvent.changeText(
        getByPlaceholderText('Password'),
        'jimbojones'
    );
    fireEvent(getByPlaceholderText('Password'), 'blur');
    expect(queryByPlaceholderText('Your password needs to be at least 8 characters')).toBeNull() //length error gone

    //verify should stop us
    expect(queryByText('Please double check the two password fields match')).toBeDefined()
    fireEvent.changeText(
        getByPlaceholderText('Verify Password'),
        'jimbojones'
    );
    expect(queryByPlaceholderText('Please double check the two password fields match')).toBeNull()

    const [stateFinal] = result.current;
    expect(stateFinal.password.value).toEqual("jimbojones")
});

