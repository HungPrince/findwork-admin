import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, fadeInContent, MatDialog } from "@angular/material";
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-cv',
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
    tableName = "CV Table";
    tableTitle = "This is list CV";
    displayedColumns = ['name', 'link'];
    dataSource: any;
    keyword: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public loading = true;

    constructor(private userService: UserService) {
        this.userService.getListCV().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;
        });
    }

    ngOnInit() {

    }
}

export class CVDataSource {
    name: string;
    link: string;
    public constructor(Name: string, Link: string) {
        this.name = Name;
        this.link = Link;
    }
}
