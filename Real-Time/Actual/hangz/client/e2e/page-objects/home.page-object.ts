import { browser, protractor, element, by, ElementFinder } from 'protractor';
import { AppPageObject } from './app.page-object';

export class HomePageObject {

	appPage = new AppPageObject();

	browseToPage(){

		browser.get('');

		browser.wait(protractor.ExpectedConditions.urlContains('home'));

		this.appPage.waitForBackdrop();
		this.appPage.waitForClickBlock();

	}

	getTabs(){
		return element.all(by.css('.tab-button'));
	}

	getSelectedTabIcon(){
		return element(by.css('[aria-selected="true"] ion-icon'));
	}

	getLogoutButton(){
		return element(by.css('.logout-button'));
	}

}