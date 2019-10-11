import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  backerror=false;
  isCreated=false;

  
  constructor(private authservice: AuthService,private router:Router) { 
    this.backerror=false;
  }


  
  
  onSubmit(registerFormObject: NgForm) {

    const name = registerFormObject.value.username;
    const email = registerFormObject.value.email;
    const password = registerFormObject.value.password;
    console.log(name ,email,password)
    
    this.authservice.userRegister(name, email, password).subscribe(
      data => { 
          this.isCreated=true;
          this.router.navigate(['/home']);
          location.reload()
        },
          (error)=>{this.backerror=true;}
          

      
    );
  }

  ngOnInit() {
    if (localStorage.getItem("userData") != null){
      this.router.navigate(['/home']);
    } 
  }

}
