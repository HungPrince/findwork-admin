import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService {

    constructor(public af: AngularFireDatabase) {

    }

    getAll(): Observable<any> {
        return this.af.list('post').snapshotChanges()
            .map(posts => { return posts.map(post => ({ key: post.key, ...post.payload.val() })) });
    }

    add(post: any): any {
        return this.af.database.ref('post').push(post);
    }

}
