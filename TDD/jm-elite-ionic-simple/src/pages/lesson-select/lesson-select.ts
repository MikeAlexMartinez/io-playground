import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lesson-select',
  templateUrl: 'lesson-select.html',
})
export class LessonSelectPage {

  public lessons: Object[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    this.lessons = this.navParams.get('module').lessons;
  }

  public openLesson(lesson): void {
    this.navCtrl.push('LessonPage', { lesson });
  }
}
