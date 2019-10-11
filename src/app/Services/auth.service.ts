import { Injectable } from '@angular/core';

import {  HttpHeaders,  HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthUser:boolean;
  public userData:any;
  private httpOptions:any;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor(
    private http:HttpClient,
    private router:Router) {

      if (localStorage.getItem("userData") == null) {
        this.isAuthUser=false;
        this.httpOptions={
          headers:new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept':'*/*'
          })
        };
        this.router.navigate(['/login']);
      
      }
      else{ this.userData = JSON.parse(localStorage.getItem('userData'));
      this.httpOptions={
        headers:new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept':'*/*',
          'Authorization':`Bearer ${this.userData.token}`
        })
      };
      // this.router.navigate(['/']);
      }
       
      
    }

  userRegister(name,email,password):Observable<any>
  {
    return this.http.post<any>(`teacher/signup`,
    {name,email,password},this.httpOptions).pipe(tap(res=>{
      const userRes={
        _id:res.newTeacher._id,        
        email:res.newTeacher.email,
        token:res.token
      }
      localStorage.setItem('userData',  JSON.stringify(userRes));
      this.loggedIn.next(true);
      this.router.navigate(['/']);

    
    }));
    
  }  

  userLogin(email,password):Observable<any>
  {
    return this.http.post<any>(`teacher/login`,
    {email,password},this.httpOptions).pipe(tap(res => {
      const userRes={
        _id:res.teacher._id,        
        email:res.teacher.email,
        token:res.token
      }
      localStorage.setItem('userData',  JSON.stringify(userRes));
      this.loggedIn.next(true);
      this.router.navigate(['/']);

    }));

     
  }

  
  

  

}
