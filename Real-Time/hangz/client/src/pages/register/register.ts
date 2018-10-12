import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { DataProvider } from '../../providers/data/data';
import { UsernameValidator } from '../../validators/username';
import { EmailValidator } from '../../validators/email';

@IonicPage({
  defaultHistory: ['LoginPage']
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public registerForm: any;
  public loading: any;

  constructor(
    public navCtrl: NavController,
    private _fb: FormBuilder,
    private _authProvider: AuthProvider,
    private _userProvider: UserProvider,
    private _dataProvider: DataProvider,
    private _loadingCtrl: LoadingController,
    private _usernameValidator: UsernameValidator,
    private _emailValidator: EmailValidator
  ) {
    this.registerForm = this._fb.group({
      username: ['', Validators.compose([Validators.maxLength(16), Validators.pattern('[a-zA-Z0-9]*'), Validators.required]), this._usernameValidator.checkUsername.bind(this._usernameValidator)],
      email: ['', Validators.compose([Validators.maxLength(30), Validators.required]), this._emailValidator.checkEmail.bind(this._emailValidator)],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
    }, {
      validators: this.confirmPassword,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createAccount(): void {
    if (this.registerForm.valid) {
      this.presentLoading();
      this._authProvider.register(this.registerForm.value).subscribe((res) => {
        if (typeof(res.token) !== 'undefined') {
          this._dataProvider.initDatabase(res.userDBs.hangz);
          this._userProvider.saveUserData(res);

          this.navCtrl.setRoot('HomePage');
        }
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
      })
    }
  }

  confirmPassword(form) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    let validation = {};

    if((password.touched || confirmPassword.touched) && password.value !== confirmPassword.value) {
      validation = {
        passwordMismatch: true
      };
    }

    return validation;
  }

  presentLoading(): void {
    this.loading = this._loadingCtrl.create({
      content: 'Creating Account...'
    });
    this.loading.present();
  }
}
