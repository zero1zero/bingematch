//https://github.com/expo/expo/issues/5007

jest.mock('expo-secure-store', () => {
    let data = {}

    return {
            deleteItemAsync: (key, options) => {
                delete data[key]
            },
            getItemAsync: (key, options) => {
                return data[key]
            },
            setItemAsync: (key, value, options) => {
                return data[key] = value
            }
    };
});

jest.mock('react-native-screens', () => ({
    ...jest.requireActual('react-native-screens'),
    enableScreens: jest.fn(),
}));

