import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { QuizService } from '../Services/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private quizId;
  private quiz;
  addQuizForm = this.fb.group({
    _id: [''],
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
    return this.fb.group({ answer: '', })
  }

  isSubmitted: boolean;
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private quizSer: QuizService
  ) { this.isSubmitted = false }


  ngOnInit() {
    if (localStorage.getItem("userData") == null) {
      this.router.navigate(['/login']);

    }

    this.isSubmitted = false
    this.quizId = this.activatedRoute.snapshot.params.id;
    this.quizSer.getOneById(this.quizId).subscribe(
      (data) => {
        this.quiz = data;
        console.log(this.quiz);


        this.addQuizForm.patchValue(data);

      })
  }
  onSubmit() {
    this.isSubmitted = true;
    if (!this.addQuizForm.valid) {
    }
    else {
    console.log(this.addQuizForm.value);
    // console.log(this.addQuizForm.controls. )

    this.addQuizForm.controls['_id'].setValue(this.quizId);
    this.quizSer.saveEdited(this.addQuizForm.value).subscribe(
      (data) => {

        console.log(data);

        this.router.navigate(['/home']);
      },
      (err) => { console.log(err) },
      () => { console.log("completed") }
    );
    }

  }



  saveAndPublish() {
    this.isSubmitted = true;
    this.addQuizForm.get('IsPublished').setValue(true);
    if (!this.addQuizForm.valid) {
    }
    else {
    this.quizSer.saveEdited(this.addQuizForm.value).subscribe(
      (data) => {

        console.log(data);
        this.router.navigate(['/home']);

      },
      (err) => { console.log(err) },
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
