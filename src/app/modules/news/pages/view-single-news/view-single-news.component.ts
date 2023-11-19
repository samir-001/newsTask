import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangugeService } from 'src/app/shared/services/languge.service';
import { News } from 'src/app/core/modals/news';
import { NewsCrudService } from '../../services/news-crud.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesCrudService } from 'src/app/modules/category/services/categories-crud.service';
import { TagsCrudService } from 'src/app/modules/tag/services/tags-crud.service';
import { Tag } from 'src/app/core/modals/tag';
import { category } from 'src/app/core/modals/category';

@Component({
  selector: 'app-view-single-news',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './view-single-news.component.html',
  styleUrls: ['./view-single-news.component.scss']
})
export class ViewSingleNewsComponent implements OnInit {
  public news!:News 
  public id!:number
  public tags!:Tag[]
  public category!:category
  constructor(
    public translate:TranslateService,
    public language:LangugeService,
    public newsCrud:NewsCrudService,
    private route:ActivatedRoute,
    private categoryCrud:CategoriesCrudService,
    private tagCrud:TagsCrudService
    ){}
  ngOnInit(): void {
    this.setId()
    this.setNews()
   
    this.language.currentLang.subscribe((lang)=>{
      console.log(lang)
      this.translate.use(lang)
    })
  }
setId(){
 this.id =  this.route.snapshot.params['id']
}
setNews(){
  this.newsCrud.getNews(this.id).subscribe((news)=>{
    this.news = news
    this.setCategory()
    this.setTags()
  })
}
setCategory(){
  this.categoryCrud.getCategory(this.news.Cid).subscribe((cat)=>{
    this.category = cat
  })
}
setTags(){
 this.tagCrud.getAlltags().subscribe((tags)=>{
  this.tags = tags.filter((item)=>{
    return this.news.Tid.includes(item.id)
  })  
 })
}
}
