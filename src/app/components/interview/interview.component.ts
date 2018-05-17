import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatDatepicker, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { UserService } from '../../services/user/user.service';

import * as $ from 'jquery';

@Component({
    selector: 'app-interview',
    templateUrl: './interview.component.html',
    styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
    showSpinder = false;
    listUserSend: any;
    user: any;
    formSend: FormGroup;

    constructor(private frmbuider: FormBuilder, private userService: UserService,
        private toastrService: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private localStorage: AsyncLocalStorage) {
        this.localStorage.getItem('user').subscribe(user => {
            this.user = user;
        })
        this.listUserSend = data;
        this.formSend = this.frmbuider.group({
            title: new FormControl('', Validators.required),
            content: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
    }

    send() {
        this.showSpinder = true
        let count = 0;
        let content = { 'name': this.user.name, uid: this.user.uid, 'avatar_url': this.user.avatar_url, 'companyName': this.user.companyName, 'email': this.user.email, 'title': this.formSend.value.title, 'content': this.formSend.value.content, 'createdAt': Date.now() };
        this.listUserSend.forEach(element => {
            this.userService.addInterview(element.key, this.user.uid, content).then(data => {
                count++;
                if (count == this.listUserSend.length) {
                    this.showSpinder = false;
                    $('.btn-close').trigger('click');
                    this.toastrService.success('Send Interview Invition successfully !');
                }
            }, error => {
                this.showSpinder = false;
            }).catch(e => {
                this.showSpinder = false;
            })
        });
    }
}
