import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { PostService } from '../../services/post/post.service';
import { DetailPostComponent } from '../post/detail/detail.component';
import { AddPostComponent } from '../post/add/add.component';
import { TYPES, CITIES, DISTRICTS, STREETS, FUNCTION_JOB } from '../../configs/data';
import { FileService } from '../../services/file/file.service';


@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    private tableName = "Post Table";
    private tableTitle = "This is list post";
    private loading = false;
    private cities: any;
    types = TYPES;
    functions = FUNCTION_JOB;
    dataSource: any;
    displayedColumns = ['company', 'title', 'type', 'function', 'website', 'address', 'dateFrom', 'dateTo', 'action'];
    citySearch: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private postService: PostService, private matDialog: MatDialog,
        private toastrService: ToastrService, private fileService: FileService) {
        this.cities = [];

        this.loading = true;

        postService.getAll().subscribe(data => {
            CITIES.forEach(city => {
                for (let key in city) {
                    this.cities.push({
                        name: city[key].name_with_type,
                        code: key
                    });
                }
            });
            this.citySearch = this.cities;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;
        }, error => { console.log(error); this.loading = false; })
    }

    ngOnInit() {

    }

    searchCity(keyword) {
        let search = keyword.trim().toLowerCase();
        let listCity = this.citySearch.filter(city =>
            city.name.toLowerCase().indexOf(search) > -1);
        if (listCity) {
            this.cities = listCity;
        } else {
            this.cities = this.citySearch;
        }
        console.log(this.cities);
    }

    changeType(type) {
        this.changeData(type);
    }

    changeCity(city) {
        this.changeData(city.name);
    }

    changeDataSoure(keyword: string) {
        this.changeData(keyword);
    }

    private changeData(keyword: string) {
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

    editClicked(post) {
        let dialogEdit = this.matDialog.open(AddPostComponent, {
            data: post,
            width: '60%',
            height: '100%'
        });

        dialogEdit.afterClosed().subscribe(result => {
            console.log('close add dialog');
        });
    }

    exportPost() {
        this.fileService.exportAsExcelFile(this.dataSource.filteredData, 'post');
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
