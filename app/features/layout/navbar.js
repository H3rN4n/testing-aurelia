import { inject, computedFrom } from 'aurelia-framework';
import { authService } from '../../core/services/authService';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(authService, EventAggregator)
export class Navbar {
    constructor(authService, EventAggregator){
        this.authService = authService;
        this.ea = EventAggregator;
    }

    @computedFrom('authService', 'authService.user')
    get authenticated() {
      //console.log('this.authService.user');  
      console.log(this.authService.user);
      this.ea.publish('login', {user: this.authService.user});
      return this.authService.user;
    }
}