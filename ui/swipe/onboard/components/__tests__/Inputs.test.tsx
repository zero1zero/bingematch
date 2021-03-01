import {fireEvent, render} from '@testing-library/react-native';
import {expect, jest, test} from '@jest/globals'
import * as React from 'react'
import EmailInput from "../EmailInput";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import {EvaIconsPack} from "@ui-kitten/eva-icons";

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test('invalid email gives error and valid removes', async () => {
    const onTextChange = jest.fn();
    const onValidChange = jest.fn();
    const { getByPlaceholderText, getByText, queryByPlaceholderText } = render(
        <ApplicationProvider {...eva}  theme={eva.light}>
            <IconRegistry icons={EvaIconsPack} />
            <EmailInput onTextChange={onTextChange} onValidChange={onValidChange} value='' />
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
    expect(onValidChange).toBeCalledWith(true)
    expect(onTextChange).toBeCalledWith('jimbo@jimbo.com')
});

