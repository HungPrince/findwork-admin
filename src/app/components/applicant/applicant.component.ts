import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Applicant } from "../../models/applicant";
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounce } from 'rxjs/operators/debounce';
import { Observable } from 'rxjs/Observable';
import { DataSource } from "@angular/cdk/collections";
import { ApplicantService } from '../../services/applicant/applicant.service';

@Component({
    selector: 'app-applicant',
    templateUrl: './applicant.component.html',
    styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit, AfterViewInit {
    tableName = "Applicant Table";
    tableTitle = "This is list applicant";
    displayedColumns = ['name', 'email', 'phone', 'school', 'speciality'];
    dataSource: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private userService: ApplicantService) {
        this.userService.getAll().subscribe(data => {
            let dataArr = [];
            data.forEach(user => {
                let userDb = new UserDataSource(user.name, user.email, user.gender, user.school, user.speciality ? user.speciality : '');
                dataArr.push(userDb);
            });
            this.dataSource = new MatTableDataSource(dataArr);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    rowClicked(row: any): void {
        console.log(row);
    }

}

export class UserDataSource {
    name: string;
    email: string;
    phone: string;
    school: string;
    speciality: string;
    public constructor(Name, Email, Phone, School, Speciality) {
        this.name = Name;
        this.email = Email;
        this.phone = Phone;
        this.school = School;
        this.speciality = Speciality;
    }
}
