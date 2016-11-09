import { inject } from 'aurelia-framework';
import { DataRepository } from '../services/dataRepository';

@inject(DataRepository)

export class Events{
    constructor(dataRepository){
        this.loading = true;
        this.events = [];
        dataRepository.getEvents().then((events) => {
            this.events = events;
            this.loading = false;
        }, (err) => {
            console.log(err);
        });
    }

    activate(){
        
    }
} 