import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { ToastrService } from 'ngx-toastr';

import { ContactService } from '../../services/contact/contact.service';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    private contactForm;
    private user: any;

    constructor(private formBuider: FormBuilder, private contactService: ContactService, private toastrService: ToastrService,
        private userService: UserService, private storage: AsyncLocalStorage, private router: Router) {
        this.storage.getItem('user').subscribe(data => {
            if (data) {
                this.user = data;
            } else {
                this.router.navigateByUrl('/login');
            }
        }, error => { console.log(error) });

        this.contactForm = this.formBuider.group({
            title: new FormControl('', Validators.required),
            message: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
    }

    sendEmail() {
        this.contactService.add(this.user.uid, this.contactForm.value).then(data => {
            if (data.key) {
                this.toastrService.success('send message successful!', 'success');
            } else {
                this.toastrService.error('Send message fail!', 'error');
            }
        }, error => console.log(error));
    }

}
