import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, fadeInContent, MatDialog } from "@angular/material";
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounce } from 'rxjs/operators/debounce';
import { Observable } from 'rxjs/Observable';
import { UserDetailComponent } from "./user-detail/user-detail.component";

import { UserService } from '../../services/user/user.service';
import { User } from "../../models/user";
import { FileService } from '../../services/file/file.service';

@Component({
    selector: 'user-component',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent {
    tableName = "User Table";
    tableTitle = "This is list user";
    displayedColumns = ['name', 'email', 'avatar', 'school', 'specialized', 'role', 'action'];
    dataSource: any;
    user: any;
    keyword: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public loading = false;

    constructor(private userService: UserService, private dialog: MatDialog, private fileService: FileService) {
        userService.testPagination();
        this.loading = true;
        userService.getAll().subscribe(data => {
            let dataArr = [];
            data.forEach(user => {
                let address;
                if (user.address) {
                    address = user.address.city + ", " + user.address.district + ", " + user.address.street + ", " + user.address.location;
                }
                let userDb = new UserDataSource(
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
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, error => { console.log(error); this.loading = false });
    }

    exportUser() {
        this.fileService.exportAsExcelFile(this.dataSource.filteredData, 'user');
    }

    rowClicked(row: any): void {
        console.log(row);
    }

    changeDataSoure(keyword) {
        this.dataSource.filter = keyword.trim().toLowerCase();
    }

    edit(user) {
        this.user = user;
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
        this.user = user;
    }

}

export class UserDataSource {
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
    public constructor(Name, Email, gender, School, Specialized, Role: string, Description: string, Address: string, Phone: object, Avatar_url: string, Age: number) {
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
