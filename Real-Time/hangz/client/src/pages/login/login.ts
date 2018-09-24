import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string = '';
  public password: string = '';
  public failedAttempt: boolean = false;
  public loading: any;

  constructor(
    private navCtrl: NavController,
    private authProvider: AuthProvider,
    private dataProvider: DataProvider,
    private userProvider: UserProvider,
    private loadingCtrl: LoadingController,
    private zone: NgZone
  ) { }

  openRegisterPage(): void {
    this.navCtrl.push('RegisterPage');
  }

  login(): void {
    this.presentLoading();

    let credentials = {
      username: this.username,
      password: this.password,
    };

    this.authProvider.authenticate(credentials).subscribe((res) => {
      console.log(res);
      if (typeof(res.token) !== 'undefined') {
        this.failedAttempt = false;

        this.zone.runOutsideAngular(() => {
          this.dataProvider.initDatabase(res.userDBs.hangz);
        });

        this.userProvider.saveUserData(res);

        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot('HomePage');
        });
      }
    }, (err) => {
      this.loading.dismiss();
      this.failedAttempt = true;
      console.log(err);
    });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }
}
