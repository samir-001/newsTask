import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
@Component({
  standalone:true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports:[
    NavbarComponent,
    TableComponent,
    RouterModule,
    CardComponent,
    FooterComponent
  ]
})
export class AppComponent {
  title = 'news';
  
}
