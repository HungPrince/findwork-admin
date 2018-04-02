import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { map } from "rxjs/operators";

@Injectable()
export class FileService {

    constructor(private firebaseStorage: AngularFireDatabase) {

    }

    getAll() {
        return firebase.storage().ref().child('images')
    }

}
