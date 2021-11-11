import {makeAutoObservable} from "mobx"

class SpectaclePrescription {
    object =  {
        l_base_1: '',
        l_base_2: '',
        l_cylinder: '',
        r_cylinder: '',
        l_sphere: '',
        spectacle_prescription_img:'',
        r_base_2: '',
        r_base_1: '',
        prescription_date: '',
        l_prism_1:'',
        l_add: '',
        l_prism_2: '',
        r_pd: '',
        l_pd: '',
        client:'',
        decentration_l: '',
        total_dec: '',
        decentration_r: '',
        order_type: '',
        l_axis: '',
        inset: '',
        r_add: '',
        r_prism_2: '',
        r_prism_1: '',
        doctor: '',
        r_sphere: '',
        r_height: '',
        l_height: '',
        r_axis:''
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
        this.object =  {
            l_base_1: '',
            l_base_2: '',
            l_cylinder: '',
            r_cylinder: '',
            l_sphere: '',
            spectacle_prescription_img:'',
            r_base_2: '',
            r_base_1: '',
            prescription_date: '',
            l_prism_1:'',
            l_add: '',
            r_pd: '',
            l_prism_2: '',
            l_pd: '',
            client:'',
            decentration_l: '',
            total_dec: '',
            decentration_r: '',
            order_type: '',
            l_axis: '',
            inset: '',
            r_add: '',
            r_prism_2: '',
            r_prism_1: '',
            doctor: '',
            r_sphere: '',
            r_height: '',
            l_height: '',
            r_axis:''
        }
    }

}

export default new SpectaclePrescription()
