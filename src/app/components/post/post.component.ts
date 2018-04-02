import { Component, OnInit, ViewChild } from '@angular/core';

import { PostService } from '../../services/post/post.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { DetailPostComponent } from '../post/detail/detail.component';
import { AddPostComponent } from '../post/add/add.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    private tableName = "Post Table";
    private tableTitle = "This is list post";
    private loading = false;
    dataSource: any;
    displayedColumns = ['company', 'title', 'type', 'function', 'website', 'address', 'dateFrom', 'dateTo', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private postService: PostService, private matDialog: MatDialog,
        private toastrService: ToastrService) {
        this.loading = true;

        postService.getAll().subscribe(data => {
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

    detailClicked(post) {
        let dialogDetail = this.matDialog.open(DetailPostComponent, {
            data: post,
            width: '60%',
            height: '80%'
        });

        dialogDetail.afterClosed().subscribe(result => {
            console.log('close detail dialog');
        });
    }

    addClicked() {
        let dialogAdd = this.matDialog.open(AddPostComponent, {
            width: '60%',
            height: '100%'
        });

        dialogAdd.afterClosed().subscribe(result => {
            console.log('close add dialog');
        })
    }

}

export class PostDataSource {
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
