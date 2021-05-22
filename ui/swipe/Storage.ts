import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";

const tokenKey = 'token'

export default class Storage {

    isLoggedIn = async () : Promise<boolean> => {
        return this.get(tokenKey)
            .then((token) => token != null)
    }

    clearToken = async () : Promise<void> => {
        return this.remove(tokenKey)
    }

    setToken = async (token: string) : Promise<void> => {
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
        let token = await this.getToken()

        if (!token) {
            return
        }

        return this.getUserFromToken(token)
    }

    private set = async (key : string, value : any) : Promise<void> => {
        const jsonValue = JSON.stringify(value)

        return SecureStore.setItemAsync(key, jsonValue)
    }

    private get = async (key : string) : Promise<string> => {
        const jsonValue = await SecureStore.getItemAsync(key)

        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }

    remove = async (key : string) => {
        return SecureStore.deleteItemAsync(key)
    }
}
