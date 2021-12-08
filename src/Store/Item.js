import {makeAutoObservable} from "mobx"

class Item {
    object = {
        type:"Product",
        selling_price:"",
        sales:"",
        returnable_item:false,
        reorder_point:"",
        preferred_vendor:"",
        opening_stock_rate_per_unit:"",
        opening_stock:"",
        description_purchase:"",
        description:"",
        cost_price:"",
        account_purchase:"",
        account_inventory:"",
        account:""
    }

    files = []

    constructor() {
        makeAutoObservable(this)
    }

    getFiles(){
        return this.files
    }

    edit(field, value) {
        this.object[field] = value
    }

    setFiles(object){
        this.files = object
    }

    reset() {
        this.object = {
            type:"",
            selling_price:"",
            sales:"",
            returnable_item:false,
            reorder_point:"",
            preferred_vendor:"",
            opening_stock_rate_per_unit:"",
            opening_stock:"",
            description_purchase:"",
            description:"",
            cost_price:"",
            account_purchase:"",
            account_inventory:"",
            account:""
        }
    }

}

export default new Item()
