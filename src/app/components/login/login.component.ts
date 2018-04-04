import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AsyncLocalStorage } from 'angular-async-local-storage';

import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(private af: AngularFireAuth, private router: Router, private frmbuider: FormBuilder,
        private localStorage: AsyncLocalStorage, private authService: AuthService) {

        this.localStorage.getItem('user').subscribe(data => {
            if (data) {
                this.authService.loggedIn.next(true);
                router.navigate(['/']);
            }
        });

        this.loginForm = frmbuider.group({
            email: new FormControl(),
            password: new FormControl()
        });
    }

    onSubmit(account) {
        this.authService.login(account.value);
    }


    ngOnInit() {
    }
}
