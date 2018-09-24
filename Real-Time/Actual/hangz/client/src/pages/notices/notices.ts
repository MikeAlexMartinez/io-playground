import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { NoticesProvider } from '../../providers/notices/notices';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-notices',
  templateUrl: 'notices.html',
})
export class NoticesPage {

	notices: Object[] = [];
	loading: any;

	constructor(private navCtrl: NavController, private noticesProvider: NoticesProvider, private modalCtrl: ModalController, private userProvider: UserProvider, private authProvider: AuthProvider, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {

	}

	ionViewDidLoad() {
		
		this.presentLoading();

		this.authProvider.reauthenticate().then((res) => {

			this.noticesProvider.init();
			this.loading.dismiss();

			this.noticesProvider.getNotices().subscribe((notices) => {

				this.notices = notices;

				if(this.notices.length === 0){

					this.notices.push({
						author: 'Hangz Admin',
						title: 'Welcome!',
						message: 'Looks like there aren\'t any notices yet. Click the \'+\' symbold to add one.'
					});

				}

			});

		}, (err) => {

			this.loading.dismiss();
			this.navCtrl.setRoot('LoginPage');

		});

	}

	openAddNoticePage(notice?): void {

		let modal = this.modalCtrl.create('AddNoticePage', {
			notice: notice
		});

		modal.present();

	}

	deleteNotice(notice): void {

		let confirm = this.alertCtrl.create({
			title: 'Delete this notice?',
			message: 'Deleting this notice will remove it permanently.',
			buttons: [
				{
					text: 'Delete',
					handler: () => {
						notice.deleting = true;
						setTimeout(() => {
							this.noticesProvider.deleteNotice(notice);
						}, 500);
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
		this.authProvider.logout();
	}

	presentLoading(): void {

		this.loading = this.loadingCtrl.create({
			content: 'Authenticating...'
		});

		this.loading.present();

	}

}