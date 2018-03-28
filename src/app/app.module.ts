import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule
} from "@angular/material";

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/shares/sidebar/sidebar.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { StatisticalComponent } from './components/statistical/statistical.component';
import { ApplicantComponent } from './components/applicant/applicant.component';
import { UserService } from './services/user/user.service';
import { NavigationComponent } from './components/shares/navigation/navigation.component';
import { FooterComponent } from './components/shares/footer/footer.component';
import { RecruiterComponent } from './components/recruiter/recruiter.component';
import { RecruiterJobComponent } from './components/recruiter-job/recruiter-job.component';
import { ApplicantJobComponent } from './components/applicant-job/applicant-job.component'

import { FIREBASE_CONFIG } from './configs/constant';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDetailComponent } from './components/applicant/user-detail/user-detail.component';

const appRoutes: Routes = [
    { path: 'admin', component: StatisticalComponent },
    { path: 'applicant', component: ApplicantComponent },
    { path: 'recruiter', component: RecruiterComponent },
    { path: 'job-applicant', component: ApplicantJobComponent },
    { path: 'job-recruiter', component: RecruiterJobComponent },
    { path: 'statistical', component: StatisticalComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: '',
        redirectTo: '/admin',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponentComponent }
];


@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        PageNotFoundComponentComponent,
        StatisticalComponent,
        ApplicantComponent,
        NavigationComponent,
        FooterComponent,
        RecruiterComponent,
        RecruiterJobComponent,
        ApplicantJobComponent,
        LoginComponent,
        SignupComponent,
        UserDetailComponent
    ],
    entryComponents: [UserDetailComponent],
    imports: [
        RouterModule.forRoot(
            appRoutes,
        ),
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireAuthModule,
        LoadingModule.forRoot({
            animationType: ANIMATION_TYPES.wanderingCubes,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff'
        }),
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatIconModule,
        MatListModule,
        MatDialogModule
    ],
    providers: [UserService, AngularFireAuth, AngularFireDatabase],
    bootstrap: [AppComponent],
})

export class AppModule { }
