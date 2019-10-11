import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../Services/quiz.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  addQuizForm = this.fb.group({
    quizTitle: ['', Validators.required],
    quizDescr: [''],
    IsPublished: false,
    questions: this.fb.array([this.questions])

  })
  get questions(): FormGroup {
    return this.fb.group({
      question: '',
      answers: this.fb.array([this.answers]),
      explanation: '',
      correctAnswerIndex: ['', Validators.required]

    })
  }
  get answers(): FormGroup {
    return this.fb.group({ answer: ['',Validators.required ]})
  }

  isSubmitted: boolean;
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private quizSer: QuizService
  ) { }

  ngOnInit() {

    if (localStorage.getItem("userData") == null) {
      this.router.navigate(['/login']);
    }
    this.isSubmitted = false
  }



  onSubmit() {
    this.isSubmitted = true;
    if (!this.addQuizForm.valid) {
    }
    else {
      console.log(this.addQuizForm.value);

      this.quizSer.insertNewQuiz(this.addQuizForm.value).subscribe(
        (data) => {

          console.log(data);
          this.router.navigate(['/home']);

        },
        (err) => { console.log("err") },
        () => { console.log("completed") }
      );



    }
  }

  saveAndPublish() {
    this.isSubmitted = true;
    if (!this.addQuizForm.valid) {
    }
    else {
      this.addQuizForm.get('IsPublished').setValue(true);
      this.quizSer.insertNewQuiz(this.addQuizForm.value).subscribe(
        (data) => {

          console.log(data);
          this.router.navigate(['/home']);

        },
        (err) => { console.log("err") },
        () => { console.log("completed") }
      );
    }
  }


  addNewQuestion() {
    (this.addQuizForm.get("questions") as FormArray).push(this.questions);
  }
  addAnswer(ques) {
    (ques.get("answers") as FormArray).push(this.answers);
  }

  removeQuestion(k) {
    (this.addQuizForm.get("questions") as FormArray).removeAt(k)
  }
  removeAnswer(k) {
    (k.get("answers") as FormArray).removeAt(k)
  }
  get quizTitle() { return this.addQuizForm.get('quizTitle'); }
  get correctAnswer() { return this.questions.get("correctAnswerIndex") }






}

