import {Component, ElementRef} from '@angular/core';
import {AuthenticationService, User} from "./auth.service";

@Component({
    moduleId: module.id,
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: `login.component.html`
})

export class LoginComponent {

    public user = new User('', '','');
    public errorMsg = '';
    loading = false;

    constructor(private authenticationService:AuthenticationService) {}

    login() {
        this.loading = true;
        if(!this.authenticationService.login(this.user)){
            this.errorMsg = 'Failed to login';
            this.loading = false;
        }
    }
}