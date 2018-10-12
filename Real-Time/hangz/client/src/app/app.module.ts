import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { DataProvider } from '../providers/data/data';
import { NoticesProvider } from '../providers/notices/notices';
import { ChatProvider } from '../providers/chat/chat';
import { UserProvider } from '../providers/user/user';
import { AuthProvider } from '../providers/auth/auth';

import { EmailValidator } from '../validators/email';
import { UsernameValidator } from '../validators/username';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
      preloadModules: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsernameValidator,
    EmailValidator,
    NoticesProvider,
    DataProvider,
    ChatProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider
  ]
})
export class AppModule {}
