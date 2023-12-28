import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Service/shared.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private http:SharedService){}

  data:any
  newPassword:string = ''
  email:string = ''
  ngOnInit(){
    this.http.getData('users').subscribe((res:any)=>{
      this.data = res;
    })
  }

  resetPassword(){
    const url = `users/${this.email}`;
    this.http.updateData(url,this.newPassword)
  }

}
