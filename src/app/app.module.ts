import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { CreateJobPostingComponent } from './dashboard/create-edit-job-posting/create-edit-job-posting.component';
import { FavoriteJobComponent } from './home/favorite-job/favorite-job.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppliedJobComponent } from './home/applied-job/applied-job.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    CreateJobPostingComponent,
    FavoriteJobComponent,
    ProfileComponent,
    AppliedJobComponent,
    NavbarComponent,
    NotFoundComponent
  ],
  imports: [SharedModule, BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
