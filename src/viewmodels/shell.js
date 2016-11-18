import { inject } from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthenticateStep} from 'aurelia-authentication';
import {FetchConfig} from 'aurelia-authentication';


@inject(Router, FetchConfig)

export class Shell {

    configureRouter(config, router) {
        this.router = router;
        config.title = 'Events Page';
        config.options.pushState = true;

        //config.addPipelineStep('authorize', LogNextStep);
        // config.addPipelineStep('preActivate', LogNextStep);
        // config.addPipelineStep('preRender', LogNextStep);
        // config.addPipelineStep('postRender', LogNextStep);

        config.addPipelineStep('authorize', AuthenticateStep); // Add a route filter so only authenticated uses are authorized to access some routes

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
                    sideBar: {moduleId: 'viewmodels/ads'}
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
                    sideBar: {moduleId: 'viewmodels/ads'}
                },
                name: 'discussion',
                title: 'Discussion'
            }
        ]);
    }
    
    constructor(router, fetchConfig){
        this.shellTitle = "you!";
        this.router = router;
        this.fetchConfig = fetchConfig;
    }

    activate() {
        // this will add the interceptor for the Authorization header to the HttpClient singleton
        this.fetchConfig.configure();
    }

}

// class LogNextStep{
//     run(navigationInstruction, next){
//         return next().then(result => {
//             //next step and all downstreams steps are complete.
//             var toast = new MdToastService;
//             toast.show( result.status + '!', 2000);
//             return result;
//         });
//     }
// }
