import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AsyncLocalStorage } from 'angular-async-local-storage';

import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    error: any;
    loginForm: FormGroup;
    constructor(private af: AngularFireAuth, private router: Router, private frmbuider: FormBuilder,
        private userService: UserService, private localStorage: AsyncLocalStorage) {

        this.localStorage.getItem('user').subscribe(data => {
           if(data){
               this.userService.user = data;
               router.navigateByUrl('/admin');
           }
        });
        this.loginForm = frmbuider.group({
            email: new FormControl(),
            password: new FormControl()
        });
    }

    onSubmit(account) {
        this.userService.login(account.value).then(result => {
            let user: any = {};
            this.userService.getUserById(result.uid).then(data => {
                user = data.val();
                user.uid = result.uid;
                this.localStorage.setItem('user', user).subscribe(data => {
                    this.userService.user = user;
                    console.log(data);
                });
            });

            this.router.navigateByUrl('/admin');
        })
    }

    ngOnInit() {
    }
}
