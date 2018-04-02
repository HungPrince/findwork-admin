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
import { ToastrModule } from 'ngx-toastr';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

import { FIREBASE_CONFIG } from './configs/constant';
import { PostService } from './services/post/post.service';
import { UntilHelper } from './helpers/until.helper';
import { MomentPipe } from './pipes/moment.pipe';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/shares/sidebar/sidebar.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { StatisticalComponent } from './components/statistical/statistical.component';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user/user.service';
import { NavigationComponent } from './components/shares/navigation/navigation.component';
import { FooterComponent } from './components/shares/footer/footer.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { DetailPostComponent } from './components/post/detail/detail.component';
import { AddPostComponent } from './components/post/add/add.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ManagerFileComponent } from './components/manager-file/manager-file.component';
import { FileService } from './services/file/file.service';
import { ContactService } from './services/contact/contact.service';
import { ContactComponent } from './components/contact/contact.component';
import { StatisticalService } from './services/statistical/statistical.service';

const appRoutes: Routes = [
    { path: 'admin', component: StatisticalComponent },
    { path: 'user', component: UserComponent },
    { path: 'post', component: PostComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'update-profile', component: UpdateUserComponent },
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
        UserComponent,
        NavigationComponent,
        FooterComponent,
        PostComponent,
        LoginComponent,
        SignupComponent,
        UserDetailComponent,
        DetailPostComponent,
        AddPostComponent,
        MomentPipe,
        UpdateUserComponent,
        LogoutComponent,
        ManagerFileComponent,
        ContactComponent,
    ],
    entryComponents: [UserDetailComponent, DetailPostComponent, AddPostComponent],
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
        ToastrModule.forRoot(),
        AsyncLocalStorageModule
    ],
    providers: [
        UserService,
        PostService,
        FileService,
        ContactService,
        StatisticalService,
        AngularFireAuth,
        AngularFireDatabase,
        MatDatepicker,
        UntilHelper
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }
