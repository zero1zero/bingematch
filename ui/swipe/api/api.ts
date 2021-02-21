import { load } from "protobufjs";
import {queue} from "../model/compiled";
import fetch from "node-fetch"

export default class Api {


    popular() : Promise<queue.AllItems> {
        console.log('Loading popular...')
        return fetch('http://192.168.64.2/api/queue/', {
            method: 'GET',
        }).then(r => {
            return r.json()
        }).then(json => {
            return queue.AllItems.fromObject(json)
        }).catch(e => {
            console.log(e)
        })
    }
}
