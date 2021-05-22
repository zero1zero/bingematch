import {queue, show, user} from "../model/compiled";
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

    cleanup = async () => {
        await this.cancelSource.cancel("Manually aborted by application")
    }

    signup = async (signup: user.IRegister) : Promise<user.DetailAndToken> => {
        let response = await this.post('/user/', signup)

        let dat = user.DetailAndToken.fromObject(response.data)
        await this.storage.setToken(dat.token)

        return dat
    }

    refreshForTest = async (login : user.ILogin) : Promise<void> => {
        this.login(login)
            .then(token => {
                console.debug("Cleaning up stale user for testing...")
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
        let response = await this.post('/user/login/', login)

        let token = response.data
        await this.storage.setToken(token)

        return token
    }

    userUpdate = async (user: user.IUpdate) : Promise<void> => {
        this.storage.getUser()
            .then(id => {
                this.put('/user/' + id, user)
            })
    }

    getQueue = async () : Promise<queue.QueuedItems> => {
        return this.get('/queue/')
            .then(r => r.data)
            .then(json => queue.QueuedItems.fromObject(json))
    }

    getShow = async (id : string) : Promise<show.Detail> => {
        return this.get(`/show/${id}`)
            .then(r => r.data)
            .then(json => show.Detail.fromObject(json))
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


    /*
     * For testing
     */

    deleteUserWithLogin = async (login : user.ILogin) : Promise<void> => {
        let token = this.login(login)
            .then(async (token) => {
                const id = this.storage.getUserFromToken(token)

                await this.deleteUser(id)
                await this.storage.clearToken()
            })
            .catch(e => {
                //nothing
            })
    }

    deleteCurrentUser = async () : Promise<void> => {
        let id = await this.storage.getUser()

        if (!id) {
            console.log("No current user to delete... test probably failed")
            return
        }

        await this.deleteUser(id)
        await this.storage.clearToken()
    }

}
