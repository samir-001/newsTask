import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangugeService } from '../../services/languge.service';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatButtonModule,TranslateModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],

})
export class DialogComponent implements OnInit {
constructor(public translate:TranslateService,private language:LangugeService){

}
  ngOnInit(): void {
    this.language.currentLang.subscribe((lang)=>{
      this.translate.use(lang)
    })
    }

}
