import { inject } from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {authService} from '../services/authService';

@inject(Router, authService)

export class Shell {
    configureRouter(config, router) {
        this.router = router;
        config.title = 'Events Page';
        config.options.pushState = true;

        //config.addPipelineStep('authorize', LogNextStep);
        // config.addPipelineStep('preActivate', LogNextStep);
        // config.addPipelineStep('preRender', LogNextStep);
        // config.addPipelineStep('postRender', LogNextStep);

        //config.addPipelineStep('authorize', AuthenticateStepSession); // Add a route filter so only authenticated uses are authorized to access some routes

        config.map([
            { 
                route: ['', 'events', 'login'], 
                viewPorts:{
                    mainContent: {moduleId: 'viewmodels/events'},
                    sideBar: {moduleId: 'viewmodels/sponsors'}
                },
                name: 'home',
                title: 'Home',
                nav: true
            },
            { 
                route: ['eventDetail/:eventId'],
                viewPorts:{
                    mainContent: {moduleId: 'viewmodels/eventDetail'},
                    sideBar: {moduleId: 'viewmodels/sponsors'}
                },
                name: 'eventDetail',
                title: 'Event Detail'
            },
            { 
                route: ['jobs'],
                viewPorts:{
                    mainContent: {moduleId: 'viewmodels/jobs'},
                    sideBar: {moduleId: 'viewmodels/sponsors'}
                },
                name: 'jobs',
                title: 'Jobs',
                nav: true,
                auth: true
            },
            {
                route: ['eventDetail/:eventId/discussion'], 
                viewPorts:{
                    mainContent: {moduleId: 'viewmodels/discussion'},
                    sideBar: {moduleId: 'viewmodels/sponsors'}
                },
                name: 'discussion',
                title: 'Discussion'
            }
        ]);
    }

    
    
    constructor(router, authService){
        this.shellTitle = "you!";
        this.router = router;     
        this.authService = authService;
    }

    login(provider){
        console.log(this.authService);
        this.authService.login(provider);
    }

    logout(){
        this.authService.logout(provider);
    }

    activate(){

    }

}
