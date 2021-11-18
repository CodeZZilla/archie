import Backendless from "backendless";
import userStore from './UserStore';
import commonStore from './CommonStore';
import {makeAutoObservable} from "mobx";

class AuthStore {
    inProgress = false;
    errors = undefined;

    values = {
        username: '',
        email: '',
        password: '',
    };

    constructor() {
        makeAutoObservable(this)
    }

    setUsername(username) {
        this.values.username = username;
    }

    setEmail(email) {
        this.values.email = email;
    }

    setPassword(password) {
        this.values.password = password;
    }

    reset() {
        this.values.username = '';
        this.values.email = '';
        this.values.password = '';
    }

    login() {
        this.inProgress = true;
        this.errors = undefined;
        return Backendless.UserService.login(this.values.email, this.values.password, true)
            .then((loggedInUser) => {
                console.log(loggedInUser)
                commonStore.setToken(loggedInUser['user-token']+"___"+loggedInUser['RoleTmp'])
            })
            .then(() => userStore.pullUser())
            .catch((error) => {
                this.errors = error.message;
                throw error;
            })
            .finally(() => {
                this.inProgress = false;
            });
    }

    // @action register() {
    //     this.inProgress = true;
    //     this.errors = undefined;
    //     return agent.Auth.register(this.values.username, this.values.email, this.values.password)
    //         .then(({user}) => commonStore.setToken(user.token))
    //         .then(() => userStore.pullUser())
    //         .catch(action((err) => {
    //             this.errors = err.response && err.response.body && err.response.body.errors;
    //             throw err;
    //         }))
    //         .finally(action(() => {
    //             this.inProgress = false;
    //         }));
    // }

    logout() {
        commonStore.removeToken();
        userStore.forgetUser();
        return Promise.resolve();
    }
}

export default new AuthStore();