import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { ToastrService } from 'ngx-toastr';
import { } from 'ngx-loading';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { CITIES, DISTRICTS, STREETS } from '../../../configs/data';

import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
    cities: any;
    districts: any;
    streets: any;
    formUser: any;
    user: any;
    showSpinner = false;
    selectedFiles: FileList;
    file: File;
    citySearch: any;
    districtSearch: any;
    streetSearch: any;

    constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router,
        private localStorage: AsyncLocalStorage, private toastService: ToastrService, private storage: AngularFireStorage) {
        this.localStorage.getItem('user').subscribe(user => {
            if (user) {
                this.changeCity(user.city);
                this.changeDistrict(user.address.district);
                this.user = user;
                this.formUser = this.formBuilder.group({
                    uid: new FormControl(user.uid),
                    name: new FormControl(user.name),
                    userName: new FormControl(user.userName ? user.userName : ''),
                    age: new FormControl(user.age),
                    gender: new FormControl({ value: user.gender, checked: user.gender }),
                    school: new FormControl(user.school),
                    specialized: new FormControl(user.specialized),
                    email: new FormControl(user.email),
                    city: new FormControl(user.address.city),
                    district: new FormControl(user.address.district),
                    street: new FormControl(user.address.street),
                    phone: new FormControl(user.phone),
                    description: new FormControl(user.description)
                });
                if (!this.user.avatar_url) {
                    this.user.avatar_url = "";
                }
            } else {
                router.navigateByUrl('/login');
            }
        });

        this.formUser = this.formBuilder.group({
            name: new FormControl(),
            email: new FormControl(),
            userName: new FormControl(),
            age: new FormControl(),
            school: new FormControl(),
            specialized: new FormControl(),
            gender: new FormControl(),
            city: new FormControl(),
            district: new FormControl(),
            street: new FormControl(),
            phone: new FormControl(),
            description: new FormControl()
        });
    }

    ngOnInit() {
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

    update() {
        this.showSpinner = true;
        let user = this.formUser.value;
        for (let key in user) {
            if (key == 'city' || key == 'district' || key == 'street') {
                this.user.address[key] = user[key];
            }
            this.user[key] = user[key];
        };
        this.userService.update(this.user).then(error => {
            if (!error) {
                this.toastService.success('Update profile successfully!', 'success', {
                    timeOut: 1000
                });
                this.localStorage.setItem('user', this.user).subscribe();
            } else {
                this.toastService.error('Something went wrong!', 'error', {
                    timeOut: 1000
                });
            }
            this.showSpinner = false;
        }, error => { console.log(error); this.showSpinner = false })
            .catch(error => { console.log(error); this.showSpinner = false });
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
        let search = this.formUser.value.city.trim().toLowerCase();
        let listCity = this.citySearch.filter(city =>
            city.name.toLowerCase().indexOf(search) > -1);
        if (listCity) {
            this.cities = listCity;
        }
    }

    searchDistrict() {
        let search = this.formUser.value.district.trim().toLowerCase();
        let listDistrict = this.districtSearch.filter(district =>
            district.name.toLowerCase().indexOf(search) > -1);
        if (listDistrict) {
            this.districts = listDistrict;
        }
    }

    searchStreet() {
        let search = this.formUser.value.street.trim().toLowerCase();
        let listStreet = this.streetSearch.filter(street =>
            street.name.toLowerCase().indexOf(search) > -1);
        if (listStreet) {
            this.streets = listStreet;
        }
    }

    chooseFiles(event) {
        this.selectedFiles = event.target.files;
        if (this.selectedFiles.item(0)) {
            this.uploadpic();
        }
    }

    uploadpic() {
        let file = this.selectedFiles.item(0);
        let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
        this.storage.upload('/images/' + uniqkey, file).then((uploadTask) => {
            this.user.avatar_url = uploadTask.downloadURL;
            this.userService.update(this.user).then(error => {
                if (!error) {
                    this.toastService.success('Upload avatar successfully!', 'success', {
                        positionClass: 'toast-bottom-right'
                    });
                    this.localStorage.setItem('user', this.user).subscribe();
                }
            });
        });
    }
}
