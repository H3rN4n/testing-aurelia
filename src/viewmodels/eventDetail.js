import { inject } from 'aurelia-framework';
import { DataRepository } from '../services/dataRepository';

@inject(DataRepository)

export class EventDetail {
    constructor(dataRepository){
        this.event = {};
        this.dataRepository = dataRepository;
        this.loading = false;
        console.log('Event Detail Constructor');
    }
    
    activate(params, routeConfig, navigationInstruction){
        //console.log(params, routeConfig, navigationInstruction);
        console.log('event detail activated');
        this.loading = true;
        this.dataRepository.getEvent(parseInt(params.eventId)).then((event)=>{
            this.event = event;
            this.loading = false;
        });
    }
}