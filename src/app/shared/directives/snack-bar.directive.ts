import { Directive, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appSnackBar]',
  standalone: true
})
export class SnackBarDirective {

  constructor(private elementRef:ElementRef,private _snackBar: MatSnackBar) { }
  
    openSnackbarNotification(message:string,action:string="dismess"){
      this._snackBar.open(message, action, { 
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right', 
      }); 
  }

}
