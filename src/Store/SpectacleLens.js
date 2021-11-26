import {makeAutoObservable} from "mobx"

class SpectacleLens {
    object = {
        lens_type: '',
        lens_style: '',
        lens_material: '',
        lens_color: '',
        anti_reflective_type: '',
        scratch_resistant_type: '',
        transitions_type: '',
        other: '',
        price:''
    }


    constructor() {
        makeAutoObservable(this)
    }

    setPrice(value){
        this.price = value
    }

    edit(field, value) {
        this.object[field] = value
    }

    create(object) {
        this.object = object
    }

    reset() {
        this.object = {
            lens_type: '',
            lens_style: '',
            lens_material: '',
            lens_color: '',
            anti_reflective_type: '',
            scratch_resistant_type: '',
            transitions_type: '',
            other: ''
        }
    }

}

export default new SpectacleLens()
