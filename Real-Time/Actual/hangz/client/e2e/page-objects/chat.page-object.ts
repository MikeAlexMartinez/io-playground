import { protractor, browser, element, by, ElementFinder } from 'protractor';
import { HomePageObject } from './home.page-object';
import { AppPageObject } from './app.page-object';

export class ChatPageObject {

	homePage: HomePageObject = new HomePageObject();
	appPage: AppPageObject = new AppPageObject();

	browseToPage(){

		this.homePage.browseToPage();
		this.appPage.waitForBackdrop();
		this.appPage.waitForClickBlock();
		this.homePage.getTabs().last().click();
		this.appPage.waitForBackdrop();
		this.appPage.waitForClickBlock();

	}

	getChatListItems(){
		return element.all(by.css('.chat-list ion-item'));
	}

	getChatMessageField(){
		return element(by.css('.chat-input'));
	}

	getSendChatButton(){
		return element(by.css('.send-chat-button'));
	}

	getTitle(){
		return element(by.css('ion-title'));
	}
  
}