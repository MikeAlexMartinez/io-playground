import { async, ComponentFixture, TestBed, tick, flushMicrotasks, fakeAsync } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RegisterPage } from './register';
import { IonicModule, Platform, NavController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { DataProvider } from '../../providers/data/data';
import { UserProviderMock, DataProviderMock, AuthProviderMock } from '../../../test-config/mocks-app';
import { PlatformMock, StatusBarMock, SplashScreenMock, NavMock, LoadingControllerMock } from '../../../test-config/mocks-ionic';
import { UsernameValidator } from '../../validators/username';
import { EmailValidator } from '../../validators/email';
import { ErrorMessagesComponent } from '../../components/error-messages/error-messages';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let usernameValidatorStub = {
  checkUsername(control: any): any { return Promise.resolve(null); }
};

let emailValidatorStub = {
  checkEmail(control: any): any { return Promise.resolve(null); }
};

describe('Register Page', () => {

  let de: DebugElement;
  let comp: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authProvider;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [RegisterPage, ErrorMessagesComponent],
      imports: [
        IonicModule.forRoot(RegisterPage)
      ],
      providers: [
        { provide: UsernameValidator, useValue: usernameValidatorStub },
        { provide: EmailValidator, useValue: emailValidatorStub },
        { provide: LoadingController, useClass: LoadingControllerMock },
        { provide: AuthProvider, useClass: AuthProviderMock },
        { provide: DataProvider, useClass: DataProviderMock },
        { provide: UserProvider, useClass: UserProviderMock },
        { provide: NavController, useClass: NavMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock }
      ]
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    comp = fixture.componentInstance;

    authProvider = fixture.debugElement.injector.get(AuthProvider);

  });

  it('should create component', () => {

    expect(comp instanceof RegisterPage).toBe(true);
  
  });

  it('should have a username field', () => {
    expect(comp.registerForm.contains('username')).toBe(true);
  })

  it('should have an email field', () => {
    expect(comp.registerForm.contains('email')).toBe(true);
  });

  it('should have a password field', () => {
    expect(comp.registerForm.contains('password')).toBe(true);
  });

  it('should have a confirm password field', () => {
    expect(comp.registerForm.contains('confirmPassword')).toBe(true);
  });

  
  it('it should not allow form submission if a valid username is not present', fakeAsync(() => {

    let usernameValidator = fixture.debugElement.injector.get(UsernameValidator);
    let emailValidator = fixture.debugElement.injector.get(EmailValidator);
    spyOn(usernameValidator, 'checkUsername').and.returnValue(Promise.resolve({'usernameInUse': true}));
    spyOn(emailValidator, 'checkEmail').and.returnValue(Promise.resolve(null));
    spyOn(authProvider, 'register').and.returnValue(Observable.of(true));

    // Invalid field
    comp.registerForm.controls.username.setValue('!');

    // Valid fields
    comp.registerForm.controls.email.setValue('test@test.com');
    comp.registerForm.controls.password.setValue('password');
    comp.registerForm.controls.confirmPassword.setValue('password');

    tick(1000);

    comp.createAccount();

    expect(authProvider.register).not.toHaveBeenCalled();
    
  }));

  it('it should not allow form submission if a valid email is not present', fakeAsync(() => {

    let usernameValidator = fixture.debugElement.injector.get(UsernameValidator);
    let emailValidator = fixture.debugElement.injector.get(EmailValidator);
    spyOn(usernameValidator, 'checkUsername').and.returnValue(Promise.resolve(null));
    spyOn(emailValidator, 'checkEmail').and.returnValue(Promise.resolve({'emailInUse': true}));
    spyOn(authProvider, 'register').and.returnValue(Observable.of(true));

    // Invalid field
    comp.registerForm.controls.email.setValue('!');

    // Valid fields
    comp.registerForm.controls.username.setValue('username');
    comp.registerForm.controls.password.setValue('password');
    comp.registerForm.controls.confirmPassword.setValue('password');

    tick(1000);

    comp.createAccount();

    expect(authProvider.register).not.toHaveBeenCalled();

  }));

  it('it should not allow form submission if a valid password is not present', fakeAsync(() => {

    let usernameValidator = fixture.debugElement.injector.get(UsernameValidator);
    let emailValidator = fixture.debugElement.injector.get(EmailValidator);
    spyOn(usernameValidator, 'checkUsername').and.returnValue(Promise.resolve(null));
    spyOn(emailValidator, 'checkEmail').and.returnValue(Promise.resolve(null));
    spyOn(authProvider, 'register').and.returnValue(Observable.of(true));

    // Invalid field
    comp.registerForm.controls.password.setValue('');

    // Valid fields
    comp.registerForm.controls.username.setValue('username');
    comp.registerForm.controls.email.setValue('test@test.com');
    comp.registerForm.controls.confirmPassword.setValue('password');

    tick(1000);

    comp.createAccount();

    expect(authProvider.register).not.toHaveBeenCalled();

  }));

  it('it should not allow form submission if the password and confirmPassword fields do not match', fakeAsync(() => {

    let usernameValidator = fixture.debugElement.injector.get(UsernameValidator);
    let emailValidator = fixture.debugElement.injector.get(EmailValidator);
    spyOn(usernameValidator, 'checkUsername').and.returnValue(Promise.resolve(null));
    spyOn(emailValidator, 'checkEmail').and.returnValue(Promise.resolve(null));
    spyOn(authProvider, 'register').and.returnValue(Observable.of(true));

    // Invalid field
    comp.registerForm.controls.confirmPassword.setValue('someotherpassword');

    // Valid fields
    comp.registerForm.controls.username.setValue('username');
    comp.registerForm.controls.email.setValue('test@test.com');
    comp.registerForm.controls.password.setValue('somepassword');
    comp.registerForm.controls.confirmPassword.setValue('someotherpassword');

    tick(1000);

    comp.createAccount();

    expect(authProvider.register).not.toHaveBeenCalled();

  }));

  it('it should allow the form to be submitted if all fields are valid', fakeAsync(() => {

    let usernameValidator = fixture.debugElement.injector.get(UsernameValidator);
    let emailValidator = fixture.debugElement.injector.get(EmailValidator);
    spyOn(usernameValidator, 'checkUsername').and.returnValue(Promise.resolve(null));
    spyOn(emailValidator, 'checkEmail').and.returnValue(Promise.resolve(null));
    spyOn(authProvider, 'register').and.returnValue(Observable.of(true));

    // Valid fields
    comp.registerForm.controls.username.setValue('username');
    comp.registerForm.controls.email.setValue('test@test.com');
    comp.registerForm.controls.password.setValue('password');
    comp.registerForm.controls.confirmPassword.setValue('password');

    fixture.detectChanges();
    tick();

    comp.createAccount();

    expect(authProvider.register).toHaveBeenCalled();

  }));

  it('for a successful registration, the initDatabase function on the dataprovider should be called', fakeAsync(() => {

    let usernameValidator = fixture.debugElement.injector.get(UsernameValidator);
    let emailValidator = fixture.debugElement.injector.get(EmailValidator);
    let dataProvider = fixture.debugElement.injector.get(DataProvider);

    let fakeUserData = {
      user_id: 'test',
      token: 'test',
      password: 'test',
      issued: 'test',
      expires: 'test',
      userDBs: {
        hangz: 'test'
      } 
    };

    spyOn(usernameValidator, 'checkUsername').and.returnValue(Promise.resolve(null));
    spyOn(emailValidator, 'checkEmail').and.returnValue(Promise.resolve(null));
    spyOn(authProvider, 'register').and.returnValue(Observable.of(fakeUserData));
    spyOn(dataProvider, 'initDatabase');

    // Valid fields
    comp.registerForm.controls.username.setValue('username');
    comp.registerForm.controls.email.setValue('test@test.com');
    comp.registerForm.controls.password.setValue('password');
    comp.registerForm.controls.confirmPassword.setValue('password');

    fixture.detectChanges();
    tick();

    comp.createAccount();

    tick();

    expect(dataProvider.initDatabase).toHaveBeenCalledWith(fakeUserData.userDBs.hangz);

  }));

  it('for a successful registration, the saveUserData function on the userprovider should be called', fakeAsync(() => {

    let usernameValidator = fixture.debugElement.injector.get(UsernameValidator);
    let emailValidator = fixture.debugElement.injector.get(EmailValidator);
    let userProvider = fixture.debugElement.injector.get(UserProvider);

    let fakeUserData = {
      user_id: 'test',
      token: 'test',
      password: 'test',
      issued: 'test',
      expires: 'test',
      userDBs: {
        hangz: 'test'
      } 
    };

    spyOn(usernameValidator, 'checkUsername').and.returnValue(Promise.resolve(null));
    spyOn(emailValidator, 'checkEmail').and.returnValue(Promise.resolve(null));
    spyOn(authProvider, 'register').and.returnValue(Observable.of(fakeUserData));
    spyOn(userProvider, 'saveUserData');

    // Valid fields
    comp.registerForm.controls.username.setValue('username');
    comp.registerForm.controls.email.setValue('test@test.com');
    comp.registerForm.controls.password.setValue('password');
    comp.registerForm.controls.confirmPassword.setValue('password');

    fixture.detectChanges();
    tick();

    comp.createAccount();

    tick();

    expect(userProvider.saveUserData).toHaveBeenCalledWith(fakeUserData);

  }));

  it('for a successful registration, the root page should be set to the Home Page', fakeAsync(() => {

    let usernameValidator = fixture.debugElement.injector.get(UsernameValidator);
    let emailValidator = fixture.debugElement.injector.get(EmailValidator);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    let fakeUserData = {
      user_id: 'test',
      token: 'test',
      password: 'test',
      issued: 'test',
      expires: 'test',
      userDBs: {
        hangz: 'test'
      } 
    };

    spyOn(usernameValidator, 'checkUsername').and.returnValue(Promise.resolve(null));
    spyOn(emailValidator, 'checkEmail').and.returnValue(Promise.resolve(null));
    spyOn(authProvider, 'register').and.returnValue(Observable.of(fakeUserData));
    spyOn(navCtrl, 'setRoot');

    // Valid fields
    comp.registerForm.controls.username.setValue('username');
    comp.registerForm.controls.email.setValue('test@test.com');
    comp.registerForm.controls.password.setValue('password');
    comp.registerForm.controls.confirmPassword.setValue('password');

    fixture.detectChanges();
    tick();

    comp.createAccount();

    tick();

    expect(navCtrl.setRoot).toHaveBeenCalledWith('HomePage');

  }));

});
