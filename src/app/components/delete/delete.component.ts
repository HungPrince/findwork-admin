import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

import { ShareService } from '../../services/share/share.service';
@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
    private dataDelete;
    private showSpinner = false;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private shareService: ShareService, private toastrService: ToastrService) {
        this.dataDelete = data;
    }

    delete() {
        this.showSpinner = true;

        if (this.dataDelete.isArray) {
            let length = this.dataDelete.keys.length;
            if (length) {
                for (let i = 0; i < length; i++) {
                    this.shareService.delete(this.dataDelete.table + `/` + this.dataDelete.keys[i]).then(error => {
                        if (i + 1 === length) {
                            this.showSpinner = false;
                            $('.btn-close').trigger('click');
                            this.toastrService.success('Delete these posts successful!');
                        }
                    }).catch(err => {
                        console.log(err);
                        this.showSpinner = false;
                    });
                }
            }
        } else {
            this.shareService.delete(this.dataDelete.table + `/` + this.dataDelete.key).then(error => {
                if (!error) {
                    this.showSpinner = false;
                    this.toastrService.success("Delete the post is successfully!", "Success");
                    $('.btn-close').trigger('click');
                } else {
                    this.showSpinner = false;
                    this.toastrService.error("Something went wrong!", "Success");
                }
            }).catch(err => {
                console.log(err);
                this.showSpinner = false;
            });
        }
    }
}
