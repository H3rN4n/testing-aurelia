export class Jobs{

    canActivate(params, routeConfig, navigationInstruction){
        let promise = new Promise((resolve, reject) => {
            setTimeout(_ => resolve(), 2000);
        })
        return promise;
    }

    constructor(){
        this.title = 'Jobs'
    }

    
}