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
import { SearchPipe } from './search.pipe';
import { FilterSortComponent } from './filter-sort/filter-sort.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

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
    UsersComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
