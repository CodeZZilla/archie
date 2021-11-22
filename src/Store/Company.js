import {makeAutoObservable} from "mobx"

class Company {
    object = {
        name_company: '',
        warehouse: false,
        city_town: '',
        email: '',
        main_contact: '',
        street_address: '',
        street_address_extra: '',
        state_province: '',
        zip_code: '',
        phone: '',
        tax_id: '',
        website_company: ''
    }

    adminCompany = {
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

    listLocation = [] // [{ ..., userAdmin:{}, otherUsers:[{}, {}...] }]

    constructor() {
        makeAutoObservable(this)
    }

    createObject(object) {
        this.object = object
    }

    edit(field, value) {
        this.object[field] = value
    }

    editAdminCompanyObject(object) {
        this.adminCompany = object
    }

    setCompany(object){
        this.object = object
    }

    editAdminCompany(field, value) {
        this.adminCompany[field] = value
    }

    addListLocationItem(object) {
        this.listLocation.push(object)
    }

    removeListLocationItem(index) {
        this.listLocation = this.listLocation.filter((item, i) => i !== index)
    }

    removeListLocationOtherUsers(indexLocation, index) {
        this.listLocation[indexLocation].otherUsers = this.listLocation[indexLocation].otherUsers.filter((item, i) => i !== index)
    }

    removeListLocationAdminUser(index) {
        this.listLocation[index].userAdmin = {
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

    editLocationByIndex(index, object) {
        this.listLocation[index] = object
    }

    editLocationFieldByIndex(index, field, value) {
        this.listLocation[index][field] = value
    }

    getLocation(index) {
        return this.listLocation[index]
    }


    getAdminCompanyDb() {
        return {
            city: this.adminCompany.city,
            street: this.adminCompany.street,
            state: this.adminCompany.state,
            first_name: this.adminCompany.first_name,
            email: this.adminCompany.email,
            zip: this.adminCompany.zip,
            last_name: this.adminCompany.last_name,
            phone: this.adminCompany.phone,
            login: this.adminCompany.login,
            password: this.adminCompany.password,
            status: this.adminCompany.status
        }
    }

    resetCompany() {
        this.object = {
            name_company: '',
            warehouse: false,
            city_town: '',
            email: '',
            main_contact: '',
            street_address: '',
            street_address_extra: '',
            state_province: '',
            zip_code: '',
            phone: '',
            tax_id: '',
            website_company: ''
        }

        this.adminCompany = {
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

        this.listLocation = []
    }
}

export default new Company()