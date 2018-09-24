import { protractor, browser } from 'protractor';
import { NoticesPageObject } from './page-objects/notices.page-object';
import { AppPageObject } from './page-objects/app.page-object';

describe('Notices', () => {

	let noticesPage: NoticesPageObject;
	let appPage: AppPageObject;

	beforeEach(() => {

		noticesPage = new NoticesPageObject();
		appPage = new AppPageObject();

		noticesPage.browseToPage();

	});

	it('should display a list of notices on the page', () => {

		browser.driver.sleep(200);

		expect<any>(noticesPage.getNoticeListItems().count()).toBeGreaterThan(0);

	});

	it('should allow the user to launch the add notice page', () => {

		noticesPage.getAddNoticeButton().click();

		expect<any>(noticesPage.getModal().isDisplayed()).toBeTruthy();

	});

	it('should allow the user to close the add notice page', () => {

		noticesPage.getAddNoticeButton().click();

		appPage.waitForClickBlock();

		noticesPage.getCloseButton().click();

		appPage.waitForClickBlock();

		expect<any>(noticesPage.getModal().isPresent()).toBeFalsy();

	});

	it('after adding a new notice, it should be displayed at the top of the notices list', () => {

		noticesPage.getAddNoticeButton().click();

		appPage.waitForClickBlock();

		noticesPage.getTitleField().sendKeys('test title');
		noticesPage.getSaveButton().click();

		appPage.waitForClickBlock();

		expect(noticesPage.getNoticeListItems().first().getText()).toContain('test title');

	});

	it('after editing a notice, the new information should be displayed in the list', () => {

		noticesPage.getAddNoticeButton().click();

		appPage.waitForClickBlock();

		noticesPage.getTitleField().sendKeys('test title');
		noticesPage.getSaveButton().click();

		appPage.waitForClickBlock();

		noticesPage.getEditNoticeButton().click();

		appPage.waitForClickBlock();

		noticesPage.getTitleField().sendKeys('edit!');
		noticesPage.getSaveButton().click();

		appPage.waitForClickBlock();

		expect(noticesPage.getNoticeListItems().first().getText()).toContain('edit!');

	});

	it('after deleting a notice, it should no longer be displayed in the list', () => {

		noticesPage.getAddNoticeButton().click();

		appPage.waitForClickBlock();

		noticesPage.getTitleField().sendKeys('delete test');
		noticesPage.getSaveButton().click();

		appPage.waitForClickBlock();

		let countBefore;
	
		noticesPage.getNoticeListItems().count().then((count) => {

			countBefore = count;

			let deleteNoticeButton = noticesPage.getDeleteNoticeButton();

			deleteNoticeButton.click();
		
			appPage.waitForClickBlock();

			noticesPage.getConfirmDeleteNoticeButton().click();

			appPage.waitForClickBlock();

			expect<any>(noticesPage.getNoticeListItems().count()).toBeLessThan(countBefore);		

		});

	});

});