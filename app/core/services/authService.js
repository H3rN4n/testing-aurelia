import { singleton } from 'aurelia-framework';
import _ from 'lodash';

@singleton()
export class authService {
    constructor() {
        this.isUserLoggedIn = false;
        this.authToken = null;
        this.user = null;

        firebase.auth().onAuthStateChanged(user => {
            // TODO Use some user's attribute for proper check
            this.isUserLoggedIn = !!user;
            this.user = user;
        });
    }

    /*
     * @name login
     * @description Method to process login
     * @param {String} type - Provider type
     */
    login(type) {
        let provider;

        // Determine which provider to use depending on provided type
        // which is passed through from shell.html
        switch (type) {
        case 'google':
        case 'facebook':
        case 'twitter':
            provider = new firebase.auth[_.capitalize(type) + 'AuthProvider'];
            break;
        }

        // Process Firebase sign in
        firebase.auth().signInWithPopup(provider).then((result: any) => {
            this.authToken = result.credential.accessToken;
            this.user = result.user;
            this.isUserLoggedIn = true;

        }).catch(error => {
            // How are these 'lets' being used?
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
        });
    }

    /*
     * @name logout
     * @description Method to process logout
     */
    logout() {
        firebase.auth().signOut().then(() => {
            this.isUserLoggedIn = false;
        }).catch(error => {
            throw new Error(error);
        });
    }

}
