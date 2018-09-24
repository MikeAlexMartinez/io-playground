import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginPage } from './login';
import { IonicModule, Platform, NavController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { PlatformMock, StatusBarMock, SplashScreenMock, NavMock, LoadingControllerMock } from '../../../test-config/mocks-ionic';
import { UserProviderMock, DataProviderMock, AuthProviderMock } from '../../../test-config/mocks-app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

describe('Login Page', () => {

  let de: DebugElement;
  let comp: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage)
      ],
      providers: [
        { provide: LoadingController, useClass: LoadingControllerMock },
        { provide: UserProvider, useClass: UserProviderMock},
        { provide: DataProvider, useClass: DataProviderMock},
        { provide: AuthProvider, useClass: AuthProviderMock},
        { provide: NavController, useClass: NavMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock }
      ]
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {

    expect(comp instanceof LoginPage).toBe(true);
  
  });

  it('should have an username class member', () => {
    
    expect(comp.username).toBeDefined();

  });

  it('should have a password class member', () => {
    
    expect(comp.password).toBeDefined();

  });

  it('openRegisterPage() should push the register page', () => {

    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(navCtrl, 'push');

    comp.openRegisterPage();

    expect(navCtrl.push).toHaveBeenCalledWith('RegisterPage');

  });

  it('if an invalid response is returned from the backend, the login should fail', fakeAsync(() => {

    let dataProvider = fixture.debugElement.injector.get(DataProvider);
    let authProvider = fixture.debugElement.injector.get(AuthProvider);

    let authResponse = {
      ok: false
    };

    spyOn(dataProvider, 'initDatabase');
    spyOn(authProvider, 'authenticate').and.returnValue(Observable.throw(authResponse));

    comp.username = 'test';
    comp.password = 'test';

    comp.login();

    tick();

    expect(dataProvider.initDatabase).not.toHaveBeenCalled();

  }));

  it('after a successful login, the initDatabase function on the dataprovider should be called', fakeAsync(() => {

    let dataProvider = fixture.debugElement.injector.get(DataProvider);
    let authProvider = fixture.debugElement.injector.get(AuthProvider);

    let authResponse = {
      user_id: 'test',
      token: 'test',
      password: 'test',
      issued: 'test',
      expires: 'test',
      userDBs: {
        hangz: 'test'
      } 
    };

    spyOn(dataProvider, 'initDatabase');
    spyOn(authProvider, 'authenticate').and.returnValue(Observable.of(authResponse));

    comp.username = 'test';
    comp.password = 'test';

    comp.login();

    tick();

    expect(dataProvider.initDatabase).toHaveBeenCalled();

  }));

  it('after a successful login, the user data should be passed to the userprovider', fakeAsync(() => {

    let userProvider = fixture.debugElement.injector.get(UserProvider);
    let authProvider = fixture.debugElement.injector.get(AuthProvider);

    let authResponse = {
      user_id: 'test',
      token: 'test',
      password: 'test',
      issued: 'test',
      expires: 'test',
      userDBs: {
        hangz: 'test'
      } 
    };

    spyOn(userProvider, 'saveUserData');
    spyOn(authProvider, 'authenticate').and.returnValue(Observable.of(authResponse));

    comp.username = 'test';
    comp.password = 'test';

    comp.login();

    tick();

    expect(userProvider.saveUserData).toHaveBeenCalled();

  }));

  it('should show a loading overlay whilst an authentication request is being made', () => {

    let authProvider = fixture.debugElement.injector.get(AuthProvider);
    let loadingCtrl = fixture.debugElement.injector.get(LoadingController);

    let spiedObject;

    spyOn(loadingCtrl, 'create').and.callFake(() => {

      spiedObject = {
        present: () => { return Promise.resolve(true) },
        dismiss: () => { return Promise.resolve(true) }
      };

      spyOn(spiedObject, 'present');

      return spiedObject;

    });

    let authResponse = {
      user_id: 'test',
      token: 'test',
      password: 'test',
      issued: 'test',
      expires: 'test',
      userDBs: {
        hangz: 'test'
      } 
    };

    spyOn(authProvider, 'authenticate').and.returnValue(Observable.of(authResponse));

    comp.username = 'test';
    comp.password = 'test';

    comp.login();

    expect(spiedObject.present).toHaveBeenCalled();

  });

  it('should dimiss the loading overlay after getting a response from the server', fakeAsync(() => {

    let authProvider = fixture.debugElement.injector.get(AuthProvider);
    let loadingCtrl = fixture.debugElement.injector.get(LoadingController);

    let spiedObject;

    spyOn(loadingCtrl, 'create').and.callFake(() => {

      spiedObject = {
        present: () => { return Promise.resolve(true) },
        dismiss: () => { return Promise.resolve(true) }
      };

      spyOn(spiedObject, 'dismiss').and.callThrough();

      return spiedObject;

    });

    let authResponse = {
      user_id: 'test',
      token: 'test',
      password: 'test',
      issued: 'test',
      expires: 'test',
      userDBs: {
        hangz: 'test'
      } 
    };

    spyOn(authProvider, 'authenticate').and.returnValue(Observable.of(authResponse));

    comp.username = 'test';
    comp.password = 'test';

    comp.login();

    tick();

    expect(spiedObject.dismiss).toHaveBeenCalled();

  }));

  it('after a successful login, the root page should be changed to HomePage', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    let authProvider = fixture.debugElement.injector.get(AuthProvider);

    let authResponse = {
      user_id: 'test',
      token: 'test',
      password: 'test',
      issued: 'test',
      expires: 'test',
      userDBs: {
        hangz: 'test'
      } 
    };

    spyOn(authProvider, 'authenticate').and.returnValue(Observable.of(authResponse));
    spyOn(navCtrl, 'setRoot');

    comp.username = 'test';
    comp.password = 'test';

    comp.login();

    tick();
  
    expect(navCtrl.setRoot).toHaveBeenCalledWith('HomePage');

  }));

  it('after an unsuccessful login, the failedAttempt class member should be set to true', fakeAsync(() => {

    let authProvider = fixture.debugElement.injector.get(AuthProvider);

    let authResponse = {
      ok: false
    };

    spyOn(authProvider, 'authenticate').and.returnValue(Observable.throw(authResponse));

    comp.username = 'test';
    comp.password = 'test';

    comp.login();

    tick();

    expect<any>(comp.failedAttempt).toBe(true);

  }));

  it('if the user has a valid token then they should be taken straight to the home page', fakeAsync(() => {

    let authProvider = fixture.debugElement.injector.get(AuthProvider);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(navCtrl, 'setRoot');
    spyOn(authProvider, 'authenticate').and.returnValue(Promise.resolve(true));

    comp.ionViewDidLoad();

    tick();
    
    expect(navCtrl.setRoot).toHaveBeenCalledWith('HomePage');

  }));

});
