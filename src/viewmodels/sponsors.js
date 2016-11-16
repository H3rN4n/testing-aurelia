import {AuthService} from 'aurelia-authentication';
import {inject, computedFrom} from 'aurelia-framework';

@inject(AuthService)

export class Sponsors{
    constructor(authService){
        this.mapCollection = new window.Map();
        this.mapCollection.set("A", "Alpha");
        this.mapCollection.set("B", "Beta");
        this.mapCollection.set("C", "Charlie");
        this.mapCollection.set("D", "Delta");

        this.authService = authService; 
    }

    // make a getter to get the authentication status.
    // use computedFrom to avoid dirty checking
    @computedFrom('authService.authenticated')
    get authenticated() {
      return this.authService.authenticated;
    }

    authenticate(name) {
        return this.authService.authenticate(name)
        .then(response => {
            console.log("auth response " + response);
        }, (res) => {
            console.log(res);
        });
    }

    doSomething(foo){
        console.log(foo);
    }

    activate(){
        return true;
    }
}