import { browser, element, by, ElementFinder } from 'protractor';
import { AppPageObject } from './app.page-object';
import { LessonSelectPageObject } from './lesson-select.page-object';

export class LessonPageObject {

  private _appPage = new AppPageObject();
  private _lessonSelectPage = new LessonSelectPageObject();

  public browseToPage() {
    this._lessonSelectPage.browseToPage();
    this._lessonSelectPage.getLessonListItems().first().click();
    this._appPage.waitForClickBlock();
  }

  public getLessonContent() {
    return element(by.css('.lesson-content'));
  }

}