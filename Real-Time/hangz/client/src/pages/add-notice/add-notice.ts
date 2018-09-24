import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NoticesProvider } from '../../providers/notices/notices';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-add-notice',
  templateUrl: 'add-notice.html',
})
export class AddNoticePage {

  public title: string = '';
  public message: string = '';
  public existingNotice: any = false;
  public submitAttempt: boolean = false;

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _noticeProvider: NoticesProvider,
    private _viewCtrl: ViewController,
    private _userProvider: UserProvider
  ) { }

  ionViewDidLoad() {
    if(typeof(this._navParams.get('notice')) !== 'undefined'){
      this.existingNotice = this._navParams.get('notice');
      this.title = this.existingNotice.title;
      this.message = this.existingNotice.message;
    }
  }

  saveNotice(): void {
    if (this.title.length > 0) {
      let iso = this.getDateISOString();

      this._noticeProvider.saveNotice({
        doc: this.existingNotice,
        title: this.title,
        message: this.message,
        author: this._userProvider.currentUser.user_id,
        dateCreated: iso,
        dateUpdated: iso
      });

      this._viewCtrl.dismiss();
    }
  }

  getDateISOString(): string {
    return new Date().toISOString();
  }

  close(): void {
    this._viewCtrl.dismiss();
  }
}
