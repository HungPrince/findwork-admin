import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AsyncLocalStorage } from 'angular-async-local-storage';

import * as firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";
import "rxjs/add/observable/of";
import { switchMap } from 'rxjs/operators';

import { User } from '../../models/user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    user: BehaviorSubject<User> = new BehaviorSubject(null);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(
        private db: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private router: Router,
        private userService: UserService,
        private localStorage: AsyncLocalStorage
    ) {
        this.afAuth.authState.switchMap
            (auth => {
                if (auth) {
                    return this.db.database.ref('users/' + auth.uid).once('value', data => { return data });
                } else {
                    return Observable.of(null);
                }
            })
            .subscribe(user => {
                this.user.next(user.val());
            });
    }

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
        });
    }

    logout() {
        this.loggedIn.next(false);
        this.localStorage.removeItem('user').subscribe(data => {
            this.router.navigate(['/login']);
        });
    }

}
