//import {inject} from 'aurelia-framework';
import {eventsData} from '../services/eventsData';
import moment from 'moment'; 

export class DataRepository {
    constructor(){
        console.log("DATA REPOSITORY CONSTRUCTOR");
    }

    getEvents(){
        console.log('getEvents');
        var promise = new Promise((resolve, reject) => {
            if(!this.events){
                setTimeout(_ => {
                    this.events = eventsData;
                    this.events.forEach(item => {
                        var dateTime = moment(item.dateTime)
                        .format("MM/DD/YYYY HH:mm");
                        item.dateTime = dateTime;
                    })
                    console.log(this.events);
                    resolve(this.events);
                }, 2000);
            } else {
                resolve(this.events);
            }
        })
        return promise;
    }

    getEvent(eventId){
        console.log('getEvent');
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