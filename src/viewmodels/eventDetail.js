import { inject } from 'aurelia-framework';
import { DataRepository } from '../services/dataRepository';
import {authService} from '../services/authService';
import { Router } from 'aurelia-router';

@inject(DataRepository, Router, authService)

export class EventDetail {
    constructor(dataRepository, router, authService){
        
        this.dataRepository = dataRepository;
        this.router = router;

        this.event = {};
        this.loading = false;
        this.authService = authService;
    }

    

    goToDiscussion(){
        console.log('goToDiscussion')
        //this.router.navigate('#/discussion');
        this.router.navigateToRoute('discussion', {eventId: this.event.id})
    }
    
    activate(params, routeConfig, navigationInstruction){
        return true;
    }

    canActivate(params, routeConfig, navigationInstruction){
        return this.dataRepository.getEvent(parseInt(params.eventId)).then((event)=>{
            this.event = event;
            this.loading = false;
        });
    }
}
