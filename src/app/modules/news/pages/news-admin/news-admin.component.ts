import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from 'src/app/core/modals/news';
import { NewsCrudService } from '../../services/news-crud.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-news-admin',
  standalone: true,
  imports: [CommonModule, TableComponent, MatDialogModule, DialogComponent],
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.scss'],
})
export class NewsAdminComponent {
  public news!: News[];
  constructor(
    private newsCrud: NewsCrudService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.newsCrud.getAllnews().subscribe((news) => {
      this.news = news;
    });
  }
  goToNew() {
    this.router.navigate(['/add-news']);
  }
  editNews(news: News) {
    console.log(news.id);
    this.router.navigate(['edit-news', news.id]);
  }

  deleteNews(deletedId: number) {
    this.newsCrud.deleteNews(deletedId).subscribe(() => {
      this.news = this.news.filter((news) => {
        return news.id !== deletedId;
      });
    });
  }
  confirmAction(row: number, action: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        switch (action) {
          case 'delete':
            this.deleteNews(row);

            break;
        }
      }
    });
  }
}
