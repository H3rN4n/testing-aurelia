export class Shell {

    configureRouter(config, router) {
        this.router = router;
        config.title = 'Events Page';
        config.map([
        { route: ['', 'home'], moduleId: 'viewmodels/events', name: 'Home', title: 'Home', nav: true },
        { route: ['eventDetail/:eventId'], moduleId: 'viewmodels/eventDetail', name: 'Event Detail', title: 'Event Detail'},
        { route: ['jobs'], moduleId: 'viewmodels/jobs', name: 'Jobs', title: 'Jobs', nav: true },
        { route: ['discussion'], moduleId: 'viewmodels/discussion', name: 'Discussion', title: 'Discussion', nav: true }
        ]);
    }
    
    constructor(){
        this.shellTitle = "you!";
    }
}