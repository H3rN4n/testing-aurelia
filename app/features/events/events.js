export class Events {
    constructor(){
    }

    configureRouter(config, router) {
        this.router = router;
        config.title = "Events";

        config.map([
            {
                "route": ['', 'future'],
                "moduleId": "features/events/list",
                "title": "Future Events",
                "nav": true,
                "href": "/events/future",
                "name": "future"
            },
            {
                "route": 'past',
                "moduleId": "features/events/list",
                "title": "Past Events",
                "nav": true,
                "href": "/events/past",
                "name": "future"
            }
        ]);
    }
}
