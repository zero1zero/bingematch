import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

const tokenKey = 'token'

export default class Storage {

    isLoggedIn = async () => {
        return this.get(tokenKey)
    }

    clearToken = async () => {
        return this.remove(tokenKey)
    }

    setToken = async (token: string) => {
        return this.set(tokenKey, token);
    }

    getToken = async () : Promise<string | void> => {
        return this.get(tokenKey)
            .then(token => {
                jwt_decode(token);
            })
    }

    getUser = async () : Promise<string | void> => {
        return this.getToken()
            .then(token => {
                if (!token) {
                    return
                }

                const decoded = jwt_decode(token);

                // @ts-ignore
                return decoded.id
            })
    }

    private set = async (key : string, value : any) => {
        const jsonValue = JSON.stringify(value)

        await AsyncStorage.setItem(key, jsonValue)
    }


    private get = async (key : string) : Promise<string> => {
        const jsonValue = await AsyncStorage.getItem(key)

        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }

    remove = async (key : string) => {
        await AsyncStorage.removeItem(key)
    }
}
