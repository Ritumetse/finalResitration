import { HomePage } from './../home/home';
import { ProfileProvider } from './../../providers/profile/profile';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController,Alert } from 'ionic-angular';
import { Camera , CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private load:Loading;
  picurl:any;
  picdata:any;
  mypicref:any;
  base64Image:any;
  photos=[0];
  firstname:string='';
  lastname:string='';

  constructor(public navCtrl: NavController,private profileProvider:ProfileProvider, private camera:Camera, private loadingCTR: LoadingController,
    private alertCTR: AlertController, private authPROV: AuthProvider) {
      this.mypicref=firebase.storage().ref('/')
    }
    updateName(firstname,lastname){
      this.profileProvider.updateName(this.firstname,this.lastname);
    }
    submit(){
      if(this.firstname==='' || this.lastname===''){
        const alertName:Alert =this.alertCTR.create({
          subTitle:'Please provide your names in full',
          buttons:[{
              text:'Cancel',
              role:'cancel'
            },
            {
              text:'ok',
              handler:data=>{
                
              }
            }]
          })
        alertName.present();
      }
      else{
        this.updateName(this.firstname,this.lastname);
        alert('Thank you! profile successfully setup..');
        this.navCtrl.setRoot(LoginPage);
      }
        
    }
    logout() {
      this.authPROV.signOut().then(() => {
        this.navCtrl.setRoot(LoginPage);
      });
  
    }
    cameraPhoto(){
      const options : CameraOptions = {
        quality:50, // picture quality
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum:true
      }
      this.camera.getPicture(options) .then((imageData) => {
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          console.log(err);
        });
    }
    galleryPhoto(){
      const options : CameraOptions = {
        quality:50, // picture quality
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM
         
      }
      this.camera.getPicture(options) .then((imageData) => {
          this.picdata = imageData;
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          console.log(err);
        });
    }
    upload(){
      let loader = this.loadingCTR.create({
        content: 'Please wait'
      })
      loader.present();
      this.mypicref.child(this.uid())
      .putString(this.picdata,'base64',{contentType:'image/png'})
      .then(savepic=>{
        this.picurl=savepic.downloadURL
        setTimeout(() => {
          loader.dismiss();
        }, 5000);
        if(this.picurl!==''){
          loader.dismiss().then(()=>{
            alert('Picture was successfully uploaded')
          });
        
        }
      })
    }
    uid() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }
    save(){
      this.navCtrl.setRoot(HomePage)
    }
  }