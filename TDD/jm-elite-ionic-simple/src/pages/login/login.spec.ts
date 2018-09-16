import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginPage } from './login';
import { AuthProvider } from '../../providers/auth/auth';
import { IonicModule, NavController, NavParams, DeepLinker, LoadingController } from 'ionic-angular';
import { NavMock, DeepLinkerMock, LoadingControllerMock } from '../../../test-config/mocks-ionic';
import { AuthProviderMock } from '../../../test-config/mocks-app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'jasmine';

describe('Page: Login', () => {
  
  let comp: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage)
      ],
      providers: [
        { provide: DeepLinker, useClass: DeepLinkerMock },
        { provide: NavController, useClass: NavMock },
        { provide: AuthProvider, useClass: AuthProviderMock },
        { provide: LoadingController, useClass: LoadingControllerMock },
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

  it('should hae a licenseKey class member', () => {
    expect(comp.licenseKey).toBeDefined();
  });

  it('should show a loading overlay whilst an authentication request is being made', () => {
    let authProvider = fixture.debugElement.injector.get(AuthProvider);
    let loadingCtrl = fixture.debugElement.injector.get(LoadingController);

    let spiedObject;

    spyOn(loadingCtrl, 'create').and.callFake(() => {

      spiedObject = {
        present: () => { return Promise.resolve(true) },
        dismiss: () => { return Promise.resolve(true) }
      }

      spyOn(spiedObject, 'present');

      return spiedObject;
    });

    let authResponse = {
      isValid: true
    };

    spyOn(authProvider, 'checkKey').and.returnValue(Observable.of(authResponse));

    comp.licenseKey = 'abcde';
    comp.login();

    expect(spiedObject.present).toHaveBeenCalled();

  });

  it('should dismiss the loading overlay after getting a response from the server', fakeAsync(() => {

    let authProvider = fixture.debugElement.injector.get(AuthProvider);
    let loadingCtrl = fixture.debugElement.injector.get(LoadingController);

    let spiedObject;

    spyOn(loadingCtrl, 'create').and.callFake(() => {
      spiedObject = {
        present: () => { return Promise.resolve(true) },
        dismiss: () => { return Promise.resolve(true) }
      }

      spyOn(spiedObject, 'dismiss').and.callThrough();

      return spiedObject;
    });

    let authResponse = {
      isValid: true
    };

    spyOn(authProvider, 'checkKey').and.returnValue(Observable.of(authResponse));

    comp.licenseKey = 'abcde';
    comp.login();

    tick();

    expect(spiedObject.dismiss).toHaveBeenCalled();

  }));

  it('after a successful login, the root page should be changed to HomePage', fakeAsync(() => {

    let navCtrl = fixture.debugElement.injector.get(NavController);
    let authProvider = fixture.debugElement.injector.get(AuthProvider);

    let  authResponse = {
      isValid: true
    };

    spyOn(authProvider, 'checkKey').and.returnValue(Observable.of(authResponse));
    spyOn(navCtrl, 'setRoot');

    comp.licenseKey = 'abcde';
    comp.login();

    tick();

    expect(navCtrl.setRoot).toHaveBeenCalledWith('HomePage');

  }));

  it('if the user has a valid license key in storage then they should be taken straight to the home page', fakeAsync(() => {

    let authProvider = fixture.debugElement.injector.get(AuthProvider);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(navCtrl, 'setRoot');
    spyOn(authProvider, 'reauthenticate').and.returnValue(Promise.resolve(true));

    comp.ionViewDidLoad();

    tick();

    expect(navCtrl.setRoot).toHaveBeenCalledWith('HomePage');

  }));

});
