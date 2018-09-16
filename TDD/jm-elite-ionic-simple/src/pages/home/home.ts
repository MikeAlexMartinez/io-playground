import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public modules: Object[] = [];

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider
  ) { }

  ionViewDidLoad() {

    this.modules = [
      {
        title: 'Module One', 
        description: 'Test', 
        lessons: [
          {title: 'Lesson 1', content: 'this is the lesson content'},
          {title: 'Lesson 2', content: 'this is the lesson content'}
        ]
      },
      {
        title: 'Module Two', 
        description: 'Test', 
        lessons: [
          {title: 'Lesson 1', content: 'this is the lesson content'},
          {title: 'Lesson 2', content: 'this is the lesson content'}
        ]
      },
      {
        title: 'Module Three', 
        description: 'Test', 
        lessons: [
          {title: 'Lesson 1', content: 'this is the lesson content'},
          {title: 'Lesson 2', content: 'this is the lesson content'}
        ]
      },
      {
        title: 'Module Four', 
        description: 'Test', 
        lessons: [
          {title: 'Lesson 1', content: 'this is the lesson content'},
          {title: 'Lesson 2', content: 'this is the lesson content'}
        ]
      },
      {
        title: 'Module Five', 
        description: 'Test', 
        lessons: [
          {title: 'Lesson 1', content: 'this is the lesson content'},
          {title: 'Lesson 2', content: 'this is the lesson content'}
        ]
      }
    ];

  }

  public openModule(module) {
    this.navCtrl.push('LessonSelectPage', {
      module
    });
  }

  public logout() {
    this.authProvider.logout();
  }

}
