import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { category } from 'src/app/core/modals/category';
import { CategoriesCrudService } from '../../services/categories-crud.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  public category!: FormGroup;
  public mode!: string;
  private id: any = null;
  constructor(
    private categoryCrud: CategoriesCrudService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getMode();
    console.log(this.router.getCurrentNavigation()?.extras);
    // .subscribe((navigation) => {
    //   const user = navigation.extras.state.user;

    // });
    this.category = new FormGroup({
      id: new FormControl(null),
      ArCategoryName: new FormControl(null, Validators.required),
      EnCategoryName: new FormControl(null, Validators.required),
      EnCategoryDescription: new FormControl(null, Validators.required),
      ArCategoryDescription: new FormControl(null, Validators.required),
      hasChildren: new FormControl(null, Validators.required),
    });

    if (this.mode === 'edit-category') {
      this.getIdFromUrl();
      this.fillForm(this.id);
    }
  }
  onSubmit() {
    if (this.category.valid) {
      switch (this.mode) {
        case 'add-category':
          this.categoryCrud
            .createCategory(this.category.value)
            .subscribe(() => {
              this.openSnackbarNotification('added succesfully');
              this.router.navigate(['/category']);
            });
          break;
        case 'edit-category':
          if (this.id) {
            this.categoryCrud
              .upDateCategory(this.id, this.category.value)
              .subscribe(() => {
                this.openSnackbarNotification('edited succesfully');

                this.router.navigate(['/category']);
              });
          }
      }
    }
  }
  //handle edit mode
  getMode() {
    this.mode = this.route.snapshot.url[0].path;
  }
  getIdFromUrl() {
    this.id = this.route.snapshot.params['id'];
  }

  fillForm(id: number) {
    if (this.id) {
      this.categoryCrud
        .getCategory(id)
        .subscribe((cat: category | null) =>
          cat ? this.category.patchValue(cat) : null
        );
    }
  }
  openSnackbarNotification(message: string, action: string = 'dismess') {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
