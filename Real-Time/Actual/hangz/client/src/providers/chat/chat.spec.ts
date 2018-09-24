import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { ChatProvider } from './chat';
import { DataProvider } from '../data/data';
import { Observable } from 'rxjs/Observable';
import { DataProviderMock } from '../../../test-config/mocks-app';
import 'rxjs/add/operator/map';

describe('Provider: Chats', () => {
 
    let chatProvider;
    let dataProvider;

    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [
 
            ],
 
            providers: [
				ChatProvider,
				{ provide: DataProvider, useClass: DataProviderMock }
            ],
 
            imports: [

            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(inject([ChatProvider, DataProvider], (cp, dp) => {
        chatProvider = cp;
        dataProvider = dp;
    }));

    it('getChats should return a Subject', () => {

        expect(chatProvider.getChats() instanceof Observable);

    });

    it('emitChats should trigger the next method on chats subject', fakeAsync(() => {

        dataProvider.db.query = jasmine.createSpy('query').and.returnValue(Promise.resolve({
            rows: [{value: 'test'}]
        }));

        spyOn(chatProvider.chatsSubject, 'next');

        chatProvider.emitChats();

        tick();

        expect(chatProvider.chatsSubject.next).toHaveBeenCalled();

    }));

    it('addChat should call the createDoc function in data provider', () => {

        spyOn(dataProvider, 'createDoc');

        let testDoc = {
            message: 'test message',
            author: 'test',
            dateCreated: 'test date'
        };

        chatProvider.addChat(testDoc);

        expect(dataProvider.createDoc).toHaveBeenCalledWith({
            message: 'test message',
            author: 'test',
            dateCreated: 'test date',
            type: 'chat'
        });

    });
 
});