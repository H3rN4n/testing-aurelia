import { inject } from 'aurelia-framework';
import { DataRepository } from '../services/dataRepository';
import { Router } from 'aurelia-router';
import { MdToastService } from 'aurelia-materialize-bridge';

@inject(DataRepository, Router, MdToastService)

export class EventDetail {
    constructor(dataRepository, router, toast){
        
        this.dataRepository = dataRepository;
        this.router = router;
        this.toast = toast;

        this.event = {};
        this.loading = false;
        this.isModalVisible = false;
        
    }

    modalClosed(){
        console.log('modalClosed');
    }

    goToDiscussion(){
        console.log('goToDiscussion')
        //this.router.navigate('#/discussion');
        this.router.navigateToRoute('discussion', {eventId: this.event.id})
    }
    
    activate(params, routeConfig, navigationInstruction){
        
    }

    canActivate(params, routeConfig, navigationInstruction){
        return this.dataRepository.getEvent(parseInt(params.eventId)).then((event)=>{
            this.event = event;
            this.loading = false;
        });
    }
}

class Modal{
    run(navigationInstruction, next){
        return next().then(result => {
            this.isModalVisible = true;
        })
    }
}