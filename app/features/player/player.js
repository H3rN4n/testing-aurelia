import { customElement, bindable } from "aurelia-framework";
import videojs from '../../../jspm_packages/github/videojs/video.js@5.13.2/video.js';

@customElement("player")
export class Player {

    @bindable video;
    @bindable playerId;

    constructor(){

    }

    composeVideoJs(){
        var selector = document.getElementById(this.playerId);
        this.player = videojs(selector, { fluid: true, preload: 'metadata' });
    }

    bind(bindingContext){
        console.log(bindingContext);
    }

    attached() {
        this.composeVideoJs();
    }
}