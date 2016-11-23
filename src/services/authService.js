import {singleton} from 'aurelia-framework';
//import {transient} from 'aurelia-framework';

@singleton()
//@transient()

export class authService {
    constructor(){
        this.userLoggedIn = false;
        this.authToken = null;
        this.user = null;

        firebase.auth().onAuthStateChanged(user => {
            this.userLoggedIn = user ? true : false;
            this.user = user;
        });
    }

    login(type) {
            let provider;

            // Determine which provider to use depending on provided type
            // which is passed through from app.html
            if (type === 'google') {
                provider = new firebase.auth.GoogleAuthProvider();
            } else if (type === 'facebook') {
                provider = new firebase.auth.FacebookAuthProvider();
            } else if (type === 'twitter') {
                provider = new firebase.auth.TwitterAuthProvider();
            }

            // Call the Firebase signin method for our provider
            // then take the successful or failed result and deal with
            // it accordingly.
            firebase.auth().signInWithPopup(provider).then((result: any) => {
                // The token for this session
                this.authToken = result.credential.accessToken;

                // The user object containing information about the current user
                this.user = result.user;

                // Set a class variable to true to state we are logged in
                this.userLoggedIn = true;
            }).catch(error => {
                let errorCode = error.code;
                let errorMessage = error.message;
                let email = error.email;
                let credential = error.credential;
            });
        }

        logout() {
            // Self-explanatory signout code
            firebase.auth().signOut().then(() => {
                this.userLoggedIn = false;
            }).catch(error => {
                throw new Error(error);
            });
        }
    
}