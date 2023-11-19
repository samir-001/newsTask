import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {
  MatPaginator,
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

import { TranslateService } from '@ngx-translate/core';
import { QuestionService } from '../../services/question.service';
import { LangugeService } from 'src/app/shared/services/languge.service';
import { IQuestion } from 'src/app/core/modals/question';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [
    CommonModule,
    CdkAccordionModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css'],
})
export class WebsiteComponent implements OnInit {
  dataSource!: MatTableDataSource<IQuestion>;
  public dataSetCount!: number;
  public pageSize!: number;
  public ErrorMessage!: string | null;
  public dataLength!: number;
  public arCategory!: string[];
  public enCategory!: string[];
  public fontsize!: number;
  //for connecting accordion with paginator
  public obs!: Observable<any>;
  public language!: string;
  public allQuestions!: IQuestion[];
  public la: string = this.Translate.instant('home');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private questionsService: QuestionService,
    public lang: LangugeService,
    public Translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.questionsService.getAllQuestions().subscribe(this.handleHttpObs);
    this.lang.currentLang.subscribe((lang) => {
      this.language = lang;
      this.fontsize = 16;
    });
  }
  private handleHttpObs = {
    next: (question: IQuestion[]) => {
      const filteredQuetions = question.filter((item) => {
        return item.visibility;
      });
      if (filteredQuetions.length < 1) {
        this.ErrorMessage = 'no data found';
      } else {
        this.pageSize = 5;
        this.dataLength = filteredQuetions.length;
        this.ErrorMessage = null;
        this.arCategory = filteredQuetions.map((item) => item.arCategory);
        this.enCategory = filteredQuetions.map((item) => item.enCategory);
        this.allQuestions = filteredQuetions;
      }
      this.dataSource = new MatTableDataSource(filteredQuetions);
      this.dataSource.paginator = this.paginator;
      this.dataSetCount = question.length;

      //connect paginator to accordion
      this.obs = this.dataSource.connect();
    },
    error: (err: any) => {},
  };
  filterData(cat: string = 'all') {
    this.dataSource.data = this.allQuestions.filter((item) => {
      if (cat === 'all') {
        return true;
      }
      if (this.language == 'en') {
        return item.enCategory == cat;
      } else {
        return item.arCategory == cat;
      }
    });
  }
  increaseFontSize() {
    this.fontsize = this.fontsize + 2;
  }
  decreaseFontSize() {
    if (this.fontsize > 16) {
      this.fontsize = this.fontsize - 2;
    }
  }
  resetFontsize() {
    this.fontsize = 16;
  }
}
