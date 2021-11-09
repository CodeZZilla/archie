import {makeAutoObservable} from "mobx"

class Location {
    object = {
        name_location:'',
        city_town: '',
        email: '',
        main_contact: '',
        street_address: '',
        street_address_extra: '',
        state_province: '',
        zip_code: '',
        phone: '',
        tax_id: '',
        website: ''
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
            name_location:'',
            city_town: '',
            email: '',
            main_contact: '',
            street_address: '',
            street_address_extra: '',
            state_province: '',
            zip_code: '',
            phone: '',
            tax_id: '',
            website: ''
        }
    }

}

export default new Location()