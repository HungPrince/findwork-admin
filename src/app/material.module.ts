import { NgModule } from '@angular/core';

import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule
} from "@angular/material";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TagInputModule } from 'ngx-chips';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports:
        [
            MatInputModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatProgressSpinnerModule,
            MatButtonModule,
            MatCheckboxModule,
            MatSelectModule,
            MatIconModule,
            MatListModule,
            MatDialogModule,
            MatDatepickerModule,
            MatAutocompleteModule,
            TagInputModule,
            MatFormFieldModule
        ],
    exports: [
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatIconModule,
        MatListModule,
        MatDialogModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        TagInputModule,
        MatFormFieldModule
    ]
})

export class MaterialModule { }
