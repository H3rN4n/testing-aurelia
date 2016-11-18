//import {inject} from 'aurelia-framework';
import {eventsData, discussionData} from '../services/eventsData';
import moment from 'moment'; 

function filterAndFormat(pastOrFuture, events){
    var results =  JSON.parse(JSON.stringify(events));

    if (pastOrFuture == "past"){
        results = results.filter(item => moment(item.dateTime) < moment()); 
    } else if(pastOrFuture == "future"){
        results = results.filter(item => moment(item.dateTime) > moment());
    } else {
        results = results;
    }


    results.forEach(item => {
        var dateTime = moment(item.dateTime)
        .format("MM/DD/YYYY HH:mm");
        item.dateTime  = dateTime;
    })

    return results;


}

export class DataRepository {
    constructor(){
        
    }

    getEvents(pastOrFuture){
        var promise = new Promise((resolve, reject) => {
            if(!this.events){
                setTimeout(() => {
                    this.events = eventsData.sort((a,b)=>{ a.dateTime >= b.dateTime ? 1 : -1 });
                
                    resolve(filterAndFormat(pastOrFuture, this.events));
                }, 10);
            } else {
                resolve(filterAndFormat(pastOrFuture, this.events));
            }
        })
        return promise;
    }

    getEvent(eventId){
        var promise = new Promise((resolve, reject) => {
            if(!this.events){
                this.getEvents().then((events)=>{
                    resolve(this.events.find(item => item.id == eventId));
                })
            } else {
                resolve(this.events.find(item => item.id == eventId));
            }
        })
        return promise;
    }
}