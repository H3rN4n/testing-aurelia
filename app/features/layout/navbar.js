import { inject } from 'aurelia-framework';
import { authService } from '../../core/services/authService';

@inject(authService)
export class Navbar {
    constructor(authService){
        this.authService = authService;
    }
}