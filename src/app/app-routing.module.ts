import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
   
  {path:'addQuiz',component:AddQuizComponent },
  {path:'login',component:LoginComponent },
  {path:'signup',component:RegisterComponent },
  {path:'home',component:HomeComponent },
  {path:'test',component:TestComponent },
  {path:'edit/:id',component:EditComponent },
  {path:"**",component:HomeComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
