import {queue, user} from "../model/compiled";
import Storage from '../Storage'

import getEnvVars from '../../environment';
import {AxiosResponse} from "axios";

const { apiUrl } = getEnvVars();

export default class API {

    private axios = require('axios').default;
    private cancelToken = this.axios.CancelToken;
    private cancelSource = this.cancelToken.source()

    private storage : Storage

    constructor(storage: Storage) {
        this.storage = storage
    }

    cleanup = () => {
        this.cancelSource.cancel("Manually aborted by application")
    }

    signup = async (signup: user.IRegister) : Promise<user.DetailAndToken> => {
        return this.post('/user/', signup)
            .then(r => r.data)
            .then(json => user.DetailAndToken.fromObject(json))
            .then(dat =>
                this.storage.setToken(dat.token)
                    .then(() => dat)
            )
    }

    deleteCurrentUser = async () : Promise<void> => {
        this.storage.getUser()
            .then(id => {
                if (!id) {
                    return
                }
                return this.deleteUser(id)
            })
            .then(() => this.storage.clearToken())
    }

    refreshForTest = async (login : user.ILogin) : Promise<void> => {
        await this.login(login)
            .then(token => {
                console.log("Cleaning up stale user for testing...")
                //oops, we still have this user around
                const id = this.storage.getUserFromToken(token)
                return this.deleteUser(id)
            })
            .catch(e => {
                //this means the user doesnt exist, which is what we want
                if (e.response.status == 403) {
                    return
                }
                throw e
            })
            .then(() => {
                this.signup(login)
                    .then(token => {
                        console.log("Using test token " + token.token)
                    })
            })
    }

    deleteUser = async (id : string) : Promise<void> => {
        return this.delete('/user/' + id)
            .then(() => {return})
    }

    login = async (login: user.ILogin) : Promise<string> => {
        return this.post('/user/login/', login)
            .then(r => r.data)
            .then(token => {
                return this.storage.setToken(token)
                    .then(() => token)
            })
    }

    popular = async () : Promise<queue.AllItems> => {
        return this.get('/queue/')
            .then(r => r.data)
            .then(json => queue.AllItems.fromObject(json))
    }

    /*
     *  General purpose below
     */

    delete = async (url: string): Promise<AxiosResponse> => {
        return this.storage.getToken()
            .then(token => {
                const headers = {}

                if (token) {
                    headers['Authorization'] = 'Bearer ' + token
                }

                return this.axios({
                    url: apiUrl + url,
                    method: 'delete',
                    headers: headers,
                    cancelToken: this.cancelSource.token
                })
            })
    }

    get = async (url: string): Promise<AxiosResponse> => {
        return this.storage.getToken()
            .then(token => {
                const headers = {
                    'Accept': 'application/json',
                }

                if (token) {
                    headers['Authorization'] = 'Bearer ' + token
                }

                return this.axios({
                    url: apiUrl + url,
                    method: 'get',
                    headers: headers,
                    cancelToken: this.cancelSource.token
                })
            })
    }

    post = async (url: string, payload: any): Promise<AxiosResponse> => {
        return this.storage.getToken()
            .then(token => {
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                if (token) {
                    headers['Authorization'] = 'Bearer ' + token
                }

                return this.axios({
                    url: apiUrl + url,
                    method: 'post',
                    headers: headers,
                    data: JSON.stringify(payload),
                    cancelToken: this.cancelSource.token
                })
            })
    }

    put = async (url: string, payload: any): Promise<AxiosResponse> => {
        return this.storage.getToken()
            .then(token => {
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                if (token) {
                    headers['Authorization'] = 'Bearer ' + token
                }

                return this.axios({
                    url: apiUrl + url,
                    method: 'put',
                    headers: headers,
                    data: JSON.stringify(payload),
                    cancelToken: this.cancelSource.token
                });
            })
    }
}
