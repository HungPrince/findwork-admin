import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TYPES, CITIES, DISTRICTS, STREETS, FUNCTION_JOB } from '../../../configs/data';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from '@firebase/util/dist/esm/src/subscribe';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { MatDatepicker } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery';
import { Moment } from 'moment';
import * as moment from 'moment';

import { PostService } from '../../../services/post/post.service';
import { UntilHelper } from '../../../helpers/until.helper';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})

export class AddPostComponent implements OnInit {
    @ViewChild(MatDatepicker) dateFrom: MatDatepicker<Moment>;
    @ViewChild(MatDatepicker) dateTo: MatDatepicker<Moment>;
    @ViewChild('elementToFocusDateFrom') _input: ElementRef;
    @ViewChild('elementToFocusDateTo') _input1: ElementRef;
    types = TYPES;
    cities: any;
    districts: any;
    streets: any;
    functions = FUNCTION_JOB;
    formJob: FormGroup;
    citySearch: any;
    districtSearch: any;
    job: any = {};

    showSpinder = false;

    constructor(private frmbuider: FormBuilder, private PostService: PostService,
        private untilHelper: UntilHelper, private toastrService: ToastrService) {

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
            company: new FormControl('', Validators.required),
            title: new FormControl('', Validators.required),
            function: new FormControl('', Validators.required),
            website: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            street: new FormControl('', Validators.required),
            district: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            dateFrom: new FormControl(new Date()),
            dateTo: new FormControl(new Date())
        });
    }

    ngOnInit() {

    }

    _openDateFromCalendar(picker: MatDatepicker<Date>) {
        picker.open();
        setTimeout(() => this._input.nativeElement.focus());
    }

    _openDateToCalendar(picker: MatDatepicker<Date>) {
        picker.open();
        setTimeout(() => this._input1.nativeElement.focus());
    }

    changeCity(city) {
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

    save() {
        this.showSpinder = true;
        if (!this.job.key) {
            this.job.address = {};
        }
        let valueJob = this.formJob.value;
        this.job.company = this.untilHelper.niceString(valueJob.company);
        this.job.title = this.untilHelper.niceString(valueJob.title);
        this.job.address.city = valueJob.city;
        this.job.address.district = valueJob.district;
        this.job.address.street = valueJob.street;
        this.job.function = valueJob.function;
        this.job.type = valueJob.type;
        this.job.website = this.untilHelper.niceString(valueJob.website);
        this.job.dateFrom = moment(valueJob.dateFrom).format('ll');
        this.job.dateTo = moment(valueJob.dateTo).format('ll');
        this.job.description = valueJob.description;
        this.job.createdAt = Date.now();
        this.PostService.add(this.job).then((success) => {
            if (success.key) {
                this.toastrService.success("Create the post is successfully!", "Success");
                $('.btn-close').trigger('click');
            } else {
                this.toastrService.error("Something went wrong!", "Error");
            }
            this.showSpinder = false;
        }, error => { console.log(error); this.showSpinder = false }).catch((error) => { console.log(error); this.showSpinder = false });
    }
}
