import {makeAutoObservable} from 'mobx';

class CommonStore {

    appName = 'Archie';
    token = window.localStorage.getItem('jwt');
    appLoaded = false;

    tags = [];
    isLoadingTags = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadTags() {
        // this.isLoadingTags = true;
        // return agent.Tags.getAll()
        //     .then(action(({ tags }) => { this.tags = tags.map(t => t.toLowerCase()); }))
        //     .finally(action(() => { this.isLoadingTags = false; }))
    }

    setToken(token) {
        window.localStorage.setItem('jwt', token)
        this.token = token;
    }

    removeToken(){
        window.localStorage.removeItem('jwt')
        this.token = null
    }

    setAppLoaded() {
        this.appLoaded = true;
    }

}

export default new CommonStore();