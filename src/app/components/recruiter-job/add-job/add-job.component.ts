import { Component, OnInit, ViewChild } from '@angular/core';
import { TYPES, CITIES, DISTRICTS, STREETS, FUNCTION_JOB } from '../../../configs/data';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from '@firebase/util/dist/esm/src/subscribe';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
    selector: 'app-add-job',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.css']
})

export class AddJobComponent implements OnInit {
    @ViewChild(MatDatepicker) dateFrom: MatDatepicker<Moment>;
    @ViewChild(MatDatepicker) dateTo: MatDatepicker<Moment>;
    types = TYPES;
    cities: any;
    districts: any;
    streets: any;
    functions = FUNCTION_JOB;
    formJob: FormGroup;
    citySearch: any;
    districtSearch: any;
    constructor(private frmbuider: FormBuilder) {
        this.cities = [];
        CITIES.forEach(city => {
            for (let key in city) {
                this.cities.push({
                    name: city[key].name_with_type,
                    code: key
                });
            }
            this.citySearch = this.cities;
        });

        this.formJob = frmbuider.group({
            company: new FormControl(),
            title: new FormControl(),
            function: new FormControl(),
            website: new FormControl(),
            type: new FormControl(),
            city: new FormControl(),
            street: new FormControl(),
            district: new FormControl(),
            description: new FormControl(),
            dateFrom: new FormControl(new Date()),
            dateTo: new FormControl(new Date())
        });
    }

    ngOnInit() {

    }

    changeCity(city) {
        console.log(city);
        this.districts = [];
        DISTRICTS.forEach(district => {
            for (let key in district) {
                if (district[key].parent_code === city.code) {
                    this.districts.push({
                        code: district[key].code,
                        name: district[key].name
                    });
                }
            }
            this.districtSearch = this.districts;
        });
    }

    changeDistrict(district) {
        this.streets = [];
        STREETS.forEach(street => {
            for (let key in street) {
                if (street[key].parent_code === district.code) {
                    this.streets.push({
                        code: street[key].code,
                        name: street[key].name
                    });
                }
            }
        });
    }

    searchCity() {
        let search = this.formJob.value.city.trim().toLowerCase();
        let listCity = this.citySearch.filter(city =>
            city.name.toLowerCase().indexOf(search) > -1);
        if (listCity) {
            this.cities = listCity;
        }
    }

    searchDistrict() {
        let search = this.formJob.value.district.trim().toLowerCase();
        let listDistrict = this.districtSearch.filter(district =>
            district.name.toLowerCase().indexOf(search) > -1);
        if (listDistrict) {
            this.districts = listDistrict;
        }
    }
}
