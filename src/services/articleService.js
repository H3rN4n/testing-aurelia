//import {singleton} from 'aurelia-framework';
import {transient} from 'aurelia-framework';

//@singleton()
@transient()




export class articleService {
    constructor(){
        console.log(firebase);
        this.eventListRef = null;
    }

    createRef(userId){
        this.eventListRef = firebase.database().ref('users/' + userId + '/eventList');
    }

    loadEvents(userId) {
        this.eventListRef.on('value', function(snapshot) {
            console.log(snapshot);
        //updateStarCount(postElement, snapshot.val());
            return snapshot;
        });
    }
    
}