import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = "jwtToken";

  userCredentials:any[] = [];

  constructor(private http:SharedService) {
    this.http.getData('users').subscribe((res:any)=>{
      this.userCredentials = res;
    })
   };

  login(email:string, password:string){
    const user = this.userCredentials.find(u => u.email === email && u.password === password);
    if(user){
      const token = "eyJhbGciOiJR5cCI6IdWIitpvaG4gRwiaWF0IjoxjM5MDIyKxw";
      localStorage.setItem(this.tokenKey,token);
      return true;
    }else{
      return false;
    }
  };

  logout(){
    localStorage.removeItem(this.tokenKey);
  };

  getToken():string | null{
    return localStorage.getItem(this.tokenKey)
  }

  isAuthenticated(){
    return !!this.getToken();
  }

}
