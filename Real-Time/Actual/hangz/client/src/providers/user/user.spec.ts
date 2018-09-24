import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { UserProvider } from './user';
import { DataProvider } from '../data/data';
import { Observable } from 'rxjs/Observable';
import { DataProviderMock } from '../../../test-config/mocks-app';
import { IonicStorageModule } from '@ionic/storage';
import 'rxjs/add/operator/map';

describe('Provider: Users', () => {
 
    let userProvider;
    let dataProvider;

    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [
 
            ],
 
            providers: [
				UserProvider,
				{ provide: DataProvider, useClass: DataProviderMock }
            ],
 
            imports: [
                IonicStorageModule.forRoot()
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(inject([UserProvider, DataProvider], (up, dp) => {
        userProvider = up;
        dataProvider = dp;
    }));

    it('should have a currentUser class member', () => {

        expect(userProvider.currentUser).toBeDefined();

    });

    it('the saveUserData function should save user data to local storage', () => {
    
        let testData = {
            username: 'test'
        };

        spyOn(userProvider.storage, 'set');

        userProvider.saveUserData(testData);

        expect(userProvider.storage.set).toHaveBeenCalledWith('hangzUserData', testData);

    });

    it('the saveUserData function should set the currentUser class member to the user data object', () => {

        let testData = {
            username: 'test'
        };

        userProvider.saveUserData(testData);

        expect<any>(userProvider.currentUser).toBe(testData);

    });

    it('the getUserData function should return data from local storage', () => {

        spyOn(userProvider.storage, 'get');

        userProvider.getUserData();

        expect(userProvider.storage.get).toHaveBeenCalledWith('hangzUserData');

    });
 
});