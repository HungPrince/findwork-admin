import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    state: string = '';
    error: any;

    signupForm: FormGroup;
    FirstName: string = "";
    LastName: string = "";
    Email: string = "";
    Password: string = "";
    constructor(private af: AngularFireAuth, private router: Router, private frmbuilder: FormBuilder) {
        this.signupForm = frmbuilder.group({
            fname: new FormControl(),
            lname: new FormControl(),
            email: new FormControl(),
            password: new FormControl()
        });
    }

    ngOnInit() {
    }

    onSubmit(formData) {
        if (formData.valid) {
            this.af.auth.createUserWithEmailAndPassword(formData.email, formData.password).then(
                (success) => {

                }).catch((error) => {

                })
        }
    }

}
