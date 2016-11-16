import 'materialize';
import authConfig from '/authConfig';
import {ViewLocator} from 'aurelia-framework';

export function configure(aurelia){

    let materialize = 'materialize';
    //let flexboxgrid = 'flexboxgrid';
    aurelia.use 
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-api', configure => {
            configure
                .registerEndpoint('auth', 'http://localhost:3000')
                //.registerEndpoint('protected-api', 'http://localhost/auth')
                .registerEndpoint('public-api', 'http://localhost:3000/api')
                .setDefaultEndpoint('auth');
        })
        /* configure aurelia-authentication */
        .plugin('aurelia-authentication', baseConfig => {
            baseConfig.configure(authConfig);
        })
        .plugin('aurelia-dialog', config => {
            config.useDefaults();
            config.settings.lock = true;
            config.settings.centerHorizontalOnly = false;
            config.settings.startingZIndex = 5;
            })
        .plugin('aurelia-materialize-bridge', bridge => bridge.useAll())
        .plugin('aurelia-modal');

    ViewLocator.prototype.convertOriginToViewUrl = (origin) => {
        let moduleId = origin.moduleId;

        var id = ( moduleId.endsWith('.js') || moduleId.endsWith('.ts')) ? moduleId.substring(0, moduleId.length - 3) : moduleId;

        return id.replace("viewmodels", "views") + ".html";
    }

    aurelia.start().then(a => a.setRoot("viewmodels/shell"));
}