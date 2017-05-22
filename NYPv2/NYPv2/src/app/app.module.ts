import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { MyApp } from './app.component';

// Account pages
import { LoginPage } from '../pages/account/login/login';
import { RegisterPage } from '../pages/account/register/register';
import { ResetPasswordPage } from '../pages/account/reset-password/reset-password';
import { TermsPage } from '../pages/account/terms/terms';

// Menu pages
import { MenuOverviewPizzaPage } from '../pages/menu/menu-overview-pizza/menu-overview-pizza';

// Providers
import { CategoryProvider } from '../providers/category-provider';
import { ReceiptProvider } from '../providers/receipt-provider';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
      MyApp,
      LoginPage,
      RegisterPage,
      ResetPasswordPage,
      TermsPage,
      MenuOverviewPizzaPage
  ],
  imports: [
      IonicModule.forRoot(MyApp),
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [Http]
          }
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      LoginPage,
      RegisterPage,
      ResetPasswordPage,
      TermsPage,
      MenuOverviewPizzaPage
  ],
  providers: [ReceiptProvider, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
