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
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MatDatepicker } from '@angular/material';
import { EditorModule } from '@tinymce/tinymce-angular';

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
import { ManagerFileComponent } from './components/manager-file/manager-file.component';
import { FileService } from './services/file/file.service';
import { ContactService } from './services/contact/contact.service';
import { ContactComponent } from './components/contact/contact.component';
import { StatisticalService } from './services/statistical/statistical.service';

const appRoutes: Routes = [
    { path: 'admin', component: ManagerFileComponent },
    { path: 'applicant', component: ApplicantComponent },
    { path: 'recruiter', component: RecruiterComponent },
    { path: 'job-applicant', component: ApplicantJobComponent },
    { path: 'job-recruiter', component: RecruiterJobComponent },
    { path: 'statistical', component: StatisticalComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'contact', component: ContactComponent },
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
        ManagerFileComponent,
        ContactComponent,
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
        AngularFireStorageModule,
        LoadingModule.forRoot({
            animationType: ANIMATION_TYPES.wanderingCubes,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff'
        }),
        MaterialModule,
        EditorModule,
    ],
    providers: [
        UserService,
        JobService,
        FileService,
        ContactService,
        StatisticalService,
        AngularFireAuth,
        AngularFireDatabase,
        MatDatepicker],
    bootstrap: [AppComponent],
})

export class AppModule { }
