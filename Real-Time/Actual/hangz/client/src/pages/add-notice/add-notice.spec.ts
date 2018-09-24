import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MyApp } from '../../app/app.component';
import { AddNoticePage } from './add-notice';
import { NoticesProvider } from '../../providers/notices/notices';
import { UserProvider } from '../../providers/user/user';
import { IonicModule, Platform, NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NoticesProviderMock } from '../../../test-config/mocks-app';
import { PlatformMock, StatusBarMock, SplashScreenMock, NavMock, NavParamsMock, ModalControllerMock, ViewControllerMock } from '../../../test-config/mocks-ionic';
import { UserProviderMock } from '../../../test-config/mocks-app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let de: DebugElement;
let comp: AddNoticePage;
let fixture: ComponentFixture<AddNoticePage>;
let el: HTMLElement;
let input: HTMLInputElement;

describe('AddNotice Page', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [
        MyApp,
        AddNoticePage
      ],

      imports: [
        IonicModule.forRoot(MyApp)
      ],

      providers: [
        { provide: UserProvider, useClass: UserProviderMock },
        { provide: NoticesProvider, useClass: NoticesProviderMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ViewController, useClass: ViewControllerMock },
        { provide: ModalController, useClass: ModalControllerMock },
        { provide: NavController, useClass: NavMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock }
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoticePage);
    comp = fixture.componentInstance;
  });

  afterEach(() => {

    fixture.destroy();
    comp = null;
    de = null;
    el = null;
    input = null;

  });

  it('should create component', () => {

    expect(comp instanceof AddNoticePage).toBe(true);
  
  });

  it('should have a title class member', () => {
    
    expect(comp.title).toBeDefined();

  });

  it('should have a message class member', () => {
    
    expect(comp.message).toBeDefined();

  });

  it('modifying the title input should update the title class member', async(() => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.title-input input'));
    input = de.nativeElement; 

    input.value = 'some title';
    input.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect<any>(comp.title).toBe('some title');
    });

  }));

  it('modifying the message input should update the message class member', () => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.message-input textarea'));
    input = de.nativeElement; 

    input.value = 'some message';
    input.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect<any>(comp.message).toBe('some message');
    });

  });

  it('should pass notice information to saveNotice function in notices provider when saved', () => {

    let noticesProvider = fixture.debugElement.injector.get(NoticesProvider);

    spyOn(noticesProvider, 'saveNotice');
    spyOn(comp, 'getDateISOString').and.returnValue('new date');

    comp.title = 'test title';
    comp.message = 'test message';

    comp.saveNotice();   

    expect<any>(noticesProvider.saveNotice).toHaveBeenCalledWith({
      doc: false,
      title: 'test title',
      message: 'test message',
      author: 'test',
      dateCreated: 'new date',
      dateUpdated: 'new date'
    }); 

  });

  it('should not allow a notice with an empty title to be saved', () => {

    let noticesProvider = fixture.debugElement.injector.get(NoticesProvider);

    spyOn(noticesProvider, 'saveNotice');

    comp.title = '';
    comp.saveNotice();

    expect(noticesProvider.saveNotice).not.toHaveBeenCalled();

  });

  it('should dismiss the modal once the notice is saved', () => {

    let viewCtrl = fixture.debugElement.injector.get(ViewController);

    spyOn(viewCtrl, 'dismiss');

    comp.title = 'some title';
    comp.saveNotice();

    expect(viewCtrl.dismiss).toHaveBeenCalled();

  });

  it('should set the input fields with existing information if a notice is passed in through NavParams', () => {
  
    let navParams = fixture.debugElement.injector.get(NavParams);

    navParams.setParams('notice', {
      _id: 'someid',
      _rev: 'somerev',
      title: 'some title',
      message: 'some message'
    });

    comp.ionViewDidLoad();

    expect<any>(comp.title).toBe('some title');
    expect<any>(comp.message).toBe('some message');
  
  });

  it('if editing an existing notice, should pass information to saveNotice function when saved', () => {

    let noticesProvider = fixture.debugElement.injector.get(NoticesProvider);
    let navParams = fixture.debugElement.injector.get(NavParams);

    spyOn(noticesProvider, 'saveNotice');
    spyOn(comp, 'getDateISOString').and.returnValue('new date');

    let doc = {
      _id: 'someid',
      _rev: 'somerev',
      title: 'original title',
      message: 'original message',
      author: 'test',
      dateCreated: 'original date',
      dateUpdated: 'original date'
    };
  
    navParams.setParams('notice', doc);

    comp.ionViewDidLoad();

    comp.message = 'new message';

    comp.saveNotice();   

    expect<any>(noticesProvider.saveNotice).toHaveBeenCalledWith({
      doc: doc,
      title: 'original title',
      message: 'new message',
      author: 'test',
      dateCreated: 'new date',
      dateUpdated: 'new date'
    }); 

  });

});
