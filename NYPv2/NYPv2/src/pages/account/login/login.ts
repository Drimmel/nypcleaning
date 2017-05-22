import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { MenuOverviewPizzaPage } from '../../menu/menu-overview-pizza/menu-overview-pizza';
import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    // Pages for [navPush]=" {PageName} "
    registerPage: any;
    resetPasswordPage: any;

    // Translations
    toastErrorNoMailPw: string;
    toastWelcome: string;
    toastErrorWrong: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public translate: TranslateService
    ) {
        this.registerPage = RegisterPage;
        this.resetPasswordPage = ResetPasswordPage;

        // Get toast messages
        translate.get('TOAST_ERROR_NO_EMAIL_PASSWORD').subscribe(val => { this.toastErrorNoMailPw = val; })
        translate.get('TOAST_WELCOME_BACK').subscribe(val => { this.toastWelcome = val; })
        translate.get('TOAST_ERROR_WRONG_EMAIL_PASSWORD').subscribe(val => { this.toastErrorWrong = val; })
    }

    // Sets the menu page as root page of the app
    goToMenu = () => {
        this.navCtrl.setRoot(MenuOverviewPizzaPage);
    }

    // Show toast
    toastPopup = (message, position, className) => {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: position,
            cssClass: className
        });
        toast.present();
    }

    login = () => {
        let emailVal = (<HTMLInputElement>document.querySelector('page-login input[type="email"]'));
        let pwVal = (<HTMLInputElement>document.querySelector('page-login input[type="password"]'));

        if (emailVal.value == '' && pwVal.value == '') {
            this.toastPopup(this.toastErrorNoMailPw, 'bottom', 'red');
            (<HTMLElement>document.querySelector('page-login ion-input[type="email"]')).classList.add('invalid');
            (<HTMLElement>document.querySelector('page-login ion-input[type="password"]')).classList.add('invalid');
            setTimeout(function () {
                (<HTMLElement>document.querySelector('page-login ion-input[type="email"]')).classList.remove('invalid');
                (<HTMLElement>document.querySelector('page-login ion-input[type="password"]')).classList.remove('invalid');
            }, 2000);
        } else if (emailVal.value == 'john@pizza.nl' && pwVal.value == 'dough') {
            this.toastPopup(this.toastWelcome + 'John Dough!', 'bottom', 'green');
            this.goToMenu();
        } else {
            this.toastPopup(this.toastErrorWrong, 'bottom', 'red');
            (<HTMLElement>document.querySelector('page-login ion-input[type="email"]')).classList.add('invalid');
            (<HTMLElement>document.querySelector('page-login ion-input[type="password"]')).classList.add('invalid');
            setTimeout(function () {
                (<HTMLElement>document.querySelector('page-login ion-input[type="email"]')).classList.remove('invalid');
                (<HTMLElement>document.querySelector('page-login ion-input[type="password"]')).classList.remove('invalid');
            }, 2000);
        }
    }
}
