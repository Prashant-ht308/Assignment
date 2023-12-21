import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

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
