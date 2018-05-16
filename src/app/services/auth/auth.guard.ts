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

    userRoles: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private localStorage: AsyncLocalStorage
    ) {
        this.localStorage.getItem('user').subscribe(user => {
            this.userRoles = user.role;
        })
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

    matchingRole(allowedRoles: any): boolean {
        return _.includes(allowedRoles, this.userRoles);
    }

}
