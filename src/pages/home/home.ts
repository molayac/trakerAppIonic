import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeolocationProvider } from "../../providers/index.providers";
import { LoginPage } from "../../pages/index.pages";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user:any = {};
  zoom:number = 16;
  constructor(private geoService: GeolocationProvider, public navCtrl: NavController) {
    console.log("HOME.ts");
    this.geoService.initGeolocation();

    this.geoService.user.subscribe(data=>{
      this.user = data;
      console.log(data);
      this.geoService.getDistance(parseFloat(data["lat"]),parseFloat(data["long"]),parseFloat("6.2311522"),parseFloat("-75.603972"));
    });
  }

  logout(){
    this.geoService.stopGeolocation();
    this.navCtrl.setRoot(LoginPage);
  }

}
