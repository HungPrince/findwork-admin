import { Component, OnInit } from '@angular/core';

import { StatisticalService } from '../../services/statistical/statistical.service';

@Component({
    selector: 'app-statistical',
    templateUrl: './statistical.component.html',
    styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {

    data: any = {};

    constructor(private statisticalService: StatisticalService) {
        statisticalService.countUser().subscribe(data => {
            this.data.countUser = data.length;
            this.data.countApplicant = 0;
            this.data.countRecruiter = 0;
            data.forEach(user => {
                if (user.role == "applicant") {
                    this.data.countApplicant++;
                } else if (user.role == "recruiter") {
                    this.data.countRecruiter++;
                }
            });
        });

        statisticalService.countPost().subscribe(data => {
            this.data.countPost = data.length;
        });
    }

    ngOnInit() {
    }

}
