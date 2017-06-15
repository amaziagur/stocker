import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "./user.service";
import {AlertService} from "./alert.service";
import {AuthenticationService} from "./auth.service";

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(private router: Router, private userService: UserService, private alertService: AlertService, private authenticationService: AuthenticationService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.authenticationService.push(this.model);
                    this.router.navigate(['']);
                },
                error => {
                    console.log("something went bad!")
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}