import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { NewsCrudService } from 'src/app/modules/news/services/news-crud.service';
import { News } from 'src/app/core/modals/news';
import { TagsCrudService } from 'src/app/modules/tag/services/tags-crud.service';
import { CategoriesCrudService } from 'src/app/modules/category/services/categories-crud.service';
import { Tag } from 'src/app/core/modals/tag';
import { category } from 'src/app/core/modals/category';
import { LangugeService } from 'src/app/shared/services/languge.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public news!:News[]
  public tags!:Tag[]
  public categories!:category[]
constructor(public newsCrud:NewsCrudService,public tagsCrud:TagsCrudService,public categoriesCrud:CategoriesCrudService,public language:LangugeService){}

  ngOnInit(): void {
    this.newsCrud.getAllnews().subscribe((news)=>{
      this.news = news
    })
    this.tagsCrud.getAlltags().subscribe((tags)=>{
      this.tags= tags
    })
    this.categoriesCrud.getAllcategories().subscribe((cats)=>{
      this.categories= cats
    })
  }
  getTags(relatedTags:number[],lang:string) :string[]{
    const tags:Tag[] = this.tags?.filter((t)=>{
      return relatedTags.includes(t.id)
    })
    if(lang =='ar'){
      const arTagName = tags.map((tag:Tag)=>{
        return tag.ArTagName
      })
      return arTagName
    }else{
      const enTagName = tags.map((tag:Tag)=>{
        return tag.EnTagName
      })  
      return enTagName

    }

  }
}
