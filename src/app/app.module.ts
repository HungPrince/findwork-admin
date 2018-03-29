import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { MaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http';
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
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDetailComponent } from './components/applicant/user-detail/user-detail.component';
import { JobDetailComponent } from './components/recruiter-job/job-detail/job-detail.component';

import { FIREBASE_CONFIG } from './configs/constant';
import { JobService } from './services/job/job.service';
import { AddJobComponent } from './components/recruiter-job/add-job/add-job.component';

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
        UserDetailComponent,
        JobDetailComponent,
        AddJobComponent,
    ],
    entryComponents: [UserDetailComponent, JobDetailComponent, AddJobComponent],
    imports: [
        RouterModule.forRoot(
            appRoutes,
        ),
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
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
        MaterialModule
    ],
    providers: [
        UserService,
        JobService,
        AngularFireAuth,
        AngularFireDatabase],
    bootstrap: [AppComponent],
})

export class AppModule { }
