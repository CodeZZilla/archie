import {makeAutoObservable} from "mobx"

class Patient {
    object = {
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
        referred_by: '',
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
            referred_by: '',
            street_address_extra: ''
        }
    }

}

export default new Patient()