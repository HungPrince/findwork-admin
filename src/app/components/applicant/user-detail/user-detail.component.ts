import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(data);
    }

    ngOnInit() {
    }

}
