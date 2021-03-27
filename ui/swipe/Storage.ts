import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";

const tokenKey = 'token'

export default class Storage {

    isLoggedIn = async () : Promise<boolean> => {
        return this.get(tokenKey)
            .then((token) => token != null)
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
                if (!token) {
                    return
                }
                return token
            })
    }

    getUserFromToken = (token : string) : string => {
        const decoded = jwt_decode(token);
        // @ts-ignore
        return decoded.id
    }

    getUser = async () : Promise<string | void> => {
        return await this.getToken()
            .then(token => {
                if (!token) {
                    return
                }

                return this.getUserFromToken(token)
            })
    }

    private set = async (key : string, value : any) => {
        const jsonValue = JSON.stringify(value)

        await SecureStore.setItemAsync(key, jsonValue)
    }


    private get = async (key : string) : Promise<string> => {
        const jsonValue = await SecureStore.getItemAsync(key)

        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }

    remove = async (key : string) => {
        return SecureStore.deleteItemAsync(key)
    }
}
