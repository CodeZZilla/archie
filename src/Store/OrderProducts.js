import {makeAutoObservable} from "mobx"

class OrderProducts {
    array = [
        {
            itemDetails: null,
            quantity: '',
            rate: '',
            discount: '0',
            discountTag: '$',
            amount: '0'
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }

    addRow(){
        this.array.push({
            itemDetails: null,
            quantity: '',
            rate: '',
            discount: '0',
            discountTag: '$',
            amount: '0'
        })
    }

    cloneItem(index){
        this.array.push(this.array[index])
    }

    removeRow(index) {
        if(this.array.length !== 1){
            this.array = this.array.filter((v, i) => i !== index)
        }
    }

    edit(index, field, value) {
        this.array[index][field] = value
        if (field === 'itemDetails') {
            this.array[index].rate = value.rate
            this.array[index].quantity = value.quantity
            this.array[index].amount = value.quantity * value.rate
        } else if (field === 'discountTag' || field === 'discount'){
            if (this.array[index].amount !== '0'){
                if (value === '%'){
                    this.array[index].amount -= this.array[index].amount * this.array[index].discount / 100
                } else {
                    this.array[index].amount -= this.array[index].discount
                }
            }
        }
    }

    create(array) {
        this.array = array
    }

    reset() {
        this.array = []
    }

}

export default new OrderProducts()