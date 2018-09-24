import { protractor, browser, element, by, ElementFinder } from 'protractor';
import { HomePageObject } from './home.page-object';

export class NoticesPageObject {

	homePage: HomePageObject = new HomePageObject();

	browseToPage(){

		this.homePage.browseToPage();

	}

	getNoticeListItems(){
		return element.all(by.css('.notice-list .notice-cards'));
	}
 
	getAddNoticeButton(){
		return element(by.css('.add-notice-button'));
	}

	getEditNoticeButton(){
		return element(by.css('.edit-notice-button'));
	}

	getDeleteNoticeButton(){
		return element(by.css('.delete-notice-button'));
	}

	getConfirmDeleteNoticeButton(){
		return element(by.css('.alert-button-group button'));
	}

	getSaveButton(){
		return element(by.css('.save-notice-button'));
	}

	getTitleField(){
		return element(by.css('.title-input input'));
	}

	getCloseButton(){
		return element(by.css('page-add-notice .close-modal-button'))
	}

	getModal(){
		return element(by.css('ion-modal page-add-notice'));
	}
 
}