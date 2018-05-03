import { Component, OnInit, ElementRef } from '@angular/core';

import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Chart } from 'chart.js';

import { StatisticalService } from '../../services/statistical/statistical.service';

@Component({
    selector: 'app-statistical',
    templateUrl: './statistical.component.html',
    styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
    barChart: any;
    doughnutChart: any;
    lineChart: any;
    dataChartUser = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataChartPost = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataChartPostUser = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    private months = ["Jan", "Fer", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    data: any = {};

    constructor(private statisticalService: StatisticalService,
        private storage: AsyncLocalStorage,
        private elementRef: ElementRef) {
        statisticalService.countUser().subscribe(data => {
            this.data.countUser = data.length;
            this.data.countApplicant = 0;
            this.data.countRecruiter = 0;

            let count = 0;

            data.forEach(user => {
                let month = new Date(user.createdAt).getMonth();
                this.dataChartUser[month]++;
                count++;
                if (count === data.length) {
                    this.initChartUser();
                }
                if (user.role == "applicant") {
                    this.data.countApplicant++;
                } else if (user.role == "recruiter") {
                    this.data.countRecruiter++;
                }
            });
        });

        statisticalService.countPost().subscribe(data => {
            this.data.countPost = data.length;
            this.data.yourPost = 0;
            let count = 0;
            this.storage.getItem('user').subscribe(user => {
                data.forEach(post => {
                    if (post.userId == user.uid) {
                        data.yourPost++;
                    }
                    let month = new Date(post.createdAt).getMonth();
                    if (post.userId == user.uid) {
                        this.dataChartPostUser[month]++;
                    }
                    this.dataChartPost[month]++;
                    count++;
                    console.log(count);
                    if (count == data.length) {
                        console.log('abc');
                        this.initChartPost();
                        this.initChartUserPost();
                    }

                });
            });

        });
    }

    ngOnInit() {
    }

    initChartUser() {

    }

    initChartPost() {

    }

    initChartUserPost() {
        let lineRef = this.elementRef.nativeElement.querySelector('canvas');
        this.lineChart = new Chart(lineRef, {
            type: 'line',
            data: {
                labels: this.months,
                datasets: [
                    {
                        label: '# of number User',
                        data: this.dataChartPostUser
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                }
            }
        });
    }
}
