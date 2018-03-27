import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule
} from "@angular/material";

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
import { ApplicantService } from './services/applicant/applicant.service';
import { NavigationComponent } from './components/shares/navigation/navigation.component';
import { FooterComponent } from './components/shares/footer/footer.component';
import { RecruiterComponent } from './components/recruiter/recruiter.component';
import { RecruiterJobComponent } from './components/recruiter-job/recruiter-job.component';
import { ApplicantJobComponent } from './components/applicant-job/applicant-job.component'

import { FIREBASE_CONFIG } from './configs/constant';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const appRoutes: Routes = [
    { path: 'admin', component: StatisticalComponent },
    { path: 'applicant', component: ApplicantComponent },
    { path: 'recruiter', component: RecruiterComponent },
    { path: 'job-applicant', component: ApplicantJobComponent },
    { path: 'job-recruiter', component: RecruiterJobComponent },
    { path: 'statistical', component: StatisticalComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
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
        SignupComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            // { enableTracing: true }
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
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireAuthModule
    ],
    providers: [ApplicantService, AngularFireAuth, AngularFireDatabase],
    bootstrap: [AppComponent],
})

export class AppModule { }
