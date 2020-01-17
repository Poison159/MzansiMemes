import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private facebook: Facebook,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkFacebookStatus();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkFacebookStatus() {
    if (this.platform.is('cordova')){
      this.facebook.getLoginStatus().then(res => {
        if (res.status === 'connected'){
            this.router.navigate(['tabs']);
        } else {
            this.router.navigate(['log-in']);
        }
      });
    }
  }
}
