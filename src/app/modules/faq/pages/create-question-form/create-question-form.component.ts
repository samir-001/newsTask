import { ViewChild, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { QuestionService } from '../../services/question.service';
import { LangugeService } from 'src/app/shared/services/languge.service';
import { IQuestion } from 'src/app/core/modals/question';

@Component({
  selector: 'app-create-question-form',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    TranslateModule,
  ],
  providers: [],

  templateUrl: './create-question-form.component.html',
  styleUrls: ['./create-question-form.component.css'],
})
export class CreateQuestionFormComponent implements OnInit {
  public mode!: string;
  public id!: number;
  public question!: IQuestion | null;

  @ViewChild('form') form!: NgForm;
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,
    private lang: LangugeService
  ) {}

  ngOnInit(): void {
    this.lang.currentLang.subscribe((lang) => {
      this.translate.use(lang);
    });
    this.mode = String(this.router.url).split('/')[1];
    this.id = Number(String(this.router.url).split('/')[2]);
    if (this.mode === 'edit-question') {
      this.fillFormOnEditMode();
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.mode == 'edit-question') {
        this.questionService
          .upDateQuestion(this.id, form.value)
          .subscribe((data) => {
            this.router.navigate(['/question']);
            this.openSnackbarNotification(
              this.translate.instant('editedSuccessfully')
            );
          });
      } else {
        const modifyVisibility = { ...form.value, visibility: true };
        console.log(modifyVisibility);
        this.questionService
          .createQuestion(modifyVisibility)
          .subscribe((data) => {
            this.router.navigate(['/question']);
            this.openSnackbarNotification(
              this.translate.instant('addedSuccessfully')
            );
          });
      }
    }
  }

  fillFormOnEditMode() {
    this.questionService.getQuestion(this.id).subscribe((data) => {
      if (data) {
        this.form.form.patchValue(data);
      }
    });
  }

  openSnackbarNotification(message: string, action: string = 'dismess') {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
  cancelData(event: Event) {
    event.preventDefault();
    this.router.navigate(['/question']);
  }
}
