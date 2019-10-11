import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../Services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quizzes:[]=[];
  quizzesExisted:boolean;
  constructor(
    private authservice:AuthService,
    private quizSer:QuizService,
    private router:Router
    ) {
      
    }
    
    ngOnInit() {
      if (localStorage.getItem("userData") == null){
        this.router.navigate(['/login']);
      }else{
        this.quizSer.getAllQuizzes().subscribe((quizzes)=>{
          this.quizzes = quizzes;
            if(this.quizzes.length>0){
              this.quizzesExisted = true;
            }else{
              this.quizzesExisted = false;
              
            }
      })
      } 
      
      
      
  }
  
  
  deleteOneQuiz(ID){
    const id={'id':ID }
    this.quizSer.deleteOneQuiz(id).subscribe((data)=>{
      console.log(data);
      location.reload();
    },
    (err)=>{
      console.log(err);
    }
    )
  }


}
