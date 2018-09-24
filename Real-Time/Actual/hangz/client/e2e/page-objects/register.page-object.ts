import { protractor, browser, element, by, ElementFinder } from 'protractor';
import { HomePageObject } from './home.page-object';

export class RegisterPageObject {

	homePage: HomePageObject = new HomePageObject();

	browseToPage(){

		this.homePage.browseToPage();
		this.homePage.getLogoutButton().click();
		browser.wait(protractor.ExpectedConditions.not((protractor.ExpectedConditions.urlContains('home'))));

	}

	getTitle(){
		return element(by.css('ion-title')).getText();
	}

	getRegisterButton(){
		return element(by.css('.register-button'));
	}

	getEmailField(){
		return element(by.css('.register-form .email-input input'));
	}

	getUsernameField(){
		return element(by.css('.register-form .username-input input'));
	}

	getPasswordField(){
		return element(by.css('.register-form .password-input input'));
	}
  
	getConfirmPasswordField(){
		return element(by.css('.register-form .confirm-password-input input'));
	}

}