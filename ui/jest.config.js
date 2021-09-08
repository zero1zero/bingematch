module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native"
    + "|react-navigation-tabs"
    + "|react-native-splash-screen"
    + "|react-native-screens"
    + "|react-native-reanimated"
    + "|react-native-iphone-x-helper"
    + "|@react-navigation"
    + "|react-native-gesture-handler"
    + "|react-native-async-storage"
    + "|expo-linear-gradient"
    + "|expo-constants"
    + "|expo-secure-store"
    + "|@fortawesome"
    + "|react-native-root-toast"
    + "|react-native-root-siblings"
    + "|react-native-webview"

    //from https://docs.expo.io/guides/testing-with-jest/
    + "|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*"
    + ")/)",
  ],
  collectCoverageFrom: [
    "**/{!(compiled),}.(ts|tsx)"
  ],
  setupFiles: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "./jestSetup.js"
  ],
}

