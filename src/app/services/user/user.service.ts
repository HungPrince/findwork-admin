import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { map } from "rxjs/operators";
import { AsyncLocalStorage } from 'angular-async-local-storage';

import { User } from "./../../models/user";

@Injectable()
export class UserService {

    public user: any;

    constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
        private localStorage: AsyncLocalStorage) {

    }

    login(account: any) {
        return this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password);
    }

    logout() {
        return this.localStorage.removeItem('user');
    }

    getAll(): Observable<any> {
        return this.af.list('users').valueChanges();
    }

    getUserById(userId): any {
        return this.af.database.ref(`users/${userId}`).once('value', data => { return data.val(); });
    }

    update(user): any {
        return this.af.database.ref(`users/${user.uid}`).update(user);
    }

    testPagination(): any {
        return this.af.database.ref("users").orderByChild('name').startAt("Hung Bui").limitToLast(5).once("value", (data) => { console.log(data.val()) });
    }

}
