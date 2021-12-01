import {makeAutoObservable} from "mobx"

class OrderProducts {
    array = [
        {
            itemDetails: null,
            quantity: '0',
            rate: '0',
            discount: '0',
            discountTag: '$',
            amount: '0'
        }
    ]

    subTotal = 0

    shippingCharges = 0

    total = 0

    otherField = {
        text: '',
        price: 0
    }

    constructor() {
        makeAutoObservable(this)
    }

    editOtherField(field, value) {
        this.otherField[field] = value
        this.generateTotal()
    }

    setShippingCharges(value) {
        this.shippingCharges = value
        this.generateTotal()
    }

    addRow() {
        this.array.push({
            itemDetails: null,
            quantity: '0',
            rate: '0',
            discount: '0',
            discountTag: '$',
            amount: '0'
        })
    }

    cloneItem(index) {
        const clone = JSON.parse(JSON.stringify(this.array[index]));
        this.array.push(clone)
        this.generateSum()
    }

    removeRow(index) {
        if (this.array.length !== 1) {
            this.array = this.array.filter((v, i) => i !== index)
        }
        this.generateSum()
    }

    edit(index, field, value) {
        this.array[index][field] = value

        if (field === 'itemDetails') {
            try {
                this.array[index].rate = value.rate
                this.array[index].quantity = value.quantity
                this.array[index].amount = value.quantity * value.rate
            } catch (e) {
                this.array[index].rate = '0'
                this.array[index].quantity = '0'
                this.array[index].amount = '0'
            }
        } else {
            if (this.array[index].itemDetails !== null) {
                let sum = this.array[index].quantity * this.array[index].rate
                if (this.array[index].discountTag === '%') {
                    this.array[index].amount = sum - (sum / 100 * this.array[index].discount)
                } else {
                    this.array[index].amount = sum - this.array[index].discount
                }
            }
        }
        this.generateSum()
    }

    generateTotal() {
        this.total = Number.parseFloat(this.subTotal !== '' ? this.subTotal : '0')
            + Number.parseFloat(this.shippingCharges !== '' ? this.shippingCharges : '0')
            + Number.parseFloat(this.otherField.price !== '' ? this.otherField.price  : '0')
    }

    generateSum() {
        this.subTotal = 0
        this.array.map(value => {
            this.subTotal += value.amount
        })
        this.generateTotal()
    }

    create(array) {
        this.array = array
    }

    resetAll() {
        this.array = [
            {
                itemDetails: null,
                quantity: '0',
                rate: '0',
                discount: '0',
                discountTag: '$',
                amount: '0'
            }
        ]
        this.subTotal = 0
        this.shippingCharges = 0
        this.total = 0
        this.otherField = {
            text: '',
            price: 0
        }
    }
}

export default new OrderProducts()