import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ContactService {

    constructor(private af: AngularFireDatabase) { }

    add(userId: string, contact: any) {
        return this.af.database.ref(`contact/${userId}`).push(contact);
    }
}
