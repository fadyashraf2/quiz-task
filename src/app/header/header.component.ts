import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged:boolean;
  constructor(private authservice:AuthService,
    private router:Router) { 
      if (localStorage.getItem("userData") == null){
        this.isLogged =false
      }else{
        this.isLogged =true;
      } 
    }

  ngOnInit() {
     if (localStorage.getItem("userData") == null){
      this.isLogged =false
    }else{
      this.isLogged =true;
    }
  }

  logOut(){
    localStorage.removeItem('userData');
    location.reload();
  }
  
}
