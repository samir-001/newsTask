import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { category } from 'src/app/core/modals/category';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CategoriesCrudService } from '../../services/categories-crud.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-categories-admin',
  standalone: true,
  imports: [CommonModule,TableComponent,MatDialogModule, DialogComponent],
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.scss']
})
export class CategoriesAdminComponent {
  public categories!:category[]
  constructor(private categoryCrud :CategoriesCrudService,private router:Router,public dialog: MatDialog){}
  ngOnInit(): void
  {
    this.categoryCrud.getAllcategories().subscribe((categories)=>{
      this.categories =categories
    })
  }

  goToNew(){
    this.router.navigate(['/add-category'])
  }
  editCategory(category:category)
  {
    this.router.navigate(['edit-category',category.id],{queryParams:category})
  }
  
  deleteCategory(id:number)
  {
    this.categoryCrud.deleteCategory(id).subscribe()
   this.categories =  this.categories.filter((item)=>{
      return item.id !== id
    })
  }
  confirmAction(row: number, action: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        switch (action) {
          case 'delete':
            this.deleteCategory(row);

            break;
        }
      }
    });
  }
}
