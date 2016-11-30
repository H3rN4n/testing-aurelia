import { inject,
         computedFrom } from 'aurelia-framework';
import { Router,
         activationStrategy } from 'aurelia-router';
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
        this.authService = authService;
    }

    @computedFrom('authService', 'authService.user')
    get authenticated() {
      console.log(this.authService.user);
      console.log(this.params, this.routeConfig);

        if(this.authService.isUserLoggedIn){
            this.getEvents(this.params, this.routeConfig);
        } else {
            this.events = [];
        }

      return this.authService.user;
    }

    // writeUserListData(userId, eventList) {
    //     console.log('writeUserListData');
    //     firebase.database().ref('users/' + userId).set({
    //         eventList: eventList
    //     });
    // }

    canDeactivate(){
        console.log('canDeactivate');
    }

    deactivate(){
        console.log('deactivate');
    }

    activate(params, routeConfig) {
        // if(this.authService.user){
        //     this.writeUserListData(this.authService.user.providerData[0].uid, this.events)
        // }
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
                return this.dataRepository.getEvents(pastOrFuture).then((events) => {
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
}
