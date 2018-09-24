import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MyApp } from '../../app/app.component';
import { ChatPage } from './chat';
import { ChatProvider } from '../../providers/chat/chat';
import { DataProvider } from '../../providers/data/data';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';
import { IonicModule, Platform, NavController, ModalController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChatProviderMock, DataProviderMock, UserProviderMock, AuthProviderMock } from '../../../test-config/mocks-app';
import { PlatformMock, StatusBarMock, SplashScreenMock, NavMock, ModalControllerMock, LoadingControllerMock } from '../../../test-config/mocks-ionic';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';

let de: DebugElement;
let comp: ChatPage;
let fixture: ComponentFixture<ChatPage>;
let input: HTMLInputElement;

describe('Chat Page', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [
        MyApp,
        ChatPage
      ],

      imports: [
        IonicModule.forRoot(MyApp)
      ],

      providers: [
        { provide: UserProvider, useClass: UserProviderMock },
        { provide: AuthProvider, useClass: AuthProviderMock },
        { provide: LoadingController, useClass: LoadingControllerMock },
        { provide: ChatProvider, useClass: ChatProviderMock },
        { provide: DataProvider, useClass: DataProviderMock },
        { provide: ModalController, useClass: ModalControllerMock },
        { provide: NavController, useClass: NavMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPage);
    comp = fixture.componentInstance;
  });

  afterEach(() => {

    fixture.destroy();
    comp = null;
    de = null;
    input = null;

  });

  it('should create component', () => {

    expect(comp instanceof ChatPage).toBe(true);
  
  });

  it('should have a message class member', () => {
    
    expect(comp.message).toBeDefined();

  });

  it('should initialise the chat provider', fakeAsync(() => {

    let chatProvider = fixture.debugElement.injector.get(ChatProvider);

    spyOn(chatProvider, 'init');

    comp.ionViewDidLoad();
  
    tick();

    expect(chatProvider.init).toHaveBeenCalled();

  }));

  it('should have a non-empty array of chats after loading', fakeAsync(() => {

    let chatProvider = fixture.debugElement.injector.get(ChatProvider);
    
    chatProvider.getChats = jasmine.createSpy('getChats').and.returnValue(Observable.of([{title: 'hello'}]));    

    comp.ionViewDidLoad();

    tick();

    expect(comp.chats.length).toBeGreaterThan(0);

  }));


  it('modifying the message input should update the message class member', async(() => {

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.chat-input'));
    input = de.nativeElement; 

    input.value = 'some message';
    input.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect<any>(comp.message).toBe('some message');
    });

  }));

  it('the addChat function should pass message to the chat provider', () => {

    let chatProvider = fixture.debugElement.injector.get(ChatProvider);

    spyOn(chatProvider, 'addChat');
    spyOn(comp, 'getDateISOString').and.returnValue('new date');

    comp.message = 'test message';

    comp.addChat();
  
    expect(chatProvider.addChat).toHaveBeenCalledWith({
      message: 'test message', 
      author: 'test',
      dateCreated: 'new date'
    });  
  
  });

  it('should not allow a chat with an empty message to be saved', () => {

    let chatProvider = fixture.debugElement.injector.get(ChatProvider);

    spyOn(chatProvider, 'addChat');

    comp.message = '';
    comp.addChat();

    expect(chatProvider.addChat).not.toHaveBeenCalled();

  });

  it('after a new chat is added, the input field should be cleared', () => {

    comp.message = 'test message';
    comp.addChat();

    expect(comp.message).toBe('');

  });

  it('the newChatAdded function should scroll the content to the bottom', fakeAsync(() => {

    spyOn(comp.contentArea, 'scrollToBottom');

    comp.newChatAdded();

    expect(comp.contentArea.scrollToBottom).toHaveBeenCalled();

  }));

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
