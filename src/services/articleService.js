//import {singleton} from 'aurelia-framework';
import {transient} from 'aurelia-framework';

//@singleton()
@transient()

// var eventListRef = firebase.database().ref('users/' + userId + '/eventList');

// eventListRef.on('value', function(snapshot) {
//     console.log(snapshot);
//   //updateStarCount(postElement, snapshot.val());
// });

export class articleService {
    constructor(){
        console.log(firebase);
    }
    
}