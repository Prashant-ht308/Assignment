import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { UserWidgetComponentComponent } from './user-widget-component/user-widget-component.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SearchPipe } from './Pipes/search.pipe';
import { FilterSortComponent } from './filter-sort/filter-sort.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LastloginPipe } from './Pipes/lastlogin.pipe';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    UserWidgetComponentComponent,
    AddUserComponent,
    UserListComponent,
    PagenotfoundComponent,
    UserCardsComponent,
    DeleteDialogComponent,
    SearchPipe,
    FilterSortComponent,
    DashboardComponent,
    UsersComponent,
    SignupComponent,
    SigninComponent,
    ForgetPasswordComponent,
    LastloginPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
