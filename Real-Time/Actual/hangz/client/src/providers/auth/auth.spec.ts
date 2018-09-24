import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { AuthProvider } from './auth';
import { DataProvider } from '../data/data';
import { UserProvider } from '../user/user';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';
import { DataProviderMock, UserProviderMock } from '../../../test-config/mocks-app';
import { AppMock } from '../../../test-config/mocks-ionic';
import { Http, Headers, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SERVER_ADDRESS } from '../../config/constants';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

describe('Provider: Auth', () => {
 
    let authProvider;
    let dataProvider;
    let userProvider;
    let mockBackend;
    let httpProvider;
    let appCtrl;

    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [
 
            ],
 
            providers: [
				AuthProvider,
				{ provide: DataProvider, useClass: DataProviderMock },
                { provide: UserProvider, useClass: UserProviderMock },
                { provide: App, useClass: AppMock },
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http, 
                    useFactory: (mockBackend, options) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ],
 
            imports: [
                HttpModule
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(inject([AuthProvider, DataProvider, UserProvider, App, MockBackend, Http], (ap, dp, up, app, mb, http) => {
        authProvider = ap;
        dataProvider = dp;
        userProvider = up;
        mockBackend = mb;
        httpProvider = http;
        appCtrl = app;
    }));

    it('authenticate() should return an observable containing data from the backend', () => {

        let mockResponse = '"test"';

        mockBackend.connections.subscribe((connection) => {
 
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
 
        });

        let testDetails = {
            username: 'test',
            password: 'test'
        };

        let responseFromServer;

        authProvider.authenticate(testDetails).subscribe(res => {
            responseFromServer = res;
        });

        expect(responseFromServer).toBe('test');   

    });

    it('register() should return an observable containing data from the backend', () => {

        let mockResponse = '"test"';

        mockBackend.connections.subscribe((connection) => {
 
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
 
        });

        let testDetails = {
            username: 'testing',
            email: 'test@test.com',
            password: 'password',
            confirmPassword: 'password'
        };

        let responseFromServer;

        authProvider.register(testDetails).subscribe(res => {
            responseFromServer = res;
        });

        expect(responseFromServer).toBe('test');   

    });

    it('validate username should return an observable containing data from the backend', () => {

        let mockResponse = '"test"';

        mockBackend.connections.subscribe((connection) => {
 
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
 
        });

        let username = 'test';

        let responseFromServer;

        authProvider.validateUsername(username).subscribe(res => {
            responseFromServer = res;
        });

        expect(responseFromServer).toBe('test');   

    });

    it('validate email should return an observable containing data from the backend', () => {

        let mockResponse = '"test"';

        mockBackend.connections.subscribe((connection) => {
 
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
 
        });

        let email = 'test';

        let responseFromServer;

        authProvider.validateEmail(email).subscribe(res => {
            responseFromServer = res;
        });

        expect(responseFromServer).toBe('test');   


    });

    it('reauthenticate should resolve immediately if database is already set up', fakeAsync(() => {

        let resolved = false;
        let rejected = false;

        spyOn(dataProvider, 'db').and.returnValue(true);

        authProvider.reauthenticate().then((res) => {
            resolved = true;
        }, (err) => {
            rejected = true;
        });

        tick();

        expect(resolved).toBe(true);

    }));

    it('reauthenticate should return a rejected promise if no user data is available', fakeAsync(() => {

        let resolved = false;
        let rejected = false;

        dataProvider.db = null;
        spyOn(userProvider, 'getUserData').and.returnValue(Promise.resolve(null));

        authProvider.reauthenticate().then((res) => {
            resolved = true;
        }, (err) => {
            rejected = true;
        });

        tick();

        expect(rejected).toBe(true);

    }));

    it('reauthenticate should return a rejected promise if the expires user data is less than the current date', fakeAsync(() => {

        let resolved = false;
        let rejected = false;

        let oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        let fakeUserData = {
            user_id: 'test',
            token: 'test',
            password: 'test',
            issued: 'test',
            expires: oneWeekAgo,
            userDBs: {
                hangz: 'test'
            } 
        };

        dataProvider.db = null;
        spyOn(userProvider, 'getUserData').and.returnValue(Promise.resolve(fakeUserData));

        authProvider.reauthenticate().then((res) => {
            resolved = true;
        }, (err) => {
            rejected = true;
        });

        tick();

        expect(rejected).toBe(true);

    }));

    it('reauthenticate should return a resolved promise if the expires user data is greater than the current date', fakeAsync(() => {

        let resolved = false;
        let rejected = false;

        let daysLater = new Date();
        daysLater.setDate(daysLater.getDate() + 28);

        let fakeUserData = {
            user_id: 'test',
            token: 'test',
            password: 'test',
            issued: 'test',
            expires: daysLater,
            userDBs: {
                hangz: 'test'
            } 
        };

        dataProvider.db = null;
        spyOn(userProvider, 'getUserData').and.returnValue(Promise.resolve(fakeUserData));

        authProvider.reauthenticate().then((res) => {
            resolved = true;
        }, (err) => {
            rejected = true;
        });

        tick();

        expect(resolved).toBe(true);

    }));

    it('reauthenticate should set the currentUser in the user provider if not expired', fakeAsync(() => {

        let resolved = false;
        let rejected = false;

        let daysLater = new Date();
        daysLater.setDate(daysLater.getDate() + 28);

        let fakeUserData = {
            user_id: 'test',
            token: 'test',
            password: 'test',
            issued: 'test',
            expires: daysLater,
            userDBs: {
                hangz: 'test'
            } 
        };

        dataProvider.db = null;
        spyOn(userProvider, 'getUserData').and.returnValue(Promise.resolve(fakeUserData));

        authProvider.reauthenticate().then((res) => {
            resolved = true;
        }, (err) => {
            rejected = true;
        });

        tick();

        expect(userProvider.currentUser).toBe(fakeUserData);

    }));

    it('reauthenticate should call the initDatabase function in the data provider if not expired', fakeAsync(() => {

        let resolved = false;
        let rejected = false;

        let daysLater = new Date();
        daysLater.setDate(daysLater.getDate() + 28);

        let fakeUserData = {
            user_id: 'test',
            token: 'test',
            password: 'test',
            issued: 'test',
            expires: daysLater,
            userDBs: {
                hangz: 'test'
            } 
        };

        dataProvider.db = null;
        spyOn(userProvider, 'getUserData').and.returnValue(Promise.resolve(fakeUserData));
        spyOn(dataProvider, 'initDatabase');

        authProvider.reauthenticate().then((res) => {
            resolved = true;
        }, (err) => {
            rejected = true;
        });

        tick();

        expect(dataProvider.initDatabase).toHaveBeenCalledWith(fakeUserData.userDBs.hangz);

    }));

    it('the logout function should make a post request to the logout URL with authorisation headers', () => {

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + userProvider.currentUser.token + ':' + userProvider.currentUser.password); 

        spyOn(httpProvider, 'post').and.returnValue(Observable.of(true));
        spyOn(dataProvider.db, 'destroy').and.returnValue(Promise.resolve(true));

        authProvider.logout();

        expect(httpProvider.post).toHaveBeenCalledWith(SERVER_ADDRESS + 'auth/logout', {}, {headers: headers});

    });

    it('the logout function should destroy the database in the data provider', fakeAsync(() => {

        spyOn(httpProvider, 'post').and.returnValue(Observable.of(true));
        spyOn(dataProvider.db, 'destroy').and.returnValue(Promise.resolve(true));

        authProvider.logout();

        tick();

        expect(dataProvider.db).toBe(null);

    }));

    it('the logout function should overwrite existing user data with null', fakeAsync(() => {

        spyOn(httpProvider, 'post').and.returnValue(Observable.of(true));
        spyOn(dataProvider.db, 'destroy').and.returnValue(Promise.resolve(true));
        spyOn(userProvider, 'saveUserData');

        authProvider.logout();

        tick();

        expect(userProvider.saveUserData).toHaveBeenCalledWith(null);

    }));

    it('the logout function should set the root page to the Login Page', fakeAsync(() => {

        spyOn(httpProvider, 'post').and.returnValue(Observable.of(true));
        spyOn(dataProvider.db, 'destroy').and.returnValue(Promise.resolve(true));

        let spiedObject;

        spyOn(appCtrl, 'getRootNav').and.callFake(() => {

          spiedObject = {
            setRoot: (page: string) => {}
          };

          spyOn(spiedObject, 'setRoot');

          return spiedObject;

        });

        authProvider.logout();

        tick();

        expect(spiedObject.setRoot).toHaveBeenCalledWith('LoginPage');

    }));

});