import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DataProvider } from '../providers/data/data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(
    private _platform: Platform,
    private _statusBar: StatusBar,
    private _splashScreen: SplashScreen,
    private _zone: NgZone,
    private _dataProvider: DataProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this._platform.ready().then(() => {
      
      this._zone.runOutsideAngular(() => {
        this._dataProvider.initDatabase('http://127.0.0.1:5984/hangz');
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this._statusBar.styleDefault();
      this._splashScreen.hide();
    });
  }
}

