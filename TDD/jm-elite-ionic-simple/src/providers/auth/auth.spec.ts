import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { App } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MockBackend } from '@angular/http/testing';
import { AuthProvider } from './auth';
import { AppMock } from '../../../test-config/mocks-ionic';

describe('Provider: Auth Provider', () => {
  
  let authProvider;
  let mockBackend;
  let appCtrl;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: App, useClass: AppMock },
        AuthProvider,
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
        HttpModule,
        IonicStorageModule.forRoot()
      ]
    }).compileComponents();

  }));

  beforeEach(inject([AuthProvider, MockBackend, App], (ap, mb, app) => {
    authProvider = ap;
    mockBackend = mb;
    appCtrl = app;
  }));

  it('checkKey should make a call to the server to check the validity of a key', () => {

      let key = "abcd";
      let mockResponse = '{"isValid": true}';

      mockBackend.connections.subscribe((connection) => {

        connection.mockRespond(new Response(new ResponseOptions({
          body: mockResponse
        })));

      });

      let serverResponse;

      authProvider.checkKey(key).subscribe((result) => {
        serverResponse = result;
      });

      expect(serverResponse.isValid).toBe(true);

  });

  it('reauthenticate should return a resolved promise if a valid key is in storage', fakeAsync(() => {

    let resolved = false;
    let rejected = false;

    let mockResponse = '{"isValid": true}';

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });

    spyOn(authProvider.storage, 'get').and.returnValue(Promise.resolve('abcde'));

    authProvider.reauthenticate().then((res) => {
      resolved = true;
    }, (err) => {
      rejected = true;
    });

    tick();

    expect(resolved).toBe(true);

  }));

  it('checkKey should save the key being saved to storage', () => {

    let key = 'abcde';
    let mockResponse = '{"isValid": true}';

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });

    spyOn(authProvider.storage, 'set');

    authProvider.checkKey(key).subscribe((result) => {});

    expect(authProvider.storage.set).toHaveBeenCalledWith('eliteLicenseKey', 'abcde');

  });

  it('the logout function should set the root page to the Login Page', fakeAsync(() => {

    spyOn(authProvider.storage, 'set').and.returnValue(Promise.resolve(true));

    let spiedObject;

    spyOn(appCtrl, 'getRootNav').and.callFake(() => {
      spiedObject = {
        setRoot: (page: string) => {}
      };

      spyOn(spiedObject, 'setRoot');

      return spiedObject
    });

    authProvider.logout();

    tick();

    expect(spiedObject.setRoot).toHaveBeenCalledWith('LoginPage');

  }));

  it('the logout function should clear the key in storage', () => {

    spyOn(authProvider.storage, 'set').and.returnValue(Promise.resolve(true));

    authProvider.logout();

    expect(authProvider.storage.set).toHaveBeenCalledWith('eliteLicenseKey', null);
  });

});
