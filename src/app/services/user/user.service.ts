import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { map } from "rxjs/operators";

import { User } from "./../../models/user";

@Injectable()
export class UserService {

    constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private http: HttpClient) {

    }

    login(account: any) {
        return this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password);
    }

    getAll(): Observable<any> {
        return this.af.list('users').valueChanges();
    }

    testPagination(): any {
        return this.af.database.ref("users").orderByChild('name').startAt("Hung Bui").limitToLast(5).once("value", (data) => { console.log(data.val()) });
    }

}
