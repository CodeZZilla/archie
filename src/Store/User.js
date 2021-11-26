import {makeAutoObservable} from "mobx"

class User {
    object = {
        objectIdRole: 'null',
        city: '',
        street: '',
        state: '',
        RoleTmp: 'UserLocation',
        first_name: '',
        email: '',
        zip: '',
        last_name: '',
        phone: '',
        login: '',
        password: '',
        status: true
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
            objectIdRole: 'null',
            city: '',
            street: '',
            state: '',
            first_name: '',
            email: '',
            zip: '',
            last_name: '',
            phone: '',
            login: '',
            password: '',
            status: true
        }
    }

}

export default new User()