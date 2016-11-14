import { inject } from 'aurelia-framework';
import { MdToastService } from 'aurelia-materialize-bridge';

@inject(MdToastService)

export class Shell {
    configureRouter(config, router) {
        this.router = router;
        config.title = 'Events Page';
        config.options.pushState = true;

        config.addPipelineStep('authorize', LogNextStep);
        // config.addPipelineStep('preActivate', LogNextStep);
        // config.addPipelineStep('preRender', LogNextStep);
        // config.addPipelineStep('postRender', LogNextStep);

        config.map([
            { 
                route: ['', 'events'], 
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
                nav: true
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
    
    constructor(toast){
        this.shellTitle = "you!";
        this.toast = toast;
        console.log(toast)
    }

}

class LogNextStep{
    run(navigationInstruction, next){
        return next().then(result => {
            //next step and all downstreams steps are complete.
            var toast = new MdToastService;
            toast.show( result.status + '!', 2000);
            return result;
        });
    }
}
