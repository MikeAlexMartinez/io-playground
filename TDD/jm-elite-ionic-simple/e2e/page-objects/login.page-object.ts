import { browser, element, by, ElementFinder } from 'protractor';
import { HomePageObject } from './home.page-object';
import { protractor } from 'protractor/built/ptor';

export class LoginPageObject {

  homePage = new HomePageObject();

  public browseToPage() {
    this.homePage.browseToPage();
    this.homePage.getLogoutButton().click();
    browser.wait(protractor.ExpectedConditions.not((protractor.ExpectedConditions.urlContains('home'))));
  }

  public getKeyInput() {
    return element.all(by.css('.key-input input'));
  }

  public getLoginButton() {
    return element.all(by.css('.login-button'));
  }
}
