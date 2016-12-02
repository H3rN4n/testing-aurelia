import { inject,
         computedFrom } from 'aurelia-framework';
import { Router,
         activationStrategy } from 'aurelia-router';
import { authService } from '../../core/services/authService';
import { DataRepository } from '../../core/services/dataRepository';
import { ArticleService } from '../../core/services/articleService';

import { EventAggregator } from 'aurelia-event-aggregator';

@inject(DataRepository,
        Router,
        authService,
        ArticleService,
        EventAggregator)

export class List {
    constructor(dataRepository, router, authService, ArticleService, EventAggregator) {
        this.loading = true;
        this.events = [];
        this.dataRepository = dataRepository;
        this.router = router;
        this.authService = authService;
        this.ArticleService = ArticleService;
        this.ea = EventAggregator;
    }

    canDeactivate(){
        console.log('canDeactivate');
    }

    deactivate(){
        console.log('deactivate');
    }

    activate(params, routeConfig) {
        this.routeParams = params;
        this.routeConfig = routeConfig;

        this.getEvents(params, routeConfig);
        return true;
    }

    getEvents(params, routeConfig){
        if(this.authService.isUserLoggedIn){
            var userId = this.authService.user.providerData[0].uid;
            var pastOrFuture = routeConfig.name || 'future';

            let promise = new Promise((resolve, reject) => {
                //return this.dataRepository.getEvents(pastOrFuture)
                
                return this.ArticleService.getEvents(userId).then((events) => {
                    if (params && params.speaker || params && params.topic){
                        var filteredResults = [];

                        events.forEach(item => {
                            if (params.speaker
                                    && item.speaker.toLowerCase().indexOf(params.speaker.toLowerCase()) >= 0){
                                filteredResults.push(item);
                            }
                            if (params.topic
                                    && item.topic.toLowerCase().indexOf(params.topic.toLowerCase()) >= 0){
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
                    resolve();
                });
            })
            return promise;
        }
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    attached() {
        this.subscriber = this.ea.subscribe('login', response => {
            if(response.user){
                console.log(response);
                this.getEvents(this.params, this.routeConfig);
            }
        });
    }

    detached() {
        this.subscriber.dispose();
    }
}
