import { protractor, browser, element, by } from 'protractor';

export class AppPageObject {
  
  browseToPage() {
    browser.get('');
  }

  getTitle() {
    return element(by.css('ion-title .toolbar-title'));
  }

  waitForClickBlock() {
    let clickBlockElement = element(by.css('.click-block-active'));
    browser.wait(protractor.ExpectedConditions.stalenessOf(clickBlockElement));
  }
}