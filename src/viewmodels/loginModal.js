export class LoginModal{
    constructor(){
        this.isModalVisible = false;
        console.log('LM CTOR');
    }

    openModal(){
        console.log(this.modal);
        this.isModalVisible = true;
    }
}