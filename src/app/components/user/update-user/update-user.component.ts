import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { ToastrService } from 'ngx-toastr';
import { } from 'ngx-loading';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';
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
    selectedFiles: FileList;
    file: File;

    constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router,
        private localStorage: AsyncLocalStorage, private toastService: ToastrService, private storage: AngularFireStorage) {
        this.localStorage.getItem('user').subscribe(user => {
            if (user) {
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
                if (!this.user.avatar_url) {
                    this.user.avatar_url = "";
                }
            } else {
                router.navigateByUrl('/login');
            }
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

    chooseFiles(event) {
        this.selectedFiles = event.target.files;
        if (this.selectedFiles.item(0)) {
            this.uploadpic();
        }
    }

    uploadpic() {
        let file = this.selectedFiles.item(0);
        let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
        this.storage.upload('/images/' + uniqkey, file).then((uploadTask) => {
            this.user.avatar_url = uploadTask.downloadURL;
            this.userService.update(this.user).then(error => {
                if (!error) {
                    this.toastService.success('Upload avatar successfully!', 'success', {
                        positionClass: 'toast-bottom-right'
                    });
                    this.localStorage.setItem('user', this.user).subscribe();
                }
            });
        });
    }
}
