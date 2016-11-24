function getDiscussionInput(){
    //fake data
    return "";
}

function cloneObject(obj){
    console.log(JSON.stringify(obj));
    return JSON.parse(JSON.stringify(obj))
}

import { inject } from 'aurelia-framework';
import { DataRepository } from '../services/dataRepository';
import { Router } from 'aurelia-router';

import {DialogService} from 'aurelia-dialog';

@inject(DataRepository, Router, DialogService)

export class Discussion{
    constructor(dataRepository, router, dialogService){
        this.title = 'Discussion'
        this.event = {};
        this.dataRepository = dataRepository;
        this.router = router;
        this.loading = false;
        this.dialogService = dialogService;
        this.textValue = "";
        this.event.discussion = [];
    }

    openModal() {
        let promise = new Promise((resolve, reject) => {
            this.dialogService.open({viewModel: Prompt, model: 'Are you sure?' })
                .then(response => {
                    console.log(response);
                    if (!response.wasCancelled) {
                        console.log('OK');
                        resolve();
                    } else {
                        console.log('cancelled');
                        reject();
                    }
                }
            );
       });
       

      return promise;
   }

   deactivate(){
       console.log('discussion deactivated');
   }

    activate(params){
        this.discussionInput = getDiscussionInput();
        this.originalInput = cloneObject(this.textValue);    
    }

    send(){
        this.event.discussion = this.event.discussion.concat({text: this.textValue})
        this.textValue = "";
    
    }

    canDeactivate(){
        console.log('canDeactivate');
        
        if( JSON.stringify(cloneObject(this.textValue)) !=
            JSON.stringify(this.originalInput) ){
            if(confirm('Unsaved data, are you sure you want to navigate away?')){
                return true;
            }else {
                return false;
            }
        } else {
            return true;
        }
    }

    canActivate(params, routeConfig, navigationInstruction){
        return this.dataRepository.getEvent(parseInt(params.eventId)).then((event)=>{
            this.event = event;
            this.loading = false;
        });
    }
}