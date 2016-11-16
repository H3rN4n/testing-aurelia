import { inject } from 'aurelia-framework';
import { DataRepository } from '../services/dataRepository';
import { Router } from 'aurelia-router';

@inject(DataRepository, Router)

export class EventDetail {
    constructor(dataRepository, router){
        
        this.dataRepository = dataRepository;
        this.router = router;

        this.event = {};
        this.loading = false;
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
