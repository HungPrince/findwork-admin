import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { TYPES, CITIES, DISTRICTS, STREETS, FUNCTION_JOB } from '../../../configs/data';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from '@firebase/util/dist/esm/src/subscribe';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { MatDatepicker, MAT_DIALOG_DATA } from '@angular/material';
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
    formPost: FormGroup;
    citySearch: any;
    districtSearch: any;
    streetSearch: any;
    post: any = {};
    actionPost: string;

    showSpinder = false;

    constructor(private frmbuider: FormBuilder, private postService: PostService,
        private untilHelper: UntilHelper, private toastrService: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data) {
            this.changeCity(data.city);
            this.changeDistrict(this.data.address.district);
            this.actionPost = "Update Post";
            this.formPost = frmbuider.group({
                key: new FormControl(data.key),
                company: new FormControl(data.company, Validators.required),
                title: new FormControl(data.title, Validators.required),
                function: new FormControl(data.function, Validators.required),
                website: new FormControl(data.website, Validators.required),
                type: new FormControl(data.type, Validators.required),
                city: new FormControl(data.city, Validators.required),
                district: new FormControl(data.address.district, Validators.required),
                street: new FormControl(data.address.street, Validators.required),
                description: new FormControl(data.description, Validators.required),
                dateFrom: new FormControl(new Date(data.dateFrom)),
                dateTo: new FormControl(new Date(data.dateTo))
            });
        } else {
            this.actionPost = "Create Post";
            this.formPost = frmbuider.group({
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
        this.streetSearch = this.streets;
    }

    searchCity() {
        let search = this.formPost.value.city.trim().toLowerCase();
        let listCity = this.citySearch.filter(city =>
            city.name.toLowerCase().indexOf(search) > -1);
        if (listCity) {
            this.cities = listCity;
        }
    }

    searchDistrict() {
        let search = this.formPost.value.district.trim().toLowerCase();
        let listDistrict = this.districtSearch.filter(district =>
            district.name.toLowerCase().indexOf(search) > -1);
        if (listDistrict) {
            this.districts = listDistrict;
        }
    }

    searchStreet() {
        let search = this.formPost.value.street.trim().toLowerCase();
        let listStreet = this.streetSearch.filter(street =>
            street.name.toLowerCase().indexOf(search) > -1);
        if (listStreet) {
            this.streets = listStreet;
        }
    }

    save() {
        this.showSpinder = true;
        this.post.address = {};
        let valuePost = this.formPost.value;
        for (let key in valuePost) {
            if (key == "city" || key == "street" || key == "district") {
                this.post.address[key] = valuePost[key];
                if (key == "city") {
                    this.post[key] = valuePost[key];
                }
            }
            else if (key == "dateFrom" || key == "dateTo") {
                this.post[key] = moment(valuePost[key]).format('ll');
            }
            else {
                this.post[key] = valuePost[key];
            }
        }
        if (valuePost.key) {
            this.post.updatedAt = Date.now();
            console.log(this.post);
            this.postService.update(this.post).then((error) => {
                if (!error) {
                    this.toastrService.success("Update the post is successfully!", "Success");
                    $('.btn-close').trigger('click');
                } else {
                    this.toastrService.error("Something went wrong!", "Error");
                }
            }, error => { console.log(error); this.showSpinder = false })
                .catch((error) => { console.log(error); this.showSpinder = false })
        } else {
            this.post.createdAt = Date.now();
            this.postService.add(this.post).then((success) => {
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
}
