import { Injectable, NgZone } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DataProvider } from '../data/data';

@Injectable()
export class NoticesProvider {

  public noticesSubject: BehaviorSubject<Object[]> = new BehaviorSubject([]);

  constructor(
    private _dataProvider: DataProvider,
    private _zone: NgZone
  ) { }

  init(): void {
    this.emitNotices();

    this._dataProvider.db.changes({
      live: true,
      since: 'now',
      include_docs: true
    }).on('change', (change) => {
      if (change.doc.type === 'notice' || change.deleted) {
        this.emitNotices();
      }
    });
  }

  getNotices(): BehaviorSubject<Object[]> {
    return this.noticesSubject;
  }

  saveNotice(notice): void {
    if (notice.doc) {
      let updatedDoc = notice.doc;

      updatedDoc.title = notice.title;
      updatedDoc.message = notice.message;
      updatedDoc.dateUpdated = notice.dateUpdated;

      this._dataProvider.updateDoc(updatedDoc);
    } else {
      this._dataProvider.createDoc({
        title: notice.title,
        message: notice.message,
        author: notice.author,
        dateCreated: notice.dateCreated,
        dateUpdated: notice.dateUpdated,
        type: 'notice'
      });
    }
  }

  deleteNotice(notice): void {
    this._dataProvider.deleteDoc(notice);
  }

  emitNotices(): void {
    this._zone.run(() => {

      let options = {
        include_docs: true,
        descending: true
      };

      this._dataProvider.db.query('notices/by_date_updated', options).then((data) => {
        let notices = data.rows.map(row => row.doc);
        this.noticesSubject.next(notices);
      }).catch((err) => {
        console.log(err);
      });

    });
  }

}
