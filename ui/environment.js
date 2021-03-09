/*****************************
 * environment.js
 * https://alxmrtnz.com/thoughts/2019/03/12/environment-variables-and-workflow-in-expo.html
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from "expo-constants";

const ENV = {
    dev: {
        apiUrl: 'http://192.168.1.192/',
    },
    staging: {
        apiUrl: "[your.staging.api.here]",
        // Add other keys you want here
    },
    prod: {
        apiUrl: "[your.production.api.here]",
        // Add other keys you want here
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.
    if (__DEV__) {
        return ENV.dev;
    } else if (env === 'staging') {
        return ENV.staging;
    } else if (env === 'prod') {
        return ENV.prod;
    }
};

export default getEnvVars;
