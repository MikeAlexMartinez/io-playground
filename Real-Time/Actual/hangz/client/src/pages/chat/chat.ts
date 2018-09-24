import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, Content, List, LoadingController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

	@ViewChild(Content) contentArea: Content;
	@ViewChild(List, {read: ElementRef}) chatList: ElementRef;

	chats: Object[] = [];
	message: string = '';
	loading: any;
	mutationObserver: any;

	constructor(private navCtrl: NavController, private chatProvider: ChatProvider, private userProvider: UserProvider, private authProvider: AuthProvider, private loadingCtrl: LoadingController) {

	}

	ionViewDidLoad() {
		
		this.presentLoading();

		this.authProvider.reauthenticate().then((res) => {

			this.loading.dismiss();

			this.chatProvider.init();

			this.chatProvider.getChats().subscribe((chats) => {

				this.chats = chats;

				if(this.chats.length === 0){

					this.chats.push({
						author: 'Hangz Admin',
						message: 'Looks like nobody is around. Type a message below to start chatting!'
					});

				}

			});

		}, (err) => {
			
			this.loading.dismiss();
			this.navCtrl.setRoot('LoginPage');

		});

		this.mutationObserver = new MutationObserver((mutations) => {
			this.newChatAdded();
		});

		this.mutationObserver.observe(this.chatList.nativeElement, {
			childList: true
		});

	}

	newChatAdded(): void {
		this.contentArea.scrollToBottom();
	}

	addChat(): void {

		if(this.message.length > 0){

			let iso = this.getDateISOString();

			this.chatProvider.addChat({
				message: this.message,
				author: this.userProvider.currentUser.user_id,
				dateCreated: iso
			});

			this.message = '';

		}

	}

	getDateISOString(): string {
		return new Date().toISOString();
	}	

	presentLoading(): void {

		this.loading = this.loadingCtrl.create({
			content: 'Authenticating...'
		});

		this.loading.present();

	}

	logout(): void {
		this.authProvider.logout();
	}

}