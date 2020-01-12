import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isLoggedIn = false;
  user = { id: '', name: '', email: '', picture: '' };
  constructor(private fb: Facebook) {
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if (res.status === 'connect') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
    }
    fbLogin() {
      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then(res => {
          if (res.status === 'connected') {
            this.isLoggedIn = true;
            this.getUserDetail(res.authResponse.userID);
          } else {
            this.isLoggedIn = false;
          }
        })
        .catch(e => console.log('Error logging into Facebook', e));
    }
    getUserDetail(userid: any) {
      this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
        .then(res => {
          console.log(res);
          this.user = res;
        })
        .catch(e => {
          console.log(e);
        });
    }
    logout() {
      this.fb.logout()
        .then( res => this.isLoggedIn = false)
        .catch(e => console.log('Error logout from Facebook', e));
    }
}
