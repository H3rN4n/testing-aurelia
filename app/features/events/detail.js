import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
//import videojs from '../../../jspm_packages/github/videojs/video.js@5.13.2/video.js';
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
        //this.player = null;
        this.loading = false;
    }

    // goToDiscussion(){
    //     console.log('goToDiscussion')
    //     //this.router.navigate('#/discussion');
    //     this.router.navigateToRoute('discussion', {eventId: this.event.id})
    // }

    // composeVideoJs(){
    //     var selector = document.getElementById('video-player');
    //     this.player = videojs(selector, { fluid: true, preload: 'metadata' });
    // }

    activate(params, routeConfig, navigationInstruction){
        console.log('activate');
        return true;
    }

    canActivate(params, routeConfig, navigationInstruction){
        return this.dataRepository.getEvent(parseInt(params.eventId)).then((event)=>{
            this.event = event;
            this.loading = false;
        });
    }

    attached(){
        //this.composeVideoJs();
        return true;
    }
}
