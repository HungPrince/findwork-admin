import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ApplicantService } from '../../services/applicant/applicant.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    error: any;
    loginForm: FormGroup;
    constructor(private af: AngularFireAuth, private router: Router, private frmbuider: FormBuilder,
        private userService: ApplicantService) {
        if (this.af.auth.currentUser) {
            router.navigateByUrl('/admin');
        }
        this.loginForm = frmbuider.group({
            email: new FormControl(),
            password: new FormControl()
        });
    }

    onSubmit(account) {
        this.userService.login(account.value).then(data => {
            this.router.navigateByUrl('/admin');
        })
    }

    ngOnInit() {
    }
}
