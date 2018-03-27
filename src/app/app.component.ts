import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { OnInit, } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  listUser: any[];
  user: Observable<firebase.User>;
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    af.list('/userProfile').valueChanges().subscribe(users => { this.listUser = users; });
    console.log(this.listUser);
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    console.log(this.listUser);
    console.log(this.user);
  }
}
