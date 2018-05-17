import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, fadeInContent, MatDialog } from "@angular/material";
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounce } from 'rxjs/operators/debounce';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { UserDetailComponent } from "./user-detail/user-detail.component";
import { DeleteComponent } from '../delete/delete.component';
import { InterviewComponent } from '../interview/interview.component'
import { AsyncLocalStorage } from 'angular-async-local-storage';

import { UserService } from '../../services/user/user.service';
import { User } from "../../models/user";
import { FileService } from '../../services/file/file.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'user-component',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent {
    tableName = "User Table";
    tableTitle = "This is list user";
    displayedColumns = ['interview', 'name', 'email', 'avatar', 'school', 'specialized', 'role', 'action'];
    dataSource: any;
    user: any;
    keyword: string;
    dataUser: any;
    listUsendInterview = [];
    filterUserFav = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public loading = false;

    constructor(private userService: UserService,
        private dialog: MatDialog,
        private fileService: FileService,
        private localStorage: AsyncLocalStorage,
        private toastrService: ToastrService) {
        this.loading = true;
        this.localStorage.getItem('user').subscribe(user => {
            this.user = user;
            userService.getAll().subscribe(data => {
                if (user.role === 'author') {
                    data = data.filter(dta => dta.role === 'reader')
                }
                let dataArr = [];
                data.forEach(user => {
                    let address;
                    if (user.address) {
                        address = user.address.city + ", " + user.address.district + ", " + user.address.street + ", " + user.address.location;
                    }
                    let userDb = new UserDataSource(
                        user.key,
                        user.name,
                        user.email,
                        user.gender,
                        user.school,
                        user.specialized,
                        user.role,
                        user.description,
                        address,
                        user.phone,
                        user.avatar_url,
                        user.age
                    );
                    dataArr.push(userDb);
                });
                this.loading = false;
                this.dataSource = new MatTableDataSource(dataArr);
                this.dataUser = dataArr;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }, error => { console.log(error); this.loading = false });
        })
    }

    exportUser() {
        this.fileService.exportAsExcelFile(this.dataSource.filteredData, 'user');
    }

    changeDataSoure(keyword) {
        this.dataSource.filter = keyword.trim().toLowerCase();
    }

    detail(user) {
        const dialogRef = this.dialog.open(UserDetailComponent, {
            data: user,
            height: '80%',
            width: '70%'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    delete(user) {
        const dialogRef = this.dialog.open(DeleteComponent, {
            data: { key: user.key, table: 'users', title: 'Delete User', content: 'Are you sure want to delete this user?' },
            height: '35%',
            width: '30%'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    favoriter() {
        this.filterUserFav = !this.filterUserFav;
        if (this.filterUserFav) {
            let dataS = this.dataUser.filter(data => _.has(this.user.saveUserFav, data.key));
            if (dataS) {
                this.dataSource.data = dataS;
            }
        } else {
            this.dataSource.data = this.dataUser;
        }
    }

    checkedInterviewInvitation(user: any) {
        for (let i = 0; i < this.listUsendInterview.length; i++) {
            if (this.listUsendInterview[i].key === user.key) {
                this.listUsendInterview = this.listUsendInterview.filter(usr => usr.key !== user.key);
                return;
            }
        }
        this.listUsendInterview.push({ key: user.key, name: user.name, recuiter: this.user });
    }

    sendInterviewInvitation() {
        if (this.listUsendInterview.length) {
            const dialogRef = this.dialog.open(InterviewComponent, {
                data: this.listUsendInterview,
                height: '80%',
                width: '60%'
            });

            dialogRef.afterClosed().subscribe(result => {
                this.listUsendInterview = [];
                console.log(`Dialog result: ${result}`);
            });
        } else {
            this.toastrService.error('Please, Choose user to set invitation!', 'Error');
        }
    }

}

export class UserDataSource {
    key: string;
    name: string;
    email: string;
    gender: string;
    school: string;
    specialized: string;
    role: string;
    description: string;
    address: string;
    phone: object;
    avatar_url: string;
    age: number
    public constructor(Key, Name, Email, gender, School, Specialized, Role: string, Description: string, Address: string, Phone: object, Avatar_url: string, Age: number) {
        this.key = Key;
        this.name = Name;
        this.email = Email;
        this.gender = gender ? "Male" : "Female";
        this.school = School;
        this.specialized = Specialized ? Specialized : '';
        this.role = Role;
        this.description = Description;
        this.address = Address;
        this.phone = Phone;
        this.avatar_url = Avatar_url;
        this.age = Age ? Age : 18;
    }
}
