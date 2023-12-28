import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Service/shared.service';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-user-widget-component',
  templateUrl: './user-widget-component.component.html',
  styleUrls: ['./user-widget-component.component.scss']
})
export class UserWidgetComponentComponent implements OnInit {

  constructor(private http:SharedService, public router:Router, private authService:AuthService){}

  showFiller:boolean = false;

  currentUserId:any;
  currentUserDetails:any;

  ngOnInit(){
    this.currentUserId = localStorage.getItem('currentUser')
    this.getCurrentUserData();
  }

  getCurrentUserData(){
    const url = `users/${this.currentUserId}`;
    this.http.getData(url).subscribe((res:any)=>{
      this.currentUserDetails = res;
    })
  }

  logout(){
    this.router.navigate(['/signIn'])
    return this.authService.logout();
  }

}
