import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ShareService {

    constructor(private af: AngularFireDatabase) { }

    delete(colection: any): any {
        return this.af.database.ref(colection).remove();
    }
}
