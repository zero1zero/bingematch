import {queue, user} from "../model/compiled";
import fetch from "node-fetch"
import Storage from '../Storage'

import getEnvVars from '../../environment';

const { apiUrl } = getEnvVars();

export default class API {

    private storage : Storage

    constructor(storage: Storage) {
        this.storage = storage
    }

    signup = async (signup: user.IRegister) : Promise<user.DetailAndToken> => {
        return this.post('/user/', signup)
            .then(r => r.json())
            .then(json => user.DetailAndToken.fromObject(json))
    }

    deleteUser = async (id : string) : Promise<void> => {
        return this.delete('/user/' + id)
            .then(() => {return})
    }

    login = async (login: user.ILogin) : Promise<string> => {
        return this.post('/user/login/', login)
            .then(r => r.text())
            .then(token => {
                return this.storage.setToken(token)
                    .then(() => token)
            })
    }

    popular = async () : Promise<queue.AllItems> => {
        return this.get('/queue/')
            .then(r => r.json())
            .then(json => queue.AllItems.fromObject(json))
    }

    /*
     *  General purpose below
     */

    delete = async (url: string): Promise<Response> => {
        return this.storage.getToken()
            .then(token => {
                return new Promise((resolve, reject) => {
                    const headers: Record<string, string> = {}

                    if (token) {
                        headers['Authorization'] = 'Bearer ' + token
                    }

                    fetch(apiUrl + url, {
                        headers: headers,
                        method: 'delete'
                    })
                        .then(r => r.ok ? resolve(r) : reject(r))
                        .catch(error => reject(error))
                });
            })
    }

    get = async (url: string): Promise<Response> => {
        return this.storage.getToken()
            .then(token => {
                return new Promise((resolve, reject) => {
                    const headers: Record<string, string> = {
                        'Accept': 'application/json',
                    }

                    if (token) {
                        headers['Authorization'] = 'Bearer ' + token
                    }

                    fetch(apiUrl + url, {
                        headers: headers,
                        method: 'get'
                    })
                        .then(r => r.ok ? resolve(r) : reject(r))
                        .catch(error => reject(error))
                })
            })
    }

    post = async (url: string, payload: any): Promise<Response> => {
        return this.storage.getToken()
            .then(token => {
                return new Promise<Response>((resolve, reject) => {
                    const headers: Record<string, string> = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    };

                    if (token) {
                        headers['Authorization'] = 'Bearer ' + token
                    }

                    fetch(apiUrl + url, {
                        headers: headers,
                        method: 'post',
                        body: JSON.stringify(payload)
                    })
                        .then(r => r.ok ? resolve(r) : reject(r))
                        .catch(error => reject(error))
                });
            })
    }

    put = async (url: string, payload: any): Promise<Response> => {
        return this.storage.getToken()
            .then(token => {
                return new Promise<Response>((resolve, reject) => {
                    const headers: Record<string, string> = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    };

                    if (token) {
                        headers['Authorization'] = 'Bearer ' + token
                    }

                    fetch(apiUrl + url, {
                        headers: headers,
                        method: 'put',
                        body: JSON.stringify(payload)
                    })
                        .then(r => r.ok ? resolve(r) : reject(r))
                        .catch(error => reject(error))
                });
            })
    }
}
