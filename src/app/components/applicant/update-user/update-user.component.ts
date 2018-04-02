import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { ToastrService } from 'ngx-toastr';
import { } from 'ngx-loading';

import * as $ from 'jquery';

import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

    formUser: any;
    user: any;
    showSpinner = false;
    constructor(private userService: UserService, private formBuilder: FormBuilder,
        private localStorage: AsyncLocalStorage, private toastService: ToastrService) {
        this.localStorage.getItem('user').subscribe(user => {
            this.user = user;
            this.formUser = this.formBuilder.group({
                uid: new FormControl(user.uid),
                name: new FormControl(user.name),
                username: new FormControl(user.username ? user.username : ''),
                age: new FormControl(user.age),
                gender: new FormControl(user.gender),
                email: new FormControl(user.email),
                city: new FormControl(user.address.city),
                district: new FormControl(user.address.district),
                street: new FormControl(user.address.street),
                description: new FormControl(user.description)
            });
        });
        this.formUser = this.formBuilder.group({
            name: new FormControl(),
            email: new FormControl(),
            username: new FormControl(),
            age: new FormControl(),
            gender: new FormControl(),
            city: new FormControl(),
            district: new FormControl(),
            street: new FormControl(),
            description: new FormControl()
        });
    }

    ngOnInit() {

    }

    update() {
        this.showSpinner = true;
        let user = this.formUser.value;
        for (let key in user) {
            if (key == 'city' || key == 'district' || key == 'street') {
                this.user.address[key] = user[key];
            }
            this.user[key] = user[key];
        };
        this.userService.update(this.user).then(error => {
            if (!error) {
                this.toastService.success('Update profile successfully!', 'success', {
                    timeOut: 1000
                });
                this.localStorage.setItem('user', this.user).subscribe();
            } else {
                this.toastService.error('Something went wrong!', 'error', {
                    timeOut: 1000
                });
            }
            this.showSpinner = false;
        }, error => { console.log(error); this.showSpinner = false })
            .catch(error => { console.log(error); this.showSpinner = false });
    }

}
