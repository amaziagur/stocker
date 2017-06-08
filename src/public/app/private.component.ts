import {Component} from '@angular/core';
import {AuthenticationService} from "./auth.service";

@Component({
    moduleId: module.id,
    selector: 'login-logout-form',
    providers: [AuthenticationService],
    template: `
            <div class="container" >
                <div class="content">
                    <span>Congratulations, you have successfully logged in!!</span>
                    <br />
                    <a (click)="logout()" href="#">Click Here to logout</a>
                </div>
            </div>
    	`
})

export class PrivateComponent {

    constructor(
        private authenticationService:AuthenticationService){}

    ngOnInit(){
        this.authenticationService.checkCredentials();
    }

    logout() {
        this.authenticationService.logout();
    }
}