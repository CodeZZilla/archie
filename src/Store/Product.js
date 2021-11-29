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
        sku: '',
        sku_barcode: '',
        status: true,
        tax: '',
        taxable: '',
        temple_length: '',
        threshold_value: '',
        total: '',
        wholesale_price: ''
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
            sku: '',
            sku_barcode: '',
            status: true,
            tax: '',
            taxable: '',
            temple_length: '',
            threshold_value: '',
            total: '',
            wholesale_price: ''
        }
    }

}

export default new Product()