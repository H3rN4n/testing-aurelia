import { singleton } from 'aurelia-framework';

@singleton()
export class ArticleService {
    constructor(){
        this.eventListRef = null;
    }

    createRef(userId){
        this.eventListRef = firebase.database().ref('users/' + userId + '/eventList');
    }

    getEvents(userId) {
        if(!this.eventListRef){
            this.createRef(userId);
        }
        let promise = new Promise((resolve, reject) => {
            this.eventListRef.on('value', function(snapshot) {
                console.log(snapshot.val());
                 resolve(snapshot.val());
            });
        });

        return promise;
    }

}