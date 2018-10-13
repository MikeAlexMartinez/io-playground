import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, LoadingController, Content, List } from 'ionic-angular';
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

  public chats: Object[] = [];
  public message: string = '';
  public loading: any;
  public mutationObserver: any;

  constructor(
    private _navCtrl: NavController,
    private _chatProvider: ChatProvider,
    private _userProvider: UserProvider,
    private _authProvider: AuthProvider,
    private _loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    this.presentLoading();

    this._authProvider.reauthenticate().then((res) => {
      this.loading.dismiss();

      this._chatProvider.init();
      this._chatProvider.getChats().subscribe((chats) => {
        this.chats = chats;
        if(this.chats.length === 0) {
          this.chats.push({
            author: 'Hangz Admin',
            message: 'Looks like nobody is around. Type a message below to start chatting!',
          });
        }
      });

    }, (err) => {
      this.loading.dismiss();
      this._navCtrl.setRoot('LoginPage');
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
    if (this.message.length > 0) {
      let iso = this.getDateIsoString();
      this._chatProvider.addChat({
        message: this.message,
        author: this._userProvider.currentUser.user_id,
        dateCreated: iso
      });
      this.message = '';
    }
  }

  getDateIsoString(): string {
    return new Date().toISOString();
  }

  logout(): void {
    this._authProvider.logout();
  }

  presentLoading(): void {
    this.loading = this._loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }
}
