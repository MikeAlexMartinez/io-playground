import { protractor, browser } from 'protractor';
import { LoginPageObject } from './page-objects/login.page-object';
import { RegisterPageObject } from './page-objects/register.page-object';
import { AppPageObject } from './page-objects/app.page-object';

describe('Register', () => {

	let loginPage: LoginPageObject;
	let registerPage: RegisterPageObject;
	let appPage: AppPageObject;

	beforeEach(() => {

		loginPage = new LoginPageObject();
		registerPage = new RegisterPageObject();
		appPage = new AppPageObject();

		registerPage.browseToPage();

	});

	it('should redirect to the home page after successful account creation', () => {

		loginPage.getCreateAccountButton().click();

		appPage.waitForClickBlock();

		registerPage.getUsernameField().sendKeys('testacc');

		let random = (Math.floor(Date.now() / 100000)).toString();

		registerPage.getUsernameField().sendKeys(random);
		registerPage.getEmailField().sendKeys(random + '@test.com');
		registerPage.getPasswordField().sendKeys('password');
		registerPage.getConfirmPasswordField().sendKeys('password');

		registerPage.getRegisterButton().click();
		appPage.waitForClickBlock();

		browser.wait(protractor.ExpectedConditions.urlContains('home'));

		expect<any>(registerPage.getTitle()).toBe('Notices');

	});

});