import { ProfilePage } from './../profile/profile';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert,AlertController, LoadingController ,Loading} from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 private load :Loading;
  email:string;
  password:string;

  constructor(public navCtrl: NavController, private googlePlus:GooglePlus, private loadingCTR: LoadingController,
    private alertCTR: AlertController, private authPROV: AuthProvider) {
    }
    signIN(){
      let loader = this.loadingCTR.create({
        content: 'Please wait'
      })
    if(!this.email && !this.password){
      console.log('error');
    }else{
      this.authPROV.signIn(this.email,this.password)
      .then(authPROV =>{
        loader.dismiss().then(()=>{
          this.navCtrl.setRoot(ProfilePage);
        })
      },error=>{
        loader.dismiss().then(()=>{
          const alert :Alert = this.alertCTR.create({
            message:error.message,
            buttons:[{
              text:'ok',
              role:'cancel'}]
          })
          alert.present();
        })
      })
   
    }
    
    }
    passwordreset(){
     
    }
    login(){
      let loader = this.loadingCTR.create({
        content: 'Please wait'
      })
    this.googlePlus.login({
      'webClientId':'59301933655-0lbp5af7i2s826pigms0hqco92vu89oh.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc=>{
        loader.dismiss();
        alert("Login success");
        this.navCtrl.setRoot(ProfilePage);
      }).catch(ns=>{
        loader.dismiss();
        alert("Not success")
      })
    })

  }
  signUp(){
    this.navCtrl.push(ProfilePage);
   }

}
