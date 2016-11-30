import { inject, computedFrom } from 'aurelia-framework';
import { authService } from '../../core/services/authService';

@inject(authService)
export class Navbar {
    constructor(authService){
        this.authService = authService;
    }

    @computedFrom('authService.user')
    get authenticated() {
      //console.log('this.authService.user');  
      console.log(this.authService.user);
      return this.authService.user;
    }
}