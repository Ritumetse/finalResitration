import { Camera} from '@ionic-native/camera';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { ProfileProvider } from '../providers/profile/profile';
import { ProfilePage } from '../pages/profile/profile';



const  config = {
  apiKey: "AIzaSyDyPQG1xySyeD3cmOH-CaT9-9MpIr47jKE",
  authDomain: "regauth-19735.firebaseapp.com",
  databaseURL: "https://regauth-19735.firebaseio.com",
  projectId: "regauth-19735",
  storageBucket: "regauth-19735.appspot.com",
  messagingSenderId: "59301933655"
};
firebase.initializeApp(config)

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Camera,
    ProfileProvider,

  ]
})
export class AppModule {}
