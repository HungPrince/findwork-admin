import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
    selector: 'app-job-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailPostComponent implements OnInit {

    constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(data);
    }

    ngOnInit() {
    }

}
