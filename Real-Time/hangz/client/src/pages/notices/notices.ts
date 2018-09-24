import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';
import { NoticesProvider } from '../../providers/notices/notices';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-notices',
  templateUrl: 'notices.html',
})
export class NoticesPage {

  public notices: Object[] = [];
  public loading: any;

  constructor(
    private _navCtrl: NavController,
    private _alertCtrl: AlertController,
    private _modalCtrl: ModalController,
    private _noticesProvider: NoticesProvider,
    private _userProvider: UserProvider,
    private _authProvider: AuthProvider,
    

  ) {
    // Just some test notices for now
    this.notices = [
      {title: 'hello', message: 'this is a message', author: 'test'},
      {title: 'hello', message: 'this is a message', author: 'test'}
    ];
  }

  ionViewDidLoad() {
    this._noticesProvider.init();

    this._noticesProvider.getNotices().subscribe(notices => {
      this.notices = notices;

      if (this.notices.length === 0) {
        this.notices.push({
          author: 'Hanqz Admin',
          title: 'Welcome!',
          message: 'Looks like there aren\'t any notices yet. Click the \'+\' symbol to add one.'
        });
      }
    });
  }

  openAddNoticePage(notice?): void {
    let modal = this._modalCtrl.create('AddNoticePage', {
      notice: notice
    });
    modal.present();
  }

  deleteNotice(notice): void {
    let confirm = this._alertCtrl.create({
      title: 'Delete this notice?',
      message: 'Deleting this notice will remove it permanently.',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this._noticesProvider.deleteNotice(notice);
          }
        },
        {
          text: 'Keep it'
        }
      ]
    });
    confirm.present();
  }

  logout(): void {
    this._authProvider.logout();
  }
}
