import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, LoadingController, AlertController } from 'ionic-angular';

import {UserServiceProvider} from "../../providers/index.providers";
import {HomePage} from "../index.pages";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Slides) slides: Slides;
  clave:string = "";
  constructor(public navCtrl: NavController, public userService:UserServiceProvider,
          private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ngAfterViewInit(){
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**/
  ingresar(){
    this.navCtrl.setRoot(HomePage);
  }

  /*Verifivar si la clave es valida*/
  continuar(){
    let loading =  this.loadingCtrl.create({content:"Espere por favor..."});
    loading.present();
    this.userService.checkUser(this.clave).then(valid =>{
      loading.dismiss();
      if(valid){
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);

      }else{
        this.alertCtrl.create({
          title: "Clave incorrecta!",
          subTitle:"Verifique su clave o contacte el administrador.",
          buttons:["Entiendo!"]
        }).present();
      }

    }). catch(error=>{
      loading.dismiss();
      console.error("Error en checkUser(): " + JSON.stringify(error) );
    });
  }

}
