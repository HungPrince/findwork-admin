import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { StatisticalComponent } from './statistical/statistical.component';


const appRoutes: Routes = [
  { path: 'admin', component: AppComponent },
  { path: 'applicant', component: HeaderComponent },
  { path: 'recruiter', component: HeaderComponent },
  { path: 'job-applicant', component: HeaderComponent },
  { path: 'job-recruiter', component: HeaderComponent },
  { path: 'statistical', component: StatisticalComponent },
  {
    path: 'user',
    component: HeaderComponent,
    data: { title: 'Heroes List' }
  },
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
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PageNotFoundComponentComponent,
    StatisticalComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
