import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AcademyProvider} from 'my-module-aahh';
import { Geolocation } from "@ionic-native/geolocation";
//import { MapsProvider } from '../providers/maps/maps';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,

    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AcademyProvider,Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //MapsProvider
  ]
})
export class AppModule {}
