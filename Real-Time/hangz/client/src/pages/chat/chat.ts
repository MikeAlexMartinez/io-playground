import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  public chats: Object[] = [];
  public message: string = '';
  public loading: any;


  constructor(
    private _navCtrl: NavController,
    private _chatProvider: ChatProvider,
    private _userProvider: UserProvider,
    private _authProvider: AuthProvider,
    private _loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
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
}
