import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { map } from "rxjs/operators";
import { AsyncLocalStorage } from 'angular-async-local-storage';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(
        private af: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private router: Router,
        private userService: UserService,
        private localStorage: AsyncLocalStorage
    ) { }

    login(account: any) {
        this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password).then(result => {
            let user: any = {};
            this.userService.getUserById(result.uid).then(data => {
                user = data.val();
                user.uid = result.uid;
                this.localStorage.setItem('user', user).subscribe(data => {
                    this.loggedIn.next(true);
                    this.router.navigate(['/']);
                });
            });
        })
    }

    logout() {
        this.loggedIn.next(false);
        this.localStorage.removeItem('user').subscribe(data => {
            this.router.navigate(['/login']);
        })
    }

}
