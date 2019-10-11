import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,CanActivate {
  
  backerror=false
  constructor(
    private authservice:AuthService,
    private router:Router) { }
    
  onSubmit(formObject:NgForm)
  {
    const email=formObject.value.email;
    const password=formObject.value.password;

    this.authservice.userLogin(email,password).subscribe(
      data=>{
        console.log(data);
        this.backerror=false;
        location.reload()

      },
      (error)=>{this.backerror=true;}
    
    );
    
  }
  ngOnInit() {
    this.backerror=false;
    if (localStorage.getItem("userData") != null){
      this.router.navigate(['/home']);
    } 
    
   

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authservice.isAuthUser) {
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
