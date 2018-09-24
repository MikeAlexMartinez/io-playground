import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MyApp } from '../../app/app.component';
import { NoticesPage } from './notices';
import { NoticesProvider } from '../../providers/notices/notices';
import { DataProvider } from '../../providers/data/data';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';
import { IonicModule, Platform, NavController, ModalController, LoadingController, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NoticesProviderMock, DataProviderMock, UserProviderMock, AuthProviderMock } from '../../../test-config/mocks-app';
import { PlatformMock, StatusBarMock, SplashScreenMock, NavMock, ModalControllerMock, LoadingControllerMock, AlertControllerMock } from '../../../test-config/mocks-ionic';
import { SkeletonCardComponent } from '../../components/skeleton-card/skeleton-card';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';

let de: DebugElement;
let comp: NoticesPage;
let fixture: ComponentFixture<NoticesPage>;

describe('Notices Page', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [
        MyApp,
        NoticesPage,
        SkeletonCardComponent
      ],

      imports: [
        IonicModule.forRoot(MyApp)
      ],

      providers: [
        { provide: LoadingController, useClass: LoadingControllerMock },
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: AuthProvider, useClass: AuthProviderMock },
        { provide: UserProvider, useClass: UserProviderMock },
        { provide: NoticesProvider, useClass: NoticesProviderMock },
        { provide: DataProvider, useClass: DataProviderMock },
        { provide: ModalController, useClass: ModalControllerMock },
        { provide: NavController, useClass: NavMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock }
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticesPage);
    comp = fixture.componentInstance;
  });

  afterEach(() => {

    fixture.destroy();
    comp = null;
    de = null;

  });

  it('should create component', () => {

    expect(comp instanceof NoticesPage).toBe(true);
  
  });

  it('should initialise the notices provider', fakeAsync(() => {

    let noticesProvider = fixture.debugElement.injector.get(NoticesProvider);

    spyOn(noticesProvider, 'init');

    comp.ionViewDidLoad();

    tick();

    expect(noticesProvider.init).toHaveBeenCalled();

  }));

  it('should have a non-empty array of notices after loading', fakeAsync(() => {

    let noticesProvider = fixture.debugElement.injector.get(NoticesProvider);
    
    noticesProvider.getNotices = jasmine.createSpy('getNotices').and.returnValue(Observable.of([{title: 'hello'}]));    

    comp.ionViewDidLoad();

    tick();

    expect(comp.notices.length).toBeGreaterThan(0);

  }));

  it('should update notices member whenever a new notice is added by the notices provider', fakeAsync(() => {

    let noticesProvider = fixture.debugElement.injector.get(NoticesProvider);
    let fakeNoticesSubject = new Subject();

    spyOn(comp, 'notices');
    spyOn(noticesProvider, 'getNotices').and.returnValue(fakeNoticesSubject);

    comp.ionViewDidLoad();

    tick();

    expect(comp.notices.length).toBe(0);

    fakeNoticesSubject.next([{title: 'test', message: 'test', author: 'test'}]);

    tick();

    expect(comp.notices.length).toBe(1);

  }));

  it('should pass the notice to the add notice modal when editing a notice', () => {

    let modalCtrl = fixture.debugElement.injector.get(ModalController);

    spyOn(modalCtrl, 'create').and.callThrough();

    let testNotice = {
      _id: "someid",
      _rev: "somerev",
      title: "sometitle",
      message: "somemessage"
    }

    comp.openAddNoticePage(testNotice);

    expect(modalCtrl.create).toHaveBeenCalledWith('AddNoticePage', {
      notice: testNotice
    });

  });

  it('openAddNoticePage should create a modal using the add notice page', () => {

    let modalCtrl = fixture.debugElement.injector.get(ModalController);

    spyOn(modalCtrl, 'create').and.callThrough();

    comp.openAddNoticePage();
    
    expect(modalCtrl.create).toHaveBeenCalledWith('AddNoticePage', {
      notice: undefined
    });

  });

  it('openAddNoticePage should call the present function on the modal', () => {

    let modalCtrl = fixture.debugElement.injector.get(ModalController);

    let spiedObject;

    spyOn(modalCtrl, 'create').and.callFake(() => {

      spiedObject = {
        present: () => {}
      };

      spyOn(spiedObject, 'present');

      return spiedObject;

    });

    comp.openAddNoticePage();

    expect(spiedObject.present).toHaveBeenCalled();

  });

  it('the delete notice function should present a confirmation overlay', () => {

    let alertCtrl = fixture.debugElement.injector.get(AlertController);

    let spiedObject;

    spyOn(alertCtrl, 'create').and.callFake(() => {

      spiedObject = {
        present: () => {}
      };

      spyOn(spiedObject, 'present');

      return spiedObject;

    });

    let testNotice = {
      _id: "someid",
      _rev: "somerev",
      title: "sometitle",
      message: "somemessage"
    };

    comp.deleteNotice(testNotice);

    expect(spiedObject.present).toHaveBeenCalled();
  
  });

  it('if the user is not successfully reauthenticated, they should be kicked back to the login page', fakeAsync(() => {

    let authProvider = fixture.debugElement.injector.get(AuthProvider);
    let navCtrl = fixture.debugElement.injector.get(NavController);

    let authResponse = {
      ok: false
    };

    spyOn(authProvider, 'reauthenticate').and.returnValue(Promise.reject(authResponse));
    spyOn(navCtrl, 'setRoot');

    comp.ionViewDidLoad();

    tick();

    expect(navCtrl.setRoot).toHaveBeenCalledWith('LoginPage');

  }));

  it('the logout function should call the logout method of the auth provider', () => {

    let authProvider = fixture.debugElement.injector.get(AuthProvider);
  
    spyOn(authProvider, 'logout');

    comp.logout();

    expect(authProvider.logout).toHaveBeenCalled();

  });

});
