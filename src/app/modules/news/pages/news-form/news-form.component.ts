import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Validators,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { NewsCrudService } from '../../services/news-crud.service';
import { CategoriesCrudService } from 'src/app/modules/category/services/categories-crud.service';
import { TagsCrudService } from 'src/app/modules/tag/services/tags-crud.service';
import { Tag } from 'src/app/core/modals/tag';
import { category } from 'src/app/core/modals/category';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/core/modals/news';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-news-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss'],
})
export class NewsFormComponent implements OnInit {
  public news!: FormGroup;
  public tags!: Tag[];
  public avilableTag!: Tag[];
  public categories!: category[];
  private mode!: string;
  private id!: number;

  constructor(
    private newsCrud: NewsCrudService,
    private categoryCrud: CategoriesCrudService,
    private tagCrud: TagsCrudService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMode();
    this.setTheForm();

    this.tagCrud.getAlltags().subscribe((tags) => {
      this.tags = tags;

      if (this.mode == 'add-news') {
        this.avilableTag = tags;
      }
    });

    this.categoryCrud.getAllcategories().subscribe((cats) => {
      this.categories = cats;
    });

    if (this.mode === 'edit-news') {
      this.getIdFromUrl();
      this.fillForm();
    }
  }

  setTheForm() {
    this.news = new FormGroup({
      id: new FormControl(null),
      ArNewsTitle: new FormControl(null, Validators.required),
      EnNewsTitle: new FormControl(null, Validators.required),
      ArNewsDescription: new FormControl(null, Validators.required),
      EnNewsDescription: new FormControl(null, Validators.required),
      PublishDate: new FormControl(null),
      LastModification: new FormControl(null),
      Tid: new FormControl([]),
      Cid: new FormControl(null, Validators.required),
      ImageUrl: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    {
      if (this.news.valid) {
        switch (this.mode) {
          case 'add-news':
            this.news.patchValue({
              LastModification: this.getcurrentDate(),
              PublishDate: this.getcurrentDate(),
            });
            this.newsCrud.createNews(this.news.value).subscribe(() => {
              this.openSnackbarNotification('added succesfully');
              this.router.navigate(['/news']);
            });
            break;
          case 'edit-news':
            this.news.patchValue({
              LastModification: this.getcurrentDate(),
            });
            if (this.id) {
              this.newsCrud
                .upDateNews(this.id, this.news.value)
                .subscribe(() => {
                  this.openSnackbarNotification('edited succesfully');
                  this.router.navigate(['/news']);
                });
            }
        }
      }
    }
  }
  getMode() {
    this.mode = this.route.snapshot.url[0].path;
  }
  getIdFromUrl() {
    this.id = this.route.snapshot.params['id'];
  }
  fillForm() {
    this.newsCrud.getNews(this.id).subscribe((news: News) => {
      this.news.patchValue(news);
      console.log(this.news.value);
      this.avilableTag = this.tags.filter((tag) => {
        return !news['Tid'].includes(tag.id);
      });
    });
  }

  //*********************************** handle form inputs **********************************//
  onFileSelected(event: any) {
    this.news.patchValue({
      ImageUrl: event.target.files[0].name,
    });
  }
  getTag(id: number) {
    const data = this.tags.filter((element) => {
      return element.id == id;
    });
    return data[0];
  }

  addTage(id: number) {
    //add tag id to Tid form value
    this.news.controls['Tid'].value.push(id);

    //remove tag from avliable to select tag
    this.avilableTag = this.avilableTag.filter((tag) => {
      return tag.id !== id;
    });
  }

  removeTage(removedItem: number) {
    //get all selected tag and filtering removed one
    const updatedValue = this.news.controls['Tid']?.value.filter(
      (id: number) => removedItem !== id
    );

    //update the form after removeing tag
    this.news.get('Tid')?.setValue(updatedValue);

    //add tage again to availabe tags
    this.avilableTag.push(this.getTag(removedItem));
  }
  getcurrentDate() {
    return (
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }) +
      '-' +
      new Date().toLocaleTimeString()
    );
  }

  openSnackbarNotification(message: string, action: string = 'dismess') {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
