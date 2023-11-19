import { Route} from '@angular/router';
import { CategoriesAdminComponent } from 'src/app/modules/category/pages/categories-admin/categories-admin.component';
import { CategoriesFormComponent } from 'src/app/modules/category/pages/categories-form/categories-form.component';
import { HomeComponent } from 'src/app/modules/home/pages/home/home.component';
import { NewsAdminComponent } from 'src/app/modules/news/pages/news-admin/news-admin.component';
import { NewsFormComponent } from 'src/app/modules/news/pages/news-form/news-form.component';
import { TagsAdminComponent } from 'src/app/modules/tag/pages/tags-admin/tags-admin.component';
import { TagsFormComponent } from 'src/app/modules/tag/pages/tags-form/tags-form.component';
import {CreateQuestionFormComponent} from './modules/faq/pages/create-question-form/create-question-form.component'
import {AdminComponent} from './modules/faq/pages/admin/admin.component'
import {WebsiteComponent} from './modules/faq/pages/website/website.component'
import { ViewSingleNewsComponent } from './modules/news/pages/view-single-news/view-single-news.component';
export const APP_ROUTE: Route[] = [

  { path:'question',component:AdminComponent,pathMatch:'full'},
  { path:'add-question',component:CreateQuestionFormComponent,pathMatch:'full'},
  { path:'edit-question/:id',component:CreateQuestionFormComponent,pathMatch:'full'},
  { path:'question-view',component:WebsiteComponent,pathMatch:'full'},
  { path:'category',component:CategoriesAdminComponent,pathMatch:'full'},
  { path:'add-category',component:CategoriesFormComponent,pathMatch:'full'},
  { path:'edit-category/:id',component:CategoriesFormComponent,pathMatch:'full'},
  { path:'tag',component:TagsAdminComponent,pathMatch:'full'},
  { path:'add-tag',component:TagsFormComponent,pathMatch:'full'},
  { path:'edit-tag/:id',component:TagsFormComponent,pathMatch:'full'},
  { path:'news',component:NewsAdminComponent,pathMatch:'full'},
  { path:'add-news',component:NewsFormComponent,pathMatch:'full'},
  { path:'news/:id',component:ViewSingleNewsComponent,pathMatch:'full'},
  { path:'edit-news/:id',component:NewsFormComponent,pathMatch:'full'},
  { path:'home',component:HomeComponent,pathMatch:'full'},
  { path:'',redirectTo:'/home',pathMatch:'full'},
  { path:'**',redirectTo:'/home',pathMatch:'full'},
];
