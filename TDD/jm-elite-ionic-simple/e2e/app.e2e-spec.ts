import { browser } from 'protractor';
import { AppPageObject } from './page-objects/app.page-object';

describe('App', () => {

  let appPage: AppPageObject;

  beforeEach(() => {
    appPage = new AppPageObject();
  });

  // This is due to onPrepare function logging in initially
  it('First page should have a title of Home', () => {

    let titleElement = appPage.getTitle();

    expect(titleElement.getText()).toContain('Home');

  });

});