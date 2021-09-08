import {show, user} from "../model/compiled";
import Storage from '../Storage'

import getEnvVars from '../../environment';
import {AxiosResponse} from "axios";
import jwt_decode from "jwt-decode";

const {apiUrl} = getEnvVars();

export default class API {

    private axios = require('axios').default;
    private cancelToken = this.axios.CancelToken;
    private cancelSource = this.cancelToken.source()

    private storage: Storage

    constructor(storage: Storage) {
        this.storage = storage
    }

    cleanup = async () => {
        await this.cancelSource.cancel("Manually aborted by application")
    }

    signup = async (signup: user.IRegister): Promise<user.IDetailAndToken> => {
        let response = await this.post('/user/', signup)

        // let dat = user.DetailAndToken.fromObject(response.data).toJSON()
        const dat = response.data
        await this.storage.setToken(dat.token)
        console.log(dat.token)

        return dat
    }

    refreshForTest = async (login: user.ILogin): Promise<void> => {
        await this.login(login)
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
                return this.signup(login)
                    .then(token => {
                        const id = this.storage.getUserFromToken(token.token)
                        console.log(`Created test ${id} test token ${token.token}`)
                    })
            })
    }

    deleteUser = async (id: string): Promise<void> => {
        return this.delete('/user/' + id)
            .then(() => {
                return
            })
    }

    login = async (login: user.ILogin): Promise<string> => {
        let response = await this.post('/user/login/', login)

        let token = response.data
        await this.storage.setToken(token)

        const id = await this.storage.getUserId()
        console.log(`user: ${id}`)
        console.log(jwt_decode(token))

        return token
    }

    userUpdate = async (user: user.IUpdate): Promise<void> => {
        this.storage.getUserId()
            .then(id => {
                this.put('/user/' + id, user)
            })
    }

    getUser = async (): Promise<user.IDetail> => {
        return this.storage.getUserId()
            .then(id => (
                this.get('/user/' + id)
                    .then(r => r.data as user.IDetail)
                    // .then(json => user.Detail.fromObject(json).toJSON())
            ))
    }

    getQueue = async (): Promise<user.IQueuedShow[]> => {
        return this.get('/lists/queued')
            .then(r => r.data as user.IQueuedShow[])
            // .then(json => queue.QueuedItems.fromObject(json).toJSON())
    }

    getLikes = async (): Promise<user.ILikedShow[]> => {
        return this.get('/lists/liked')
            .then(r => r.data as user.ILikedShow[])
            // .then(json => queue.QueuedItems.fromObject(json).toJSON())
    }

    getShow = async (id: string): Promise<show.IDetail> => (
        this.get(`/show/${id}`)
            .then(r => r.data as show.IDetail)
            // .then(json => show.Detail.fromObject(json).toJSON())
    )

    getShows = async (id: string[]): Promise<show.IDetail[]> => (
        this.get(`/show?id=${id.join(',')}`)
            .then(r => r.data as show.IDetail[])
        // .then(json => show.Detail.fromObject(json).toJSON())
    )

    like = async (show: string): Promise<void> => {
        return this.put(`/lists/like/${show}`)
            .then(() => {
                return
            })
    }

    watched = async (show: string, rating: number): Promise<void> => {
        return this.put(`/lists/watched/${show}`, {show, rating})
            .then(() => {
                return
            })
    }

    dislike = async (show: string): Promise<void> => {
        return this.put(`/lists/dislike/${show}`)
            .then(() => {
                return
            })
    }

    back = async (show: string): Promise<void> => {
        return this.put(`/lists/back/${show}`)
            .then(() => {
                return
            })
    }

    getGenres = async (): Promise<show.Genre[]> => (
        this.get(`/genres`)
            .then(r => r.data as show.Genre[])
            // .then(json => json.map(genre => show.Genre.fromObject(genre).toJSON()))
    )

    setGenres = async (genres : show.IGenre[]): Promise<void> => (
        this.storage.getUserId()
            .then(id => {
                    this.put(`/user/${id}/genres`, genres.map(g => g.id))
                }
            )
    )

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

    put = async (url: string, payload: any = ""): Promise<AxiosResponse> => {
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

    deleteUserWithLogin = async (login: user.ILogin): Promise<void> => {
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

    deleteCurrentUser = async (): Promise<void> => {
        let id = await this.storage.getUserId()

        if (!id) {
            console.log("No current user to delete... test probably failed")
            return
        }

        await this.deleteUser(id)
        await this.storage.clearToken()
    }

}
