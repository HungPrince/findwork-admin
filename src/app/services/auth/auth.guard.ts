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

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private localStorage: AsyncLocalStorage
    ) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.isLoggedIn
            .take(1)
            .map((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    console.log(isLoggedIn);
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            });
    }

    canEdit() {

    }

    canDelete() {

    }
}
