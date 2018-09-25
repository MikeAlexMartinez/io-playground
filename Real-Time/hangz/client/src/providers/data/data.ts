import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class DataProvider {

  public db: PouchDB = null;
  public remote: string;

  constructor() { }

  initDatabase(remote): void {
    this.db = new PouchDB('hangz', {
      auto_compaction: true
    });

    this.remote = remote;

    this.initRemoteSync();
  }

  initRemoteSync(): void {
    let options = {
      live: true,
      retry: true
    };
    this.db.sync(this.remote, options);
  }

  createDoc(doc): Promise<any> {
    return this.db.post(doc);
  }

  updateDoc(doc): Promise<any> {
    return this.db.put(doc);
  }

  deleteDoc(doc): Promise<any> {
    return this.db.remove(doc);
  }

}
