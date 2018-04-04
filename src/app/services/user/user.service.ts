import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { map } from "rxjs/operators";
import { AsyncLocalStorage } from 'angular-async-local-storage';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { User } from "./../../models/user";

@Injectable()
export class UserService {

    private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    private EXCEL_EXTENSION = '.xlsx';
    constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
        private localStorage: AsyncLocalStorage) {
    }

    getAll(): Observable<any> {
        return this.af.list('users').valueChanges();
    }

    getUserById(userId): any {
        return this.af.database.ref(`users/${userId}`).once('value', data => { return data.val(); });
    }

    update(user): any {
        return this.af.database.ref(`users/${user.uid}`).update(user);
    }

    testPagination(): any {
        return this.af.database.ref("users").orderByChild('name').startAt("Hung Bui").limitToLast(5).once("value", (data) => { console.log(data.val()) });
    }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: this.EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
    }

}
