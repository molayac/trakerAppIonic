import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { UserServiceProvider } from "../user-service/user-service";

@Injectable()
export class GeolocationProvider {
  user: FirebaseObjectObservable<any[]>;
  watch: any;
  constructor(private geolocation: Geolocation, private afDB: AngularFireDatabase,
    private userService: UserServiceProvider) {
    if(this.userService.clave)
      this.user = this.afDB.object("/users/" + this.userService.clave);

  }

  initGeolocation() {
    this.watch = this.geolocation.watchPosition()
      .subscribe((data) => {
        if(this.userService.clave){
          this.user.update({ lat: data.coords.latitude, lng: data.coords.longitude });
        }

      });
  }

  stopGeolocation() {
    this.userService.releaseStorage();
    this.watch.unsubscribe();
  }

  getDistance(lat1, lon1, lat2, lon2) {
    var rad = function(x) { return x * Math.PI / 180; }
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    console.log("Distancia Lineal: "+d.toFixed(3));
    return d.toFixed(3); //Retorna tres decimales

  }

}
