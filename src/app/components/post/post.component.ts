import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { AngularFireStorage } from 'angularfire2/storage';
import * as _ from 'lodash';
import * as $ from 'jquery';

import { DetailPostComponent } from '../post/detail/detail.component';
import { AddPostComponent } from '../post/add/add.component';
import { DeleteComponent } from '../delete/delete.component';
import { TYPES, CITIES, DISTRICTS, STREETS, FUNCTION_JOB } from '../../configs/data';
import { FileService } from '../../services/file/file.service';
import { PostService } from '../../services/post/post.service';
import { AuthGuard } from '../../services/auth/auth.guard';

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
    listDelete = [];
    selectedFiles: FileList;
    file: File;
    types = TYPES;
    functions = FUNCTION_JOB;
    dataSource: any;
    post: any;
    user: any;
    displayedColumns = ['delete', 'company', 'title', 'image', 'type', 'function', 'website', 'action'];
    citySearch: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private postService: PostService,
        private matDialog: MatDialog,
        private toastrService: ToastrService,
        private fileService: FileService,
        private localStorage: AsyncLocalStorage,
        private storageFB: AngularFireStorage,
        private authGuard: AuthGuard) {
        this.cities = [];
        this.listDelete = [];
        this.loading = true;

        this.localStorage.getItem('user').subscribe(user => {
            if (user) {
                this.user = user;
                postService.getAll().subscribe(data => {
                    CITIES.forEach(city => {
                        for (let key in city) {
                            this.cities.push({
                                name: city[key].name_with_type,
                                code: key
                            });
                        }
                    });
                    if (this.user.role = 'author') {
                        data = data.filter(dta => dta.userId === this.user.uid);
                    }
                    this.citySearch = this.cities;
                    this.dataSource = new MatTableDataSource(data);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.loading = false;
                }, error => { console.log(error); this.loading = false; })
            }
        })
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
        this.post = row;
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
        if (this.authGuard.canEdit()) {
            let dialogEdit = this.matDialog.open(AddPostComponent, {
                data: post,
                width: '60%',
                height: '100%'
            });

            dialogEdit.afterClosed().subscribe(result => {
                console.log('close add dialog');
            });
        } else {
            this.toastrService.error('Action prevented', 'Error');
        }
    }

    deleteClicked(post) {
        if (this.authGuard.canDelete()) {
            let dialogDelete = this.matDialog.open(DeleteComponent, {
                data: { key: post.key, table: 'post', title: 'Delete Post', content: 'Are you sure want to delete this post?' },
                height: '35%',
                width: '30%'
            });

            dialogDelete.afterClosed().subscribe(result => {
                console.log('close delete dialog');
            });
        } else {
            this.toastrService.error('Action prevented', 'Error');
        }
    }

    chooseFiles(event) {
        this.selectedFiles = event.target.files;
        if (this.selectedFiles.item(0)) {
            this.uploadpic();
        }
    }

    uploadpic() {
        if (!this.post.files) {
            this.post.files = [];
        }
        let file = this.selectedFiles.item(0);
        let uniqkey = 'file' + Math.floor(Math.random() * 1000000);
        this.storageFB.upload('/files/' + uniqkey, file).then((uploadTask) => {
            this.post.files[this.user.uid] = uploadTask.downloadURL;
            this.postService.update(this.post).then(error => {
                if (!error) {
                    this.toastrService.success('Apply is successfully!', 'success', {
                        positionClass: 'toast-bottom-right'
                    });
                } else {
                    this.toastrService.error('Something went wrong!', 'error', {
                        positionClass: 'toast-bottom-right'
                    });
                }
            });
        });
    }

    checkedDelete(key) {
        if (!_.includes(this.listDelete, key)) {
            this.listDelete.push(key);
        } else {
            for (let i = 0; i < this.listDelete.length; i++) {
                if (this.listDelete[i] === key) {
                    this.listDelete.splice(i, 1);
                    break;
                }
            }
        }
    }

    deleteMultiplePost() {
        if (this.listDelete.length) {
            let dialogDelete = this.matDialog.open(DeleteComponent, {
                data: { keys: this.listDelete, table: 'post', isArray: true, title: 'Delete These Post', content: 'Are you sure want to delete these post?' },
                height: '35%',
                width: '30%'
            });

            dialogDelete.afterClosed().subscribe(result => {
                console.log('close delete dialog');
            });
        } else {
            this.toastrService.error('Please, checked to delete post!', 'Error');
        }
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
