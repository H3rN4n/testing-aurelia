import {authService} from '../services/authService';
import {inject, computedFrom} from 'aurelia-framework';

@inject(authService)

export class Sponsors{
    constructor(authService){
        this.mapCollection = new window.Map();
        this.mapCollection.set("A", "Alpha");
        this.mapCollection.set("B", "Beta");
        this.mapCollection.set("C", "Charlie");
        this.mapCollection.set("D", "Delta");
        this.authService = authService; 
    }

    // @computedFrom('authService.authenticated')
    // get authenticated() {
    //     return this.authService.authenticated;
    // } 

    activate(){
        // this.authService.getMe()
        // .then(profile => {
        //     console.log(profile.username);
        // });
        // return true;
        //console.log(this.authService);
        
    }
}