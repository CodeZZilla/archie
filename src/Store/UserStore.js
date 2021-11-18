import Backendless from "backendless";
import {makeAutoObservable} from "mobx";

class UserStore {
    currentUser;
    loadingUser;
    updatingUser;
    updatingUserErrors;

    constructor() {
        makeAutoObservable(this)
    }

    pullUser() {
        this.loadingUser = true;
        return Backendless.UserService.getCurrentUser()
            .then((user) => {
                this.currentUser = user;
            })
            .finally(() => {
                this.loadingUser = false;
            })
    }

    updateUser(newUser) {
        // this.updatingUser = true;
        // return agent.Auth.save(newUser)
        //     .then(action(({ user }) => { this.currentUser = user; }))
        //     .finally(action(() => { this.updatingUser = false; }))
    }

    forgetUser() {
        Backendless.UserService.logout()
            .then(() => {
                this.currentUser = null
            })
            .catch(function (error) {
                console.log("Error logout: " + error.message)
            });
    }
}

export default new UserStore();