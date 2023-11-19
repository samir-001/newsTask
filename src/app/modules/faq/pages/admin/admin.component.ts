import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IQuestion } from '../../../../core/modals/question';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SnackBarDirective } from '../../../../shared/directives/snack-bar.directive';
import { QuestionService } from '../../services/question.service';
import { LangugeService } from 'src/app/shared/services/languge.service';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    DialogComponent,
    MatSnackBarModule,
    TranslateModule,
    SnackBarDirective,
  ],
  providers: [MatSnackBarModule],

  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'arQuestion',
    'arAnswer',
    'category',
    'control',
  ];
  dataSource!: MatTableDataSource<IQuestion>;
  public dataSetCount!: number;
  public pageSize!: number;
  public currentLang!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(SnackBarDirective) snack!: SnackBarDirective;

  constructor(
    private questionsService: QuestionService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private language: LangugeService
  ) {}
  ngAfterViewInit(): void {
    //  this.snack.openSnackbarNotification('131321')
  }

  ngOnInit(): void {
    this.language.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.questionsService.getAllQuestions().subscribe((questions) => {
      this.dataSource = new MatTableDataSource(questions);
      this.dataSetCount = questions.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteQuestion(row: IQuestion) {
    this.questionsService.deleteQuestion(row.id).subscribe(() => {
      const index = this.dataSource.data.indexOf(row);
      this.dataSource.data.splice(index, 1);
      this.dataSetCount = this.dataSource.data.length;
      this.dataSource._updateChangeSubscription();
      this.openSnackbarNotification('deleted Successfully');
    });
  }
  hideQuestion(row: IQuestion) {
    const newData = { ...row, visibility: !row.visibility };
    const newDataSource = this.dataSource.data.map((item) =>
      item.id == row.id ? newData : item
    );
    this.questionsService.upDateQuestion(row.id, newData).subscribe(() => {
      this.dataSource.data = newDataSource;
      this.openSnackbarNotification('updated Successfully');
    });
  }
  updateQuestion(row: IQuestion) {
    this.router.navigate([`edit-question/${row.id}`]);
  }
  addNew() {
    this.router.navigate(['/add-question']);
  }
  openDialog(row: IQuestion, action: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        switch (action) {
          case 'toggleVisibilty':
            this.hideQuestion(row);
            break;
          case 'delete':
            this.deleteQuestion(row);
            break;
        }
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
}
