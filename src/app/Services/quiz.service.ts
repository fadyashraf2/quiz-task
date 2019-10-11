import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Quiz } from 'src/models/quiz';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private httpClient:HttpClient,
    private authService:AuthService
    ) { }
  
  
    insertNewQuiz( quiz:Quiz):Observable<any>{
    const httpOptions={headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'*/*',
      'Authorization':`Bearer ${this.authService.userData.token}`
    })}
    return this.httpClient
      .post(`addNewQuiz`,quiz,httpOptions)
    
  }
    
  deleteOneQuiz( id:any):Observable<any>{
    const httpOptions={headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'*/*',
      'Authorization':`Bearer ${this.authService.userData.token}`
    })}
    return this.httpClient
      .post(`delete`,id,httpOptions)
    
  }
  
  saveEdited( quiz:Quiz):Observable<any>{
    const httpOptions={headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'*/*',
      'Authorization':`Bearer ${this.authService.userData.token}`
    })}
    return this.httpClient
      .post(`edit`,quiz,httpOptions)
    
  }
  

  getAllQuizzes():Observable<any>{
    const httpOptions={headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'*/*',
      'Authorization':`Bearer ${this.authService.userData.token}`
    })}
    return this.httpClient
      .get(`getAllQuizzes`,httpOptions)
    
  }
 
 
  getOneById(id):Observable<any>{
    const httpOptions={headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'*/*',
      'Authorization':`Bearer ${this.authService.userData.token}`
    })}
    return this.httpClient
      .get(`getOneById/${id}`,httpOptions)
    
  }


}
