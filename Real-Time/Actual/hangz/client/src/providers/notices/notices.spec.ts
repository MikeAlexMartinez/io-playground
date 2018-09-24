import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { NoticesProvider } from './notices';
import { DataProvider } from '../data/data';
import { Observable } from 'rxjs/Observable';
import { DataProviderMock } from '../../../test-config/mocks-app';
import 'rxjs/add/operator/map';

describe('Provider: Notices', () => {
 
    let noticesProvider;
    let dataProvider;

    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [
 
            ],
 
            providers: [
				NoticesProvider,
				{ provide: DataProvider, useClass: DataProviderMock }
            ],
 
            imports: [

            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(inject([NoticesProvider, DataProvider], (np, dp) => {
        noticesProvider = np;
        dataProvider = dp;
    }));

    it('getNotices should return a Subject', () => {

        expect(noticesProvider.getNotices() instanceof Observable);

    });

    it('emitNotices should trigger the next method on notices subject', fakeAsync(() => {

        dataProvider.db.query = jasmine.createSpy('query').and.returnValue(Promise.resolve({
            rows: [{value: 'test'}]
        }));

        spyOn(noticesProvider.noticesSubject, 'next');

        noticesProvider.emitNotices();

        tick();

        expect(noticesProvider.noticesSubject.next).toHaveBeenCalled();

    }));

    it('saveNotice should call the createDoc function in data provider if document does not already exist', () => {

        spyOn(dataProvider, 'createDoc');

        let testDoc = {
            doc: false,
            title: 'test title',
            message: 'test message',
            author: 'username',
            dateCreated: 'test date',
            dateUpdated: 'test date'
        };

        noticesProvider.saveNotice(testDoc);

        expect(dataProvider.createDoc).toHaveBeenCalledWith({
            title: 'test title',
            message: 'test message',
            author: 'username',
            dateCreated: 'test date',
            dateUpdated: 'test date',
            type: 'notice'
        });

    });

    it('for existing docs, saveNotice should update the doc with new values before calling updateDoc function', () => {

        spyOn(dataProvider, 'updateDoc');

        let testDoc = {
            doc: {
                _id: 'someid',
                _rev: 'somerev',
                title: 'oldtitle',
                message: 'oldmessage',
                author: 'oldusername',
                dateCreated: 'olddate',
                dateUpdated: 'olddate',
                type: 'notice'
            },
            title: 'new title',
            message: 'new message',
            dateUpdated: 'new date'
        };

        noticesProvider.saveNotice(testDoc);

        expect(dataProvider.updateDoc).toHaveBeenCalledWith({
            _id: 'someid',
            _rev: 'somerev',
            title: 'new title',
            message: 'new message',
            author: 'oldusername',
            dateCreated: 'olddate',
            dateUpdated: 'new date',
            type: 'notice'
        });

    });

    it('deleteNotice should pass its parameters to the deleteDoc function in the data provider', () => {

        spyOn(dataProvider, 'deleteDoc');

        let testNotice = {
          _id: "someid",
          _rev: "somerev",
          title: "sometitle",
          message: "somemessage"
        };

        noticesProvider.deleteNotice(testNotice);

        expect(dataProvider.deleteDoc).toHaveBeenCalledWith(testNotice);

    });
 
});