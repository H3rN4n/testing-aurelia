import 'bootstrap';
import 'materialize';
import {ViewLocator} from 'aurelia-framework';

export function configure(aurelia){

    let materialize = 'materialize';
    aurelia.use 
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-materialize-bridge', bridge => bridge.useAll() );

    ViewLocator.prototype.convertOriginToViewUrl = (origin) => {
        let moduleId = origin.moduleId;

        var id = ( moduleId.endsWith('.js') || moduleId.endsWith('.ts')) ? moduleId.substring(0, moduleId.length - 3) : moduleId;

        return id.replace("viewmodels", "views") + ".html";
    }

    aurelia.start().then(a => a.setRoot("viewmodels/shell"));
}