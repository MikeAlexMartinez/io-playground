import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  constructor(
    public http: Http,
    public storage: Storage,
    public appCtrl: App
  ) {
    console.log('Hello AuthProvider Provider');
  }

  checkKey(key) {

    this.storage.set('eliteLicenseKey', key);

    let body = {
      key: key
    };

    return this.http.post('http://localhost:8080/api/check', body).map(res => {
      return res.json();
    });

  }

  reauthenticate() {

    return new Promise((resolve, reject) => {
      this.storage.get('eliteLicenseKey').then((key) => {
        if (key !== null) {
          this.checkKey(key).subscribe((res) => {
            if (res) {
              resolve(true);
            } else {
              reject(true);
            }
          });
        } else {
          reject(true);
        }
      })
    });
  }

  logout() {
    this.storage.set('eliteLicenseKey', null).then(() => {
      this.appCtrl.getRootNav().setRoot('LoginPage');
    })
  }

}
