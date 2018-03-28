import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { User } from './../models/user';
import { UserService } from './../services/user/user.service';

export class UserDataSource implements DataSource<User>{
    private userSubject = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private userService: UserService) {

    }

    loadUser() {
        this.loadingSubject.next(true);
        this.userService.getAll().pipe(catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(users => this.userSubject.next(users));
    }

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.userSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.userSubject.complete();
        this.loadingSubject.complete();
    }
}
