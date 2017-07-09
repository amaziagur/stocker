import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

export class User {
    constructor(
        public id: string,
        public email: string,
        public password: string) { }
}

var users = [
    new User('11', 'admin@admin.com','adm9'),
    new User('11', 'user1@gmail.com','a23'),
    new User('11', 'a','a')
];

@Injectable()
export class AuthenticationService {

    constructor(
        private router: Router){}

    logout() {
        localStorage.removeItem("user");
        this.router.navigate(['Login']);
    }

    login(user : any){
        var authenticatedUser = users.find(u => u.email === user.email);
        if (authenticatedUser && authenticatedUser.password === user.password){
            localStorage.setItem("user", JSON.stringify(authenticatedUser));
            this.router.navigate(['']);
            return true;
        }
        return false;

    }

    push(user : any) {
        console.log("going to push user", user);
        localStorage.setItem("user", JSON.stringify(user));
        users.push(user);
        console.log("user added", users);
    }

    checkCredentials(){
        if (localStorage.getItem("user") === null){
            this.router.navigate(['Login']);
        }
    }
}