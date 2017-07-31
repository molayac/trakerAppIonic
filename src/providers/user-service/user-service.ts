import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserServiceProvider {
  clave: string = null;
  constructor(private afDB: AngularFireDatabase,
    private storage: Storage,
    private platform: Platform) {

  }

  checkUser(pwd: string) {
    pwd = pwd.toUpperCase();
    let promise = new Promise((resolve, reject) => {
      console.log("Before check data");

      this.afDB.list("/users/" + pwd).subscribe(data => {
        // Valida si retorna información, si no regresamos false.
        if (data.length === 0)
          resolve(false);
        else {
          this.clave = pwd;
          this.savestorage();
          resolve(true);
        }

      });

    }).catch(error=>{
      console.error("Error en Servicio, checkUser(): "+JSON.stringify(error));
    });
    return promise;
  }

  savestorage(){
    let promise= new Promise((resolve, reject)=>{
      if(!this.platform.is("cordova")){
          if(this.clave)
            localStorage.setItem("clave", this.clave);
          else{
            localStorage.removeItem("clave");
          }
          resolve();
        }else{
        this.storage.set('clave', this.clave);
        resolve();

      }

    });
    return promise;
  }

  releaseStorage(){
    this.clave = null;
    this.savestorage();
  }

  loadStorage(){
    let promise = new Promise((resolve, reject)=>{
      if(!this.platform.is("cordova")){
        this.clave = localStorage.getItem("clave");
        resolve();
      }else{
        this.storage.ready().then(()=>{
          this.storage.get("clave").then(data=>{
            this.clave = data;
            resolve();
          }).catch(error=>{
            console.error("Error leyendo storage");
          });
        }).catch(error=>{
          console.error("Error promesa loadStorage()");
        });

      }

    });
    return promise;
  }

}
