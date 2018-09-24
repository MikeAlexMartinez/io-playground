import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataProvider } from '../data/data';

@Injectable()
export class ChatProvider {

  public chatsSubject: BehaviorSubject<Object[]> = new BehaviorSubject([]);

  constructor(
    public dataProvider: DataProvider,
    public zone: NgZone
  ) { }

  init(): void {

  }

  getChats(): BehaviorSubject<Object[]> {
    return this.chatsSubject;
  }

  addChat(message): void {
    this.dataProvider.createDoc({
      message: message.message,
      author: message.author,
      dateCreated: message.dateCreated,
      type: 'chat'
    });
  }

  emitChats(): void {
    this.zone.run(() => {

      let options = {
        include_docs: true,
        descending: true
      };

      this.dataProvider.db.query('chats.by_date_created', options).then(data => {
        let chats = data.rows.map(row => row.doc);
        
        chats.reverse();
  
        this.chatsSubject.next(chats);
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}
