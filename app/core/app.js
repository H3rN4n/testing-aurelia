import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { authService } from './services/authService';

@inject(Router,
        authService)

export class App {

    constructor(router, authService){
        // TODO Replace with profile name
        this.shellTitle = "you!";
        this.router = router;
        this.authService = authService;
    }

    configureRouter(config, router) {
        this.router = router;
        config.title = 'Events Page';
        config.options.pushState = true;

        let sponsorsModule = {moduleId: 'features/sponsors/sponsors'};
        // Move to its own file if it grows too much
        config.map([
            {
                route: ['', 'events', 'login'],
                viewPorts:{
                    mainContent: {moduleId: 'features/events/events'},
                    sideBar: sponsorsModule
                },
                name: 'home',
                title: 'Home',
                nav: true
            },
            {
                route: ['event/:eventId'],
                viewPorts:{
                    mainContent: {moduleId: 'features/events/detail'},
                    sideBar: sponsorsModule
                },
                name: 'eventDetail',
                title: 'Event Detail'
            },
            {
                route: ['event/:eventId/discussions'],
                viewPorts:{
                    mainContent: {moduleId: 'features/discussions/discussions'},
                    sideBar: sponsorsModule
                },
                name: 'discussion',
                title: 'Discussion'
            },
            {
                route: ['jobs'],
                viewPorts:{
                    mainContent: {moduleId: 'viewmodels/jobs'},
                    sideBar: sponsorsModule
                },
                name: 'jobs',
                title: 'Jobs',
                nav: true,
                auth: true
            }
        ]);
    }
}
