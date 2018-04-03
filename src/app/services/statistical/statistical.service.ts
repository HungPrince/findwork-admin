import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class StatisticalService {

    constructor(private af: AngularFireDatabase) {

    }

    countUser(): any {
        return this.af.list('users').valueChanges();
    }

    countPost(): any {
        return this.af.list('posts').valueChanges();
    }

}
