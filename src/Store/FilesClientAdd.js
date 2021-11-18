import {makeAutoObservable} from "mobx"

class FilesClientAdd {
    array = []

    constructor() {
        makeAutoObservable(this)
    }

    getFiles(){
        return this.array
    }

    setFiles(array){
        this.array = array
    }

    reset() {
        this.array = []
    }

}

export default new FilesClientAdd()
