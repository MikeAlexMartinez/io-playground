import { browser, protractor } from 'protractor';
import { HomePageObject } from './page-objects/home.page-object';
import { LessonSelectPageObject } from './page-objects/lesson-select.page-object';
import { LoginPageObject } from './page-objects/login.page-object';

describe('Page: Home', () => {
  
  let homePage: HomePageObject;
  let loginPage: LoginPageObject;
  let lessonSelectPage: LessonSelectPageObject;

  beforeEach(() => {

    homePage = new HomePageObject();
    loginPage = new LoginPageObject();
    lessonSelectPage = new LessonSelectPageObject();
    homePage.browseToPage();

  });

  it('should be able to view a list of modules', () => {
    expect<any>(homePage.getModulesListItems().count()).toBe(5);
  });

  it('the list of modules should contain the titles of the modules', () => {
    expect<any>(homePage.getModulesListItems().first().getText()).toContain('Module One');
  });

  it('after selecting a specific module, the user should be able to see a list of available lessons', () => {

    let moduleToTest = homePage.getModulesListItems().first();

    moduleToTest.click();

    expect<any>(lessonSelectPage.getLessonListItems().count()).toBeGreaterThan(1);

  });

  it('should be able to logout', () => {

    homePage.getLogoutButton().click();

    browser.wait(protractor.ExpectedConditions.not((protractor.ExpectedConditions.urlContains('home'))));

    /* Log back in to prevent rest of test breaking */
  
    let input = loginPage.getKeyInput();
    let loginButton = loginPage.getLoginButton();
  
    input.sendKeys('abcde');
  
    loginButton.click();
  
    browser.wait(protractor.ExpectedConditions.urlContains('home'));
  });

});
