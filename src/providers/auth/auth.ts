import { Injectable,NgZone  } from '@angular/core';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth';

import { GooglePlus} from '@ionic-native/google-plus';

@Injectable()
export class AuthProvider {

afireauth:any;
nativepath: any;
firestore = firebase.storage();

constructor(private googlePlus:GooglePlus) {
 console.log('Hello AuthProvider Provider');


}

resetPassword(email:string):Promise<any>{
 return firebase.auth().sendPasswordResetEmail(email);

}

 signIn(email:string,password:string):Promise<any>{
 return firebase.auth().signInWithEmailAndPassword(email,password);
}



signOut():Promise<any>{
 const userId:string = firebase.auth().currentUser.uid;
 firebase.database().ref(`userProfile/${userId}`).off();
 return firebase.auth().signOut();
}


signUp(email:string,password:string):Promise <any>{
 return firebase.auth().createUserWithEmailAndPassword(email,password)
 .then(newUserCreds=>{
   firebase.database().ref(`/userProfile/${newUserCreds.user.uid}/email`)
 .set(email);
 }).catch(error=>{
   throw new error (error);
 })


}



updateimage(imageurl) {

       var promise = new Promise((resolve, reject) => {
           this.afireauth.auth.currentUser.updateProfile({
               displayName: this.afireauth.auth.currentUser.displayName,
               photoURL: imageurl
           }).then(() => {
               firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
               displayName: this.afireauth.auth.currentUser.displayName,
               photoURL: imageurl,
               uid: firebase.auth().currentUser.uid
               }).then(() => {
                   resolve({ success: true });
                   }).catch((err) => {
                       reject(err);
                   })
           }).catch((err) => {
                 reject(err);
              })
       })
       return promise;
   }
  }