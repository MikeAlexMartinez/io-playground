import { TestBed, inject, async, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { DataProvider } from './data';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

describe('Provider: Data Service', () => {
 
    let dataProvider;

    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [
 
            ],
 
            providers: [
                DataProvider
            ],
 
            imports: [
  
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(inject([DataProvider], (dp) => {
        dataProvider = dp;
    }));

    it('should have access to the PouchDB object', () => {

        expect(typeof(PouchDB)).not.toBe('undefined');

    });

    it('initRemoteSync should set up remote sync', () => {
        
        dataProvider.initDatabase('remote');

        spyOn(dataProvider.db, 'sync');

        dataProvider.initRemoteSync();

        expect(dataProvider.db.sync).toHaveBeenCalled();

    });

    it('after initialising, it should have a class member that is an instance of a PouchDB database', () => {

        dataProvider.initDatabase('remote');
        
        expect(dataProvider.db instanceof PouchDB);

    });

    it('after initialising, the remote class member should be set to the supplied paramater', () => {

        dataProvider.initDatabase('remote');
        expect<any>(dataProvider.remote).toBe('remote');

    });

    it('the createDoc function should make a POST request to PouchDB with the supplied doc', () => {

        dataProvider.initDatabase('remote');

        spyOn(dataProvider.db, 'post');

        let testDoc = {
            title: 'test title',
            message: 'test message'
        };

        dataProvider.createDoc(testDoc);

        expect(dataProvider.db.post).toHaveBeenCalledWith(testDoc);

    });
 
    it('the updateDoc function should make a PUT request to PouchDB with the supplied doc', () => {

        dataProvider.initDatabase('remote');

        spyOn(dataProvider.db, 'put');

        let testDoc = {
            _id: 'someid',
            _rev: 'somerev',
            title: 'test title',
            message: 'test message'
        };

        dataProvider.updateDoc(testDoc);

        expect(dataProvider.db.put).toHaveBeenCalledWith(testDoc);

    });

    it('the deleteDoc function should make a remove request to PouchDB with the supplied doc', () => {

        dataProvider.initDatabase('remote');

        spyOn(dataProvider.db, 'remove');

        let testDoc = {
            _id: 'someid',
            _rev: 'somerev',
            title: 'test title',
            message: 'test message'
        };

        dataProvider.deleteDoc(testDoc);

        expect(dataProvider.db.remove).toHaveBeenCalledWith(testDoc);

    });

});