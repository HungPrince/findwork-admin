import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactService } from '../../services/contact/contact.service';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    private contactForm;
    private use: any;

    constructor(private formBuider: FormBuilder, private contactService: ContactService, private userService: UserService) {
        this.contactForm = this.formBuider.group({
            title: new FormControl('', Validators.required),
            message: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
    }

    sendEmail() {
        this.contactService.add('"Tl83bL1AOOPtlmda8bLrUIdPxgC2"', this.contactForm.value).then(data => {
            if (data.key) {
                console.log('send message successful!');
            } else {
                console.log('Send message fail!');
            }
        }, error => console.log(error));
    }

}
