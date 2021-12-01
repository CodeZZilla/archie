import {makeAutoObservable} from "mobx"
import {getRelObjectDepth1} from "../Business/BackendlessRequest";

class Order {
    object = {
        date: new Date(),
        client: null,
        location: null,
        doctor: null,
        policy: null,
        primary:null,
        selectedInsurance:[]
    }


    insuranceByUser = []

    insuranceByUserId = 'Unselected'

    contactLensPrescriptionByUser = []

    spectaclePrescriptionByUser = []

    contactLensPrescriptionId = 'Unselected'

    spectaclePrescriptionId = 'Unselected'

    constructor() {
        makeAutoObservable(this)
    }

    setInsuranceId(value) {
        this.insuranceByUserId = value
    }

    setContactLensPrescriptionId(value) {
        this.contactLensPrescriptionId = value
    }

    setSpectaclePrescriptionId(value) {
        this.spectaclePrescriptionId = value
    }

    edit(field, value) {
        if (field === "client" && value !== "Unselected") {
            getRelObjectDepth1(value, "Client").then(client => {
                this.object[field] = value
                if (client.contact_lens_pr !== undefined) {
                    this.contactLensPrescriptionByUser = client.contact_lens_pr
                } else {
                    this.contactLensPrescriptionByUser = []
                }

                if (client.spectacle_prescriptions !== undefined) {
                    this.spectaclePrescriptionByUser = client.spectacle_prescriptions
                } else {
                    this.spectaclePrescriptionByUser = []
                }
            })
        } else {
            this.object[field] = value
            this.contactLensPrescriptionByUser = []
            this.spectaclePrescriptionByUser = []
        }
    }

    create(object) {
        this.object = object
    }


    reset() {
        this.object = {
            date: new Date(),
            client: null,
            location: null,
            doctor: null,
            policy: null,
            primary:null,
            selectedInsurance:[]
        }
    }

}

export default new Order()