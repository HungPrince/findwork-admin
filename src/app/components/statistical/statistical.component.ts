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
    dataChartUser = [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataChartPost = [0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataChartPostUser = [2, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    private months = ["Jan", "Fer", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    showSpinder = true;
    data: any = {};

    constructor(private statisticalService: StatisticalService,
        private storage: AsyncLocalStorage,
        private elementRef: ElementRef) {
        let date = new Date();
        let month = date.getMonth();
        this.months = this.months.slice(0, month + 1);
        statisticalService.countUser().subscribe(data => {
            this.data.countUser = data.length;
            this.data.countApplicant = 0;
            this.data.countRecruiter = 0;

            data.forEach(user => {
                let month = new Date(user.createdAt).getMonth();
                this.dataChartUser[month]++;

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
                    if (count == data.length) {
                        this.initChartUserPost();
                        this.showSpinder = false;
                    }

                });
            });

        });
    }

    ngOnInit() {
    }

    initChartUserPost() {
        let lineRef = this.elementRef.nativeElement.querySelector('canvas');
        this.lineChart = new Chart(lineRef, {
            type: 'line',
            data: {
                labels: this.months,
                datasets: [
                    {
                        label: '# of number user',
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        borderColor: "#ffcc00",
                        data: this.dataChartUser,
                    },
                    {
                        label: '# of number post',
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        borderColor: "#3cba9f",
                        data: this.dataChartPost,
                    },
                    {
                        label: '# of number your post',
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        borderColor: "#952097",
                        data: this.dataChartPostUser
                    },
                ]
            },
            options: {
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            min: 0,
                            stepSize: 1,
                            max: 10
                        }
                    }],
                    yAxes: [{
                        display: true
                    }],
                }
            }
        });
    }
}
