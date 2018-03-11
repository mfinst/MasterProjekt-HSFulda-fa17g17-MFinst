import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ResthandlerProvider } from '../providers/resthandler/resthandler';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { WriteModalPage } from '../pages/write-modal/write-modal';
import { RESTHttpInterceptor } from './rest.intercepter';
import { AccountFormularPage } from '../pages/account-formular/account-formular';
import { AgencyFormularPage } from '../pages/agency-formular/agency-formular';
import { ContactFormularPage } from '../pages/contact-formular/contact-formular';
import { OffersPage } from '../pages/offers/offers';
import { FavoritsPage } from '../pages/favorits/favorits';
import { SearchFilterPage } from '../pages/search-filter/search-filter';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WriteModalPage,
    AccountFormularPage,
    AgencyFormularPage,
    ContactFormularPage,
    OffersPage,
    FavoritsPage,
    SearchFilterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WriteModalPage,
    AccountFormularPage,
    AgencyFormularPage,
    ContactFormularPage,
    OffersPage,
    FavoritsPage,
    SearchFilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ResthandlerProvider,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RESTHttpInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
