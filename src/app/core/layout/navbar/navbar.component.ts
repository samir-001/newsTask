import { Component ,OnInit } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ColorThemingService } from 'src/app/shared/services/color-theming.service';
import { LangugeService } from 'src/app/shared/services/languge.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {

constructor(
  private Translate :TranslateService,
  public theme:ColorThemingService,
  public Language:LangugeService
  ){}

  ngOnInit(): void 
  {
    this.Translate.setDefaultLang
    this.Language.currentLang.subscribe( lang=>{ 
      this.Translate.setDefaultLang(lang)
      this.Translate.use(lang)
    })
  }



}
