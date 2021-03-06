import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CreateBoardPage } from '../pages/create-board/create-board';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CreateBoardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDVW6LSgynAbnYKwBql_oHPmEFrardyyAM'}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreateBoardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    NativePageTransitions,
    MediaCapture,
    Media,
    File
  ]
})
export class AppModule {}
