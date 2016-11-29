import { inject, computedFrom } from 'aurelia-framework';
import { Router, ActivationStrategy } from 'aurelia-router';
import { authService } from '../../core/services/authService';
import { DataRepository } from '../../core/services/dataRepository';
import { ArticleService } from '../../core/services/articleService';

@inject(DataRepository,
        Router,
        authService,
        ArticleService)

export class List {
    constructor(dataRepository, router, authService, ArticleService) {
        this.loading = true;
        this.events = [];
        this.dataRepository = dataRepository;
        this.router = router;
        this.activationStrategy = ActivationStrategy;
        this.authService = authService;
    }

    // TODO Complete when auth works like charm
    // @computedFrom('authService.isUserLoggedIn')
    // get userLoggedIn() {
    //     console.log('here');
    //     return this.authService.isUserLoggedIn;
    // }

    activate(params, routeConfig){
        if(this.authService.user){
            this.writeUserListData(this.authService.user.providerData[0].uid, this.events)
        }
        return true;
    }

    writeUserListData(userId, eventList) {
        console.log('writeUserListData');
        firebase.database().ref('users/' + userId).set({
            eventList: eventList
        });
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
        if(this.authService.isUserLoggedIn){
            console.log(this.authService.user.providerData[0].uid);
            var userId = this.authService.user.providerData[0].uid;
            var pastOrFuture = routeConfig.name == "" ? 'future' : routeConfig.name;
            let promise = new Promise((resolve, reject) => {
                return this.dataRepository.getEvents().then((events) => {
                    if (params.speaker || params.topic){
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
                    console.log(err);
                    resolve();
                });
            })
            return promise;
        }
        return true;
    }

    determineActuvationStrategy() {
        console.log('determine activationStrategy called');
        console.log(activationStrategy);
        return activationStrategy.replace;
        //return activationStrategy.invokeLifecycle;
    }
}
