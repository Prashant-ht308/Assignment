import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentUrl: string = '';
  constructor(private http:HttpClient, private router: Router) {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event) => {
      this.currentUrl = this.router.url;
    });
  }

  baseUrl:string = "http://localhost:3000/";
  httpHeaders:HttpHeaders = new HttpHeaders().set("Content-Type","application/json");

  getData(endpoint:string){
    const url = this.baseUrl + endpoint;
    return this.http.get(url, {headers:this.httpHeaders});
  };

  postData(endPoint:string, body:any){
    const url = this.baseUrl + endPoint;
    return this.http.post(url, body, {headers:this.httpHeaders});
  };

  updateData(endpoint:string, body:any){
    const url = this.baseUrl + endpoint;
    return this.http.put(url, body);
  };

  deleteData(endPoint:string){
    const url = this.baseUrl + endPoint;
    return this.http.delete(url);
  };



}
