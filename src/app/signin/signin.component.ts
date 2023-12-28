import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../Service/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm!:FormGroup;
  userCredentials:any;
  constructor(private fb:FormBuilder, private http:SharedService, private router:Router, private authService:AuthService){}

  ngOnInit(){
    this.signInForm = this.fb.group({
      "email" : ['',[Validators.required]],
      "password" : ['',[Validators.required]]
    });

    this.http.getData('users').subscribe((res:any)=>{
      this.userCredentials = res;
    });


  }
  currentUser:string = '';
  signIn(){
    const email:string = this.signInForm.get('email')?.value;
    const password:string = this.signInForm.get('password')?.value;

    const isAuthenticated = this.authService.login(email, password);

    if(isAuthenticated){
      console.log("User Matched");
      this.router.navigate(['/user-widget']);
    }else{
      alert("No user found")
      this.router.navigate(['/signUp'])
    }

    // const matchingUser = this.userCredentials.find((user:any)=>{
    //   return user.email == email && user.password == password
    // })

    // if(matchingUser){
    //   console.log("user matched")
    //   localStorage.setItem('currentUser',matchingUser.id);
    //   this.router.navigate(['/user-widget']);
    // }else{
    //   console.log('no user found')
    //   this.router.navigate(['signUp'])
    // }


  }
}
