import {makeAutoObservable} from "mobx"

class Product {
    object = {
        available_stock: '',
        bridge_size: '',
        eye_size: '',
        frame_a: '',
        frame_b: '',
        frame_circumference: '',
        frame_color: '',
        frame_dbl: '',
        frame_ed: '',
        frame_type: '',
        manufacturer: '',
        notes: '',
        price_each: '',
        product_1_qty: '',
        product_category: '',
        product_image: '',
        product_name: '',
        qty: '',
        retail_price: '',
        hippa_consent_date: '',
        phone_day: '',
        active: true,
        last_name: '',
        employment: '',
        hobbies_activities: '',
        middle_name: '',
        uploads: '',
        contact_method: '',
        incurance_number: '',
        city_town: '',
        referred_by: 'null',
        street_address_extra: ''
    }

    constructor() {
        makeAutoObservable(this)
    }

    edit(field, value) {
        this.object[field] = value
    }

    create(object) {
        this.object = object
    }

    reset() {
        this.object = {
            street_address: '',
            img: '',
            notes: '',
            gender: '',
            phone_work: '',
            title: '',
            suffix: '',
            ownerId: '',
            ssn: '',
            nickname: '',
            state: '',
            insurance_providers: '',
            first_name: '',
            email: '',
            date_of_birthday: null,
            zip: '',
            hippa_consent: '',
            ext: '',
            phone_mobile: '',
            hippa_consent_date: null,
            phone_day: '',
            active: true,
            last_name: '',
            employment: '',
            hobbies_activities: '',
            middle_name: '',
            uploads: '',
            contact_method: '',
            incurance_number: '',
            city_town: '',
            referred_by: 'null',
            street_address_extra: ''
        }
    }

}

export default new Product()