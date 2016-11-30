import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DataRepository } from '../../core/services/dataRepository';
import { authService } from '../../core/services/authService';

@inject(DataRepository,
        Router,
        authService)

export class EventDetail {
    constructor(dataRepository, router, authService){
        this.dataRepository = dataRepository;
        this.router = router;
        this.authService = authService;

        this.event = {};
        this.loading = false;
    }

    goToDiscussion(){
        console.log('goToDiscussion')
        //this.router.navigate('#/discussion');
        this.router.navigateToRoute('discussion', {eventId: this.event.id})
    }

    doSomething(){
        console.log('aurelia sucks!');
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
