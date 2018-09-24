import { browser } from 'protractor';
import { ChatPageObject } from './page-objects/chat.page-object';

describe('Chats', () => {

	let chatsPage: ChatPageObject;

	beforeEach(() => {

		chatsPage = new ChatPageObject();
		chatsPage.browseToPage();

	});

	it('should display a list of chats on the page', () => {

		expect<any>(chatsPage.getChatListItems().count()).toBeGreaterThan(0);

	});

	it('after adding a new chat, it should be displayed at the bottom of the chats list', () => {

		chatsPage.getChatMessageField().sendKeys('hello there');
		chatsPage.getSendChatButton().click();

		expect(chatsPage.getChatListItems().last().getText()).toContain('hello there');

	});

});