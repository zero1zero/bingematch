import {queue, user} from "../model/compiled";
import fetch from "node-fetch"
import Storage from '../Storage'

import getEnvVars from '../../environment';

const { apiUrl } = getEnvVars();

export default class API {

    static instance = new API()

    private storage : Storage = new Storage()

    signup = async (signup: user.IRegister) : Promise<user.DetailAndToken> => {
        return this.post('/user/', signup)
            .then(r => r.json())
            .then(json => user.DetailAndToken.fromObject(json))
    }

    login = async (login: user.ILogin) : Promise<string> => {
        return this.post('/login/', login)
            .then(r => r.text())
    }

    popular = async () : Promise<queue.AllItems> => {
        return this.get('/queue/')
            .then(r => r.json())
            .then(json => queue.AllItems.fromObject(json))
    }

    delete = async (url: string, authenticate = false): Promise<Response> => {
        return new Promise((resolve, reject) => {
            const headers: Record<string, string> = {}

            if (authenticate) {
                headers['Authorization'] = 'Bearer ' + this.storage.getToken()
            }

            fetch(apiUrl + url, {
                headers: headers,
                method: 'delete'
            })
                .then(r => r.ok ? resolve(r) : reject(r))
                .catch(error => reject(error))
        });
    }

    get = async (url: string, authenticate = false): Promise<Response> => {
        return new Promise((resolve, reject) => {
            const headers: Record<string, string> = {
                'Accept': 'application/json',
            };

            if (authenticate) {
                headers['Authorization'] = 'Bearer ' + this.storage.getToken()
            }

            fetch(apiUrl + url, {
                headers: headers,
                method: 'get'
            })
                .then(r => r.ok ? resolve(r) : reject(r))
                .catch(error => reject(error))
        });
    }

    post = async (url: string, payload: any, guest = false): Promise<Response> => {
        return new Promise<Response>((resolve, reject) => {
            const headers: Record<string, string> = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };

            if (!guest) {
                headers['Authorization'] = 'Bearer ' + this.storage.getToken()
            }

            fetch(apiUrl + url, {
                headers: headers,
                method: 'post',
                body: JSON.stringify(payload)
            })
                .then(r => r.ok ? resolve(r) : reject(r))
                .catch(error => reject(error))
        });
    }

    put = async (url: string, payload: any, guest = false): Promise<Response> => {
        return new Promise<Response>((resolve, reject) => {
            const headers: Record<string, string> = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };

            if (!guest) {
                headers['Authorization'] = 'Bearer ' + this.storage.getToken()
            }

            fetch(apiUrl + url, {
                headers: headers,
                method: 'put',
                body: JSON.stringify(payload)
            })
                .then(r => r.ok ? resolve(r) : reject(r))
                .catch(error => reject(error))
        });
    }
}
