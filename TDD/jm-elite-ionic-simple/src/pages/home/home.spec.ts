import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HomePage } from './home';
import { IonicModule, NavController, DeepLinker } from 'ionic-angular';
import { NavMock, DeepLinkerMock } from '../../../test-config/mocks-ionic';

import 'jasmine';
import { AuthProvider } from '../../providers/auth/auth';
import { AuthProviderMock } from '../../../test-config/mocks-app';

describe('Page: Home', () => {

  let comp: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [
        { provide: DeepLinker, useClass: DeepLinkerMock },
        { provide: NavController, useClass: NavMock },
        { provide: AuthProvider, useClass: AuthProviderMock }
      ]
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {

    expect(comp instanceof HomePage).toBe(true);
  
  });

  it('should have a class member called modules that is an array', () => {

    expect(comp.modules instanceof Array).toBe(true);

  });

  it('the modules class member should contain 5 modules after ionViewDidLoad has been triggered', () => {

    comp.ionViewDidLoad();

    expect(comp.modules.length).toBe(5);

  });

  it('the openModule() function should push the lesson select page onto the navigation stack', () => {

    let navCtrl = fixture.debugElement.injector.get(NavController);

    spyOn(navCtrl, 'push');

    let testModule = {title: 'pretend module'};

    comp.openModule(testModule);

    expect(navCtrl.push).toHaveBeenCalledWith('LessonSelectPage', {module: testModule});

  });

  it('the logout function should call the logout method of the auth provider', () => {
    let authProvider = fixture.debugElement.injector.get(AuthProvider);

    spyOn(authProvider, 'logout');

    comp.logout();

    expect(authProvider.logout).toHaveBeenCalled();
  });

});