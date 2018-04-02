import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobService {

    constructor(public af: AngularFireDatabase) {

    }

    getAll(): Observable<any> {
        return this.af.list('jobs').snapshotChanges()
            .map(jobs => { return jobs.map(job => ({ key: job.key, ...job.payload.val() })) });
    }

    add(job: any): any {
        return this.af.database.ref('jobs').push(job);
    }

}
