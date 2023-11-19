import { Injectable } from '@angular/core';
import {BehaviorSubject,Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class LangugeService {
  public currentLang= new BehaviorSubject('en')
  public language:string = 'en'
  constructor() { }
  
  changeLanguage()
  {
    this.language = this.language =="en"?"ar":"en"
    this.currentLang.next(this.language)
  } 

}
