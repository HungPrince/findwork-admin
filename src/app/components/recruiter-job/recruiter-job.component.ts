import { Component, OnInit, ViewChild } from '@angular/core';

import { JobService } from '../../services/job/job.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { JobDetailComponent } from '../recruiter-job/job-detail/job-detail.component';
import { AddJobComponent } from '../recruiter-job/add-job/add-job.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-recruiter-job',
    templateUrl: './recruiter-job.component.html',
    styleUrls: ['./recruiter-job.component.css']
})
export class RecruiterJobComponent implements OnInit {
    private tableName = "Post Table";
    private tableTitle = "This is list post";
    private loading = false;
    dataSource: any;
    displayedColumns = ['company', 'title', 'type', 'function', 'website', 'address', 'dateFrom', 'dateTo', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private jobService: JobService, private matDialog: MatDialog,
        private toastrService: ToastrService) {
        this.loading = true;

        jobService.getAll().subscribe(data => {
            this.loading = false;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, error => { console.log(error); this.loading = false; })
    }

    ngOnInit() {

    }

    changDataSoure(keyword: string) {
        this.dataSource.filter = keyword.trim().toLowerCase();
    }

    rowClicked(row: any): void {
        console.log(row);
    }

    detailClicked(job) {
        let dialogDetail = this.matDialog.open(JobDetailComponent, {
            data: job,
            width: '60%',
            height: '80%'
        });

        dialogDetail.afterClosed().subscribe(result => {
            console.log('close detail dialog');
        });
    }

    addClicked() {
        let dialogAdd = this.matDialog.open(AddJobComponent, {
            width: '60%',
            height: '100%'
        });

        dialogAdd.afterClosed().subscribe(result => {
            console.log('close add dialog');
        })
    }

}

export class JobDataSource {
    company: string;
    title: string;
    type: string;
    function: any;
    website: string;
    address: any;
    dateFrom: string;
    dateTo: string;

    constructor(Company: string, Title: string, Type: string, Function: any, Website: string, Address: any, DateFrom: string, DateTo: string) {
        this.company = Company;
        this.title = Title;
        this.type = Type;
        this.function = Function;
        this.website = Website;
        this.address = Address;
        this.dateFrom = DateFrom;
        this.dateTo = DateTo;
    }

}
