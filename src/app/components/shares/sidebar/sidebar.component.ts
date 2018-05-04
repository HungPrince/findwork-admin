import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
        $(document).ready(function () {
            $('.sidebar-wrapper li').on('click', function () {
                $('.sidebar-wrapper li').removeClass('active');
                $(this).addClass('active');
            });
        });
    }

}
