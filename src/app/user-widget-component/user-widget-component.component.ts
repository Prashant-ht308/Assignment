import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Service/shared.service';
import { AuthService } from '../Service/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-widget-component',
  templateUrl: './user-widget-component.component.html',
  styleUrls: ['./user-widget-component.component.scss']
})
export class UserWidgetComponentComponent implements OnInit {

  constructor(private http:SharedService, public router:Router, private authService:AuthService, private breakpointObserver:BreakpointObserver){}

  showFiller:boolean = false;
  showToolbar:boolean = false;
  currentUserId:any;
  currentUserDetails:any;

  ngOnInit(){
    this.currentUserId = localStorage.getItem('currentUser')
    this.getCurrentUserData();

    this.breakpointObserver
    .observe(Breakpoints.XSmall).subscribe((result)=>{
      this.showToolbar = false;
      if(result.matches){
        this.showToolbar = true;
      }
    })
  }

  getCurrentUserData(){
    const url = `users/${this.currentUserId}`;
    this.http.getData(url).subscribe((res:any)=>{
      this.currentUserDetails = res;
    })

  }

  logout(){
    this.router.navigate(['/signIn'])
    localStorage.removeItem('currentUser');
    return this.authService.logout();
  }

}
