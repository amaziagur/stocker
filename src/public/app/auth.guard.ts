import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem("user") ) {
            console.log("you are ok!");
            // logged in so return true
            this.router.navigate(['/home']);
            return true;
        }

        console.log("you are NOT ok!");

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}