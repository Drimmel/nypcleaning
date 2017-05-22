import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from '@ngx-translate/core';

import { LoginPage } from '../pages/account/login/login';
import { MenuOverviewPizzaPage } from '../pages/menu/menu-overview-pizza/menu-overview-pizza';

// Providers
import { CategoryProvider } from '../providers/category-provider';
import { ReceiptProvider } from '../providers/receipt-provider';

@Component({
    templateUrl: 'app.html',
    providers: [CategoryProvider, ReceiptProvider, StatusBar]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // Declaring variables
    rootPage = LoginPage;
    activePage: any;
    pages: Array<{ title: string, component: any, apiUrl: any }>;
    public categoryData: any;
    public receipt: any;
    public receiptTotal: any;
    shoppingcartEmptyTitle: string;
    shoppingcartEmptyText: string;
    shoppingcartEmptyConfirm: string;

    constructor(
        public platform: Platform,
        translate: TranslateService,
        public categoryProvider: CategoryProvider,
        public receiptProvider: ReceiptProvider,
        public alertCtrl: AlertController,
        public statusBar: StatusBar
    ) {
        translate.setDefaultLang('nl');

        // Getting some translations
        translate.get('SHOPPINGCART_EMPTY_TITLE').subscribe(val => { this.shoppingcartEmptyTitle = val; })
        translate.get('SHOPPINGCART_EMPTY_TEXXT').subscribe(val => { this.shoppingcartEmptyText = val; })
        translate.get('SHOPPINGCART_EMPTY_CONFIRM').subscribe(val => { this.shoppingcartEmptyConfirm = val; })

        // check if platform is finished loading
        platform.ready().then(() => {
            StatusBar.styleDefault();

            this.getData();

            this.pages = [
                { title: "Pizza", component: MenuOverviewPizzaPage, apiUrl: "" }
                //{ title: "Hamburger", component: MenuOverviewOthersPage, apiUrl: "./assets/jsonData/hamburger.json" },
               // { title: "Pasta", component: MenuOverviewOthersPage, apiUrl: "./assets/jsonData/pasta.json" },
               // { title: "Acties", component: ActiesPage, apiUrl: "" }
            ];
            this.activePage = this.pages[0];

            // Get the receipt information
            this.receipt = receiptProvider.receipt;
            this.receiptTotal = receiptProvider.receiptTotal;

            // Set timeout on the splashscreen
            // So there's no white flash before the first view
            setTimeout(function () {
                Splashscreen.hide();
            }, 500);

        });
    }

    getData = () => {
        this.categoryProvider.getJsonData().subscribe(
            result => {
                this.categoryData = result;
            },
            err => {
                console.error("Error : " + err);
            },
            () => {
                //data completed
            }
        );
    }

    openCategoryMenu = (p) => {
        this.nav.setRoot(p.component, {
            categoryName: p.title,
            apiUrl: p.apiUrl
        });
        this.activePage = p;
    }

    checkActive = (page) => {
        return page == this.activePage;
    }
}
