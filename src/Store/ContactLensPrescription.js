import {makeAutoObservable} from "mobx"

class ContactLensPrescription {
    object = {
        contact_presc_img: '',
        pwr_left: '',
        cyl_right: '',
        lens_type: '',
        bc_right: '',
        lens_color: '',
        lens_model: '',
        add_right: '',
        lens_disinfection: '',
        contact_presc_expries: '',
        pwr_right: '',
        lens_modality: '',
        lens_brand: '',
        cyl_left: '',
        axis_left: '',
        add_left: '',
        contact_desing: '',
        bc_left: '',
        axis_right: '',
        dia_left: '',
        dia_right: '',
        client: '',
        doctor: '',
        prescription_date: ''
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
            prescription_date: '',
            doctor: '',
            client: '',
            contact_presc_img: '',
            pwr_left: '',
            cyl_right: '',
            lens_type: '',
            bc_right: '',
            lens_color: '',
            lens_model: '',
            add_right: '',
            lens_disinfection: '',
            contact_presc_expries: '',
            pwr_right: '',
            lens_modality: '',
            lens_brand: '',
            cyl_left: '',
            axis_left: '',
            add_left: '',
            contact_desing: '',
            bc_left: '',
            axis_right: '',
            dia_left: '',
            dia_right: ''
        }
    }

}

export default new ContactLensPrescription()
