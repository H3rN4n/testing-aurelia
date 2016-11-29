export class Jobs {
    constructor(){
        this.title = 'Jobs'
    }

    canActivate(params, routeConfig, navigationInstruction){
        let promise = new Promise((resolve, reject) => {
            setTimeout(_ => resolve(), 2000);
        })
        return promise;
    }
}
