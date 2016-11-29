import { singleton } from 'aurelia-framework';

@singleton()
export class ArticleService {
    constructor(){
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