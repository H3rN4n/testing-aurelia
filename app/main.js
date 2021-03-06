import 'materialize';
import 'fetch';
import authConfig from 'utils/authConfig';
import { ViewLocator } from 'aurelia-framework';

export function configure(aurelia){
    let materialize = 'materialize';
    //let flexboxgrid = 'flexboxgrid';
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        /* configure aurelia-authentication */
        // .plugin('aurelia-api', configure => {
        // configure
        //     .registerEndpoint('api', 'http://aurelia-dev.com:2112')
        //     // .registerEndpoint('protected-api', 'https://myapi.org/protected-api')
        //     // .registerEndpoint('public-api', 'http://myapi.org/public-api');
        // })
        .plugin('aurelia-computed', { // install the plugin
            enableLogging: true // enable debug logging to see aurelia-computed's observability messages.
        })
        .plugin('aurelia-dialog', config => {
            config.useDefaults();
            config.settings.lock = true;
            config.settings.centerHorizontalOnly = false;
            config.settings.startingZIndex = 5;
            })
        .plugin('aurelia-materialize-bridge', bridge => bridge.useAll())
        .plugin('aurelia-modal');

    aurelia.start().then(a => a.setRoot("core/app"));
}
