import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage, LoginPage } from '../pages/index.pages';
//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from "../config/firebase.config";

//Services | providers
import { UserServiceProvider, GeolocationProvider } from "../providers/index.providers";
//Plugins
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDK2Lzjdo-gh3zUMKAxirpux1yIr42nIlQ'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    GeolocationProvider
  ]
})
export class AppModule {}
