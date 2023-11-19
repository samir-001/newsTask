import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TagsCrudService } from '../../services/tags-crud.service';
import { Tag } from 'src/app/core/modals/tag';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-tags-admin',
  standalone: true,
  imports: [CommonModule, TableComponent,MatDialogModule, DialogComponent],
  templateUrl: './tags-admin.component.html',
  styleUrls: ['./tags-admin.component.scss'],
})
export class TagsAdminComponent implements OnInit {
  public tags!: Tag[];
  constructor(private tagCrud: TagsCrudService, private router: Router,    public dialog: MatDialog    ) {}
  ngOnInit(): void {
    this.tagCrud.getAlltags().subscribe((tags) => {
      this.tags = tags;
    });
  }
  goToNew() {
    this.router.navigate(['/add-category']);
  }
  editTag(tag: Tag) {
    this.router.navigate(['edit-tag', tag.id]);
  }

  deleteTag(id: number) {
    this.tagCrud.deleteTag(id).subscribe(() => {
      this.tags = this.tags.filter((item) => {
        return item.id !== id;
      });
    });
  }
  confirmAction(row: number, action: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        switch (action) {
          case 'delete':
            this.deleteTag(row);

            break;
        }
      }
    });
  }
}
