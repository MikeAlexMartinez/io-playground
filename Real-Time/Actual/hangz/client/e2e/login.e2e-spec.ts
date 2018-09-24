import { protractor, browser } from 'protractor';
import { LoginPageObject } from './page-objects/login.page-object';
import { RegisterPageObject } from './page-objects/register.page-object';
import { HomePageObject } from './page-objects/home.page-object';

describe('Login', () => {

	let loginPage: LoginPageObject;
	let registerPage: RegisterPageObject;
	let homePage: HomePageObject;

	beforeEach(() => {

		loginPage = new LoginPageObject();
		registerPage = new RegisterPageObject();
		homePage = new HomePageObject();

		loginPage.browseToPage();

	});

	afterAll(() => {

		browser.get('');

		loginPage.getUsernameField().sendKeys('testguy');
		loginPage.getPasswordField().sendKeys('password');

		loginPage.getLoginButton().click();

		browser.wait(protractor.ExpectedConditions.urlContains('home'));

	});

	it('should be taken to the notices tab after logging in', () => {

		loginPage.getUsernameField().sendKeys('testguy');
		loginPage.getPasswordField().sendKeys('password');

		loginPage.getLoginButton().click();

		browser.wait(protractor.ExpectedConditions.urlContains('home'));

		expect<any>(registerPage.getTitle()).toBe('Notices');

	});

	it('should be taken straight to the notices tab if already logged in', () => {

		loginPage.getUsernameField().sendKeys('testguy');
		loginPage.getPasswordField().sendKeys('password');

		loginPage.getLoginButton().click();

		browser.wait(protractor.ExpectedConditions.urlContains('home'));

		browser.get('');

		browser.wait(protractor.ExpectedConditions.urlContains('home'));

		expect<any>(registerPage.getTitle()).toBe('Notices');

	});

	it('should be able to launch the registration page', () => {

		loginPage.getCreateAccountButton().click();

		expect<any>(registerPage.getTitle()).toBe('Create Account');

	});

});