import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserWidgetComponentComponent } from './user-widget-component/user-widget-component.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: 'user-widget',
    component: UserWidgetComponentComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          { path: '', redirectTo: 'user-list', pathMatch: 'full' },
          { path: 'user-list', component: UserListComponent },
          { path: 'add-user', component: AddUserComponent },
          { path: 'edit-user', component: AddUserComponent },
          { path: 'user-card', component: UserCardsComponent },
        ]
      },
    ]
  },
  {path : 'signUp', component : AddUserComponent},
  { path: 'signIn', component: SigninComponent },
  { path: '', redirectTo: 'signIn', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
