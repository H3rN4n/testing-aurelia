import { inject } from 'aurelia-framework';
import {authService} from '../services/authService';

@inject(authService)

export class NavBar{
    constructor(authService){
        this.authService = authService;
    }
}