import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
// Permette a questo servizio di essere iniettato all'interno del motore di DI
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) { };

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };
        this.authSuccessfully();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        }
        this.authSuccessfully();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return { ...this.user };    // Passa per valore invece che per referenza
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccessfully() {
        // Quando uno si registra, non viene emesso un evento ma
        // chi si sottoscrive a questo observer gli arriva le informazion che uno si è iscritto
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}