import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorThemingService {
  
  constructor( @Inject(DOCUMENT) private document :Document){}

  //tailwind configration toggle class dark 
  toggleDark()
  {
    this.document.getElementsByTagName('html')[0].classList.toggle('dark')
  }
}
