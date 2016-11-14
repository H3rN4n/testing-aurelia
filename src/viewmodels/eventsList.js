import { inject } from 'aurelia-framework';
import { DataRepository } from '../services/dataRepository';
import { Router, ActivationStrategy } from 'aurelia-router';
//import lodash

@inject(DataRepository, Router)

export class EventsList{
    constructor(dataRepository, router){
        console.log('CTOR')
        this.loading = true;
        this.events = [];
        this.dataRepository = dataRepository;
        this.router = router;   
        this.activationStrategy = ActivationStrategy;
    }

    activate(params, routeConfig){
        var pastOrFuture = routeConfig.name == "" ? 'future' : routeConfig.name;
        let promise = new Promise((resolve, reject) => {
            
            return this.dataRepository.getEvents().then((events) => {
                if(params.speaker || params.topic){
                    var filteredResults = [];
                    events.forEach(item => {
                        if(params.speaker && item.speaker.toLowerCase().indexOf(params.speaker.toLowerCase()) >= 0){
                        filteredResults.push(item);   
                        }
                        if(params.topic && item.topic.toLowerCase().indexOf(params.topic.toLowerCase()) >= 0){
                        filteredResults.push(item);   
                        }
                    })
                    this.events = filteredResults;
                } else {
                    this.events = events;   
                }

                this.events.forEach((item) => {
                    item.detailUrl = this.router.generate('eventDetail', {
                        eventId: item.id
                    });
                });
                this.loading = false;
                resolve();
            }, (err) => {
                console.log(err);
                resolve();
            });
        })
        return promise;
    }

    canDeactivate(){
        console.log('canDeactivate');
        return true;
    }

    deactivate(){
        console.log('deactivate');
        return true;
    }

    canActivate(params, routeConfig){
        console.log('canActivate');
        return true;
    }

    determineActuvationStrategy() {
        console.log('determine activationStrategy called');
        console.log(activationStrategy);
        return activationStrategy.replace;
        //return activationStrategy.invokeLifecycle;
    }
} 