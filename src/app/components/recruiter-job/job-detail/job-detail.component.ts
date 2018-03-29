import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
    selector: 'app-job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

    constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

}
