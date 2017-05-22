import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { TermsPage } from '../terms/terms';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
    // Toast messages
    toastErrorInvalid: string;
    toastCanLogin: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        translate: TranslateService
    ) { 
        translate.get('TOAST_ERROR_INVALID').subscribe(val => { this.toastErrorInvalid = val; })
        translate.get('TOAST_CAN_LOGIN').subscribe(val => { this.toastCanLogin = val; })
    }

    openTermsModal = () => {
        this.modalCtrl.create(TermsPage).present();
    }

    toastPopup = (message, position, className) => {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: position,
            cssClass: className
        });
        toast.present();
    }

    register = () => {
        if ((<HTMLInputElement>document.querySelector('page-register input[type="email"]')).value == '') {
            this.toastPopup(this.toastErrorInvalid, 'bottom', 'red');
            (<HTMLElement>document.querySelector('page-register ion-input[type="email"]')).classList.add('invalid');
            setTimeout(function () {
                (<HTMLElement>document.querySelector('page-register ion-input[type="email"]')).classList.remove('invalid');
            }, 2000);
        } else {
            this.toastPopup(this.toastCanLogin, 'bottom', 'green');
            this.navCtrl.pop();
        }
    }
}
