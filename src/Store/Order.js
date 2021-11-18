import {makeAutoObservable} from "mobx"

class Order {
    object = {
        date: null,
        client: null,
        location: null,
        insurance: null,
        doctor: null,
        policy: null
    }

    constructor() {
        makeAutoObservable(this)
    }

    edit(field, value) {
        this.object[field] = value
    }

    create(object){
        this.object = object
    }


    reset(){
        this.object = {
            date: null,
            client: null,
            location: null,
            insurance: null,
            doctor: null,
            policy: null
        }
    }

}

export default new Order()