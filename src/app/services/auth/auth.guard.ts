import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { AsyncLocalStorage } from 'angular-async-local-storage';

import * as _ from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {

    userRoles: Array<string>;

    constructor(
        private authService: AuthService,
        private router: Router,
        private localStorage: AsyncLocalStorage
    ) {
        authService.user.map(user => {
            return this.userRoles = _.keys(_.get(user, 'roles'));
        }).subscribe();
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.isLoggedIn
            .take(1)
            .map((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            });
    }

    canRead(): boolean {
        const allowed = ['admin', 'author', 'reader'];
        return this.matchingRole(allowed);
    }

    canEdit(): boolean {
        const allowed = ['admin', 'author'];
        return this.matchingRole(allowed);
    }

    canDelete() {
        const allowed = ['admin'];
        return this.matchingRole(allowed);
    }

    matchingRole(allowedRoles): boolean {
        return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
    }

}
