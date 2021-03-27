import API from "./api/API";
import Storage from "./Storage"

export default class Dependencies {

    static instance = new Dependencies()

    storage = new Storage()
    api = new API(this.storage)


    private constructor() {
        console.log('only once')
    }
}
