import { protractor, browser, element, by, ElementFinder } from 'protractor';
import { HomePageObject } from './home.page-object';

export class LoginPageObject {

	homePage: HomePageObject = new HomePageObject();

	browseToPage(){

		this.homePage.browseToPage();
		this.homePage.getLogoutButton().click();
		browser.wait(protractor.ExpectedConditions.not((protractor.ExpectedConditions.urlContains('home'))));

	}

	getLoginButton(){
		return element(by.css('.login-button'));
	}

	getUsernameField(){
		return element(by.css('.username-input input'));
	}

	getPasswordField(){
		return element(by.css('.password-input input'));
	}
  
	getCreateAccountButton(){
		return element(by.css('.create-account-button'));
	}

	getLoadingOverlay(){
		return element(by.css('.loading-wrapper'));
	}

}