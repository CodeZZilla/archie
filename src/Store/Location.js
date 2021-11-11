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
        website: '',
        userAdmin: {},
        otherUsers:[]
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

    getLocationDb(){
        return {
            name_location:this.object.name_location,
            city_town: this.object.city_town,
            email: this.object.email,
            main_contact: this.object.main_contact,
            street_address: this.object.street_address,
            street_address_extra: this.object.street_address_extra,
            state_province: this.object.state_province,
            zip_code: this.object.zip_code,
            phone: this.object.phone,
            tax_id: this.object.tax_id,
            website: this.object.website
        }
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
            website: '',
            userAdmin: {},
            otherUsers:[]
        }
    }

}

export default new Location()