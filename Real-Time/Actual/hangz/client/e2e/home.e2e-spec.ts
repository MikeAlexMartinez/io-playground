import { browser } from 'protractor';
import { HomePageObject } from './page-objects/home.page-object';

describe('Home', () => {
	
	let homePage: HomePageObject;

	beforeEach(() => {

		homePage = new HomePageObject();
		homePage.browseToPage();

	});

	it('should display two tabs', () => {
		expect<any>(homePage.getTabs().count()).toBe(2);
	});

	it('should have the notices tab selected by default', () => {
		expect<any>(homePage.getSelectedTabIcon().getAttribute('ng-reflect-name')).toBe('clipboard');
	});

});