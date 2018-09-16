import { browser, element, by, ElementFinder } from 'protractor';
import { HomePageObject } from './home.page-object';
import { AppPageObject } from './app.page-object';

export class LessonSelectPageObject {

  private _homePage = new HomePageObject();
  private _appPage = new AppPageObject();

  public browseToPage() {
    this._homePage.browseToPage();
    this._homePage.getModulesListItems().first().click();
    this._appPage.waitForClickBlock();
  }

  public getLessonListItems() {
    return element.all(by.css('.lesson-list button'));
  }

}