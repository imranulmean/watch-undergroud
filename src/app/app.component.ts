import { Component, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController, IonRouterOutlet, ModalController, MenuController, PopoverController, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})


export class AppComponent {

  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  /* get a reference to the used IonRouterOutlet 
  assuming this code is placed in the component
  that hosts the main router outlet, probably app.components */
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  public subMenu = { open: false };
  subRoutes: any = [];
  randomHome: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private router: Router,
    private toast: Toast,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private popoverCtrl: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    private location: Location,
    private navCtrl: NavController,private appUpdate: AppUpdate,private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();

    // Initialize BackButton Eevent.
    this.backButtonEvent();
    this.subRoutes = [
      // {routeName:"প্রথম পাতা", routeOption:"/home/0",logo:"../assets/img/menu-icons/prothom-pata.svg"},
      { routeName: "বাংলাদেশ", routeOption: "/home/2", logo: "../assets/img/menu-icons/bangladesh.svg" },
      { routeName: "রাজনীতি", routeOption: "/home/3", logo: "../assets/img/menu-icons/politics.svg" },
      { routeName: "আন্তর্জাতিক", routeOption: "/home/4", logo: "../assets/img/menu-icons/international.svg" },
      { routeName: "অর্থনীতি", routeOption: "/home/5", logo: "../assets/img/menu-icons/economy.svg" },
      { routeName: "পুঁজিবাজার", routeOption: "/home/6", logo: "../../../assets/img/menu-icons/others.svg" },
      { routeName: "খেলা", routeOption: "/home/7", logo: "../assets/img/menu-icons/game.svg" },
      { routeName: "বিনোদন", routeOption: "/home/8", logo: "../assets/img/menu-icons/buzz.svg" },
      { routeName: "বিজ্ঞান-প্রযুক্তি", routeOption: "/home/9", logo: "../assets/img/menu-icons/science.svg" },
      { routeName: "জীবনযাপন", routeOption: "/home/10", logo: "../assets/img/menu-icons/lifestyle.svg" },
      { routeName: "শিক্ষা", routeOption: "/home/11", logo: "../assets/img/menu-icons/education.svg" },
      { routeName: "আপরাধ জগত", routeOption: "/home/12", logo: "../assets/img/menu-icons/crime.svg" },
      { routeName: "শিল্প-সাহিত্য", routeOption: "/home/13", logo: "../assets/img/menu-icons/literature.svg" },
      { routeName: "বিচিত্র", routeOption: "/home/14", logo: "../assets/img/menu-icons/bichitro.svg" },
      { routeName: "ব্যবসা-বাণিজ্য", routeOption: "/home/15", logo: "../assets/img/menu-icons/business.svg" },
      { routeName: "রাশিফল", routeOption: "/home/16", logo: "../assets/img/menu-icons/horoscope.svg" },
    ];
  }
  openHome() {
    let rHome = "random" + Math.random();
    this.navCtrl.navigateRoot('home/' + rHome);
  }
  openMenuList() {

    if (!this.subMenu.open) {
      this.subMenu.open = true;
      document.getElementById('menuList').style.height = '17em';
    }
    else {
      document.getElementById('menuList').style.height = '0';
      this.subMenu.open=false;
    }


  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.setupPush();
      }
      if (window.statusbar) {
        this.statusBar.hide();
      }
    });
  }

  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('6745c71c-c561-48c1-bccd-7bfc6152b6f4', '992140138467');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      const msg = data.payload.body;
      const title = data.payload.title;
      const additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {

      // Just a note that the data is a different place here!
      const additionalData = data.notification.payload.additionalData;
      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    });
    alert.present();
  }


  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      // this.openHome();
      // close action sheet
      // try {
      //     const element = await this.actionSheetCtrl.getTop();
      //     if (element) {
      //         element.dismiss();
      //         return;
      //     }
      // } catch (error) {
      // }

      // // close popover
      // try {
      //     const element = await this.popoverCtrl.getTop();
      //     if (element) {
      //         element.dismiss();
      //         return;
      //     }
      // } catch (error) {
      // }

      // // close modal
      // try {
      //     const element = await this.modalCtrl.getTop();
      //     if (element) {
      //         element.dismiss();
      //         return;
      //     }
      // } catch (error) {
      //     console.log(error);

      // }

      // // close side menua
      // try {
      //     const element = await this.menu.getOpen();
      //     if (element) {
      //         this.menu.close();
      //         return;

      //     }

      // } catch (error) {

      // }

      // this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
      //     if (outlet && outlet.canGoBack()) {
      //         outlet.pop();

      //     } else if (this.router.url === '/home') {
      //         if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
      //             // this.platform.exitApp(); // Exit from app
      //             navigator['app'].exitApp(); // work in ionic 4

      //         } else {
      //             this.toast.show(
      //                 `Press back again to exit App.`,
      //                 '2000',
      //                 'center')
      //                 .subscribe(toast => {
      //                     // console.log(JSON.stringify(toast));
      //                 });
      //             this.lastTimeBackPress = new Date().getTime();
      //         }
      //     }
      // });
    });
  }


}// end of class
