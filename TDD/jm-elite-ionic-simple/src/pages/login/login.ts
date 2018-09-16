import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public licenseKey: string = '';
  public loading: any;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
  ) { }

  ionViewDidLoad() {
    this.authProvider.reauthenticate().then((res) => {
      this.navCtrl.setRoot('HomePage');
    }, (err) => {
      console.log('Maybe next time!');
    });
  }

  public login() {
    this.presentLoading();

    this.authProvider.checkKey(this.licenseKey).subscribe(
      (res) => {
        if (res) {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot('HomePage');
          });
        }
      },
      (err) => {
        this.loading.dismiss();
        console.log(err);
      }
    );

  }

  public presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Authenticating..."
    });

    this.loading.present();
  }
}
