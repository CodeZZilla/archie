import {makeAutoObservable} from "mobx"

class AlertStatus {
    status = false
    title = ''
    msg = ''
    variant = ''

    constructor() {
        makeAutoObservable(this)
    }

    setAll(status, title, msg, variant) {
        this.status = status
        this.title = title
        this.msg = msg
        this.variant = variant
    }

    setStatus(value) {
        this.status = value
    }

    setTitle(value) {
        this.title = value
    }

    setMsg(value) {
        this.msg = value
    }

    setVariant(value) {
        this.variant = value
    }
}

export default new AlertStatus()