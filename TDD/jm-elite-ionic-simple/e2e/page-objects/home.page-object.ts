import { protractor, browser, element, by } from 'protractor';
import { AppPageObject } from './app.page-object';

export class HomePageObject {
  
  public appPage = new AppPageObject();

  public browseToPage() {
    browser.get('');

    browser.wait(protractor.ExpectedConditions.urlContains('home'));

    this.appPage.waitForClickBlock();
  }

  public getModulesListItems() {
    return element.all(by.css('.module-list button'));
  }

  public getLogoutButton() {
    return element(by.css('.logout-button'));
  }
}
