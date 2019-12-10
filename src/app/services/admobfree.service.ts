import { Injectable } from "@angular/core";
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';


@Injectable()
export class AdmobFreeService {

  // Interstitial Ad's Configurations
  // add your config here
  // for the sake of this example we will just use the test config
  // isTesting: true,
  // id: "ca-app-pub-3940256099942544/1033173712", // test id
  interstitialConfig: AdMobFreeInterstitialConfig = {
    autoShow: false,
    id: "ca-app-pub-2182088789443424/4312094961"
  };

  // Reward Video Ad's Configurations
  // RewardVideoConfig: AdMobFreeRewardVideoConfig = {
  //   isTesting: true, // Remove in production
  //   autoShow: false// ,
  //   // id: "ca-app-pub-3940XXXXXXX42544/6300978111"
  // };

  constructor(private admobFree: AdMobFree,
    public platform: Platform) {

    platform.ready().then(() => {

      if (this.platform.is('android')) {
        // Load ad configuration
        this.admobFree.interstitial.config(this.interstitialConfig);
        // Prepare Ad to Show
        this.admobFree.interstitial.prepare()
          .then(() => {
            // console.log(1);
          }).catch(e => console.log(e));


        // // Load ad configuration
        // this.admobFree.rewardVideo.config(this.RewardVideoConfig);
        // // Prepare Ad to Show
        // this.admobFree.rewardVideo.prepare()
        //   .then(() => {
        //     // console.log(2);
        //   }).catch(e => console.log(e));
      }

    });
    // Handle interstitial's close event to Prepare Ad again
    this.admobFree.on('admob.interstitial.events.CLOSE').subscribe(() => {
      this.admobFree.interstitial.prepare()
        .then(() => {
          console.log("Interstitial CLOSE");
        }).catch(e => console.log(e));
    });
  }



    // Handle Reward's close event to Prepare Ad again
    //   this.admobFree.on('admob.rewardvideo.events.CLOSE').subscribe(() => {
    //     this.admobFree.rewardVideo.prepare()
    //       .then(() => {
    //         console.log("Reward Video CLOSE");
    //       }).catch(e => console.log(e));
    //   });
    // }


    // bannerAtTop: false,
    // isTesting: true, // Remove in production
    // id: "ca-app-pub-3940256099942544/6300978111", //test id
    BannerAd(){
      
      let bannerConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        id: "ca-app-pub-2182088789443424/3823303516",
      };

      this.admobFree.banner.config(bannerConfig);

      console.log("inside banner ad");

      this.admobFree.banner.prepare().then(() => {
        console.log("banner ad success");
      }).catch(e => console.log(e));

    }

    InterstitialAd() {
      // Check if Ad is loaded
      this.admobFree.interstitial.isReady().then(() => {
        // Will show prepared Ad
        this.admobFree.interstitial.show().then(() => {
        }).catch(e => console.log("show " + e));
      })
        .catch(e => console.log("isReady " + e));
    }

    // RewardVideoAd() {
    //   // Check if Ad is loaded
    //   this.admobFree.rewardVideo.isReady().then(() => {
    //     // Will show prepared Ad
    //     this.admobFree.rewardVideo.show().then(() => {
    //     })
    //       .catch(e => console.log("show " + e));
    //   })
    //     .catch(e => console.log("isReady " + e));
    // }


  }
