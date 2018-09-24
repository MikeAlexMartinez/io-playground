import { Observable } from 'rxjs/Observable';

export class NoticesProviderMock {

	public init(): void {}

	public saveNotice(data: any): void {}

	public deleteNotice(data: any): void {}

	public getNotices(): any {
		return Observable.of([{title: 'hello'}])
	}

}

export class ChatProviderMock {

	public init(): void {}

	public addChat(data: any): void {}

	public getChats(): any {
		return Observable.of([{title: 'hello'}])
	}

}

export class DataProviderMock {

	public db: any = {
		query(): any {},
		destroy(): any {}
	}

	public initDatabase(remote: string): void {}

	public createDoc(doc: any): void {}	

	public updateDoc(doc: any): void {}

	public deleteDoc(doc: any): void {}

}

export class UserProviderMock {

	public currentUser: any = {
		user_id: 'test'
	}

	public saveUserData(data: any): void {}	

	public getUserData(): any {}

}

export class AuthProviderMock {

	public authenticate(credentials: any): any {}	

	public reauthenticate(credentials: any): any {
		return Promise.resolve(true);
	}	

	public logout(): any {}

	public register(details: any): any {}

	public validateUsername(username: any): any {}

	public validateEmail(email: any): any {}

}