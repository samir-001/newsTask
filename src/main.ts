import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_ROUTE } from './app/Routes';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent,{
  providers:[
    provideAnimations(),
    provideRouter(APP_ROUTE),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
)]
})