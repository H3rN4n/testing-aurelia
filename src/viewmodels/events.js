export class Events{

    constructor(){
        
    }

    configureRouter(config, router){
        this.router = router;

        config.title = "Events";

        config.map([
            {
                "route": ['', 'future'],
                "moduleId": "viewmodels/eventsList",
                "title": "Future Events",
                "nav": true,
                "href": "/events/future",
                "name": "future"
            },
            {
                "route": 'past',
                "moduleId": "viewmodels/eventsList",
                "title": "Past Events",
                "nav": true,
                "href": "/events/past",
                "name": "future"
            }
        ]);
    }
}