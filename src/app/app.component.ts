import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Router } from '@angular/router';

import { FileService } from './services/file/file.service';
import { MessagingService } from './services/fcm/messaging.service';
import { AuthService } from './services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    message;
    isLoggedIn$: Observable<boolean>;

    constructor(private fileService: FileService, private messagingService: MessagingService,
        private localStorage: AsyncLocalStorage, private router: Router, private authService: AuthService) {
        this.localStorage.getItem('user').subscribe(data => {
            if (data) {
                router.navigateByUrl('/admin');
            }
        });

    }

    ngOnInit() {
        this.isLoggedIn$ = this.authService.isLoggedIn;
        this.messagingService.getPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
    }
}
