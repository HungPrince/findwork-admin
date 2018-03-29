import { Component, OnInit } from '@angular/core';
import { TYPES, CITIES, DISTRICTS, STREETS, FUNCTION_JOB } from '../../../configs/data';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-job',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

    types = TYPES;
    cities: any;
    districts: any;
    streets: any;
    functions = FUNCTION_JOB;
    formJob: FormGroup;
    constructor(private frmbuider: FormBuilder) {
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
        CITIES.forEach(city => {
            for (let key in city) {
                this.cities.push({
                    name: city[key].name_with_type,
                    code: key
                });
            }
        });
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

}
