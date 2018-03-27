import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { map } from "rxjs/operators";

import { Applicant } from "./../../models/applicant";

@Injectable()
export class ApplicantService {

    constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private http: HttpClient) {

    }

    login(account: any) {
        return this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password);
    }

    getAll(): Observable<any> {
        return this.af.list('users').valueChanges();
    }

}
