import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Pages
import { HomePage, LoginPage } from '../pages/index.pages';
import {UserServiceProvider} from "../providers/index.providers";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private userService:UserServiceProvider) {
    platform.ready().then(() => {
      this.userService.loadStorage().then(()=>{
        if(this.userService.clave){
          this.rootPage = HomePage;
        }
        else{
          this.rootPage = LoginPage;
        }
        statusBar.styleDefault();
        splashScreen.hide();
      }).catch();
      //this.rootPage = LoginPage;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });
  }
}
