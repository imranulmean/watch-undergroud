import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AdmobFreeService } from 'src/app/services/admobfree.service';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Channel, AllChannelService } from '../../services/all-channel.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { ModalController } from '@ionic/angular';
import { ExampleModalPage } from '../example-modal/example-modal.page';
@Component({
	selector: 'app-livetv',
	templateUrl: './livetv.page.html',
	styleUrls: ['./livetv.page.scss'],
})
export class LivetvPage implements OnInit {

	// http://tv.bdixsports.com/
	// http://fomny.com/Video/USA/04/HBO/HBO.php
	// http://cdn.crichd.to/embed2.php?id=sonysix
	// http://crichd.ws/update/skys2.php
  	// https://www.youtube.com/watch?v=256XTt0pVuA

	// https://ustreamix.su/stream.php?id=sky-sports-cricket&token=ff1-035-e45-09a-646-ba8-15e-eb3-fef-f8a-66
	// SKY SPORTS CRICKET:http://crichd.ws/update/skys2.php
	//Sony Six:http://free.crichd.online/embed2.php?id=sonysix
	// PTV Sports:http://crichd.ws/update/ptv.php  
	// { channelName: 'SONY SAB', url: 'http://216.144.250.174/S0ny_Sab_HD/playlist.m3u8', logo: 'https://image3.mouthshut.com/images/imagesp/925002091s.jpeg'},
// 		channelName: "Server 4"
// url: "http://www.freecast123.com/cricsp.php?player=desktop&live=bbtsp3&vw=100%&vh=1000"
// videoPlayer: "n"
	
	showSegment: number = 1;
 	 updateUrl = 'https://raw.githubusercontent.com/livetvappbd/livetv-version/master/version.xml';
  	showUpdateButton:number=0;
  	channelsGang: Channel[];
  	featuredGang: Channel[];

	constructor(private admob: AdmobFreeService,
		private iab: InAppBrowser,
		private httpClient: HttpClient,
		private appUpdate: AppUpdate,
		private platform: Platform,
		private channelService: AllChannelService,
    	public loadingController: LoadingController,
    	private streamingMedia: StreamingMedia,public modalController: ModalController
    	) {

		this.platform.ready().then(() => {
			this.admob.BannerAd();
		});

		this.showAutoHideLoader();	
	    this.appUpdate.checkAppUpdate(this.updateUrl).then((update) => 
	    	{
		        // alert(JSON.stringify(update)); 
		        if(update['code']===201){
	           		this.showUpdateButton=1; 
	        }
	      });    
	}

	 async openModal(featureObject) {
	 	this.showInterstitial();
	    const modal = await this.modalController.create({
	      component: ExampleModalPage,
	      componentProps: {
	        "featureObject": featureObject
	      }
	    });
	 
	    modal.onDidDismiss().then((dataReturned) => { });
	 
	    return await modal.present();
	  }	

	showAutoHideLoader() {
			this.loadingController.create({
			spinner: 'crescent',
			cssClass: 'loader',
			// duration: 1000
			}).then((res) => {

				res.present();

				this.channelService.getChannels().subscribe(res => {
					this.channelsGang = res;
					this.loadingController.dismiss();
					console.log(this.channelsGang);
				});	
				this.channelService.getFeaturedGames().subscribe(res => {
					this.featuredGang = res;
					//this.loadingController.dismiss();
					console.log(this.featuredGang);
				});

				res.onDidDismiss().then((dis) => {
				});
			});
		}	

	goToChannel(url,outside,insidePlayer) {
			this.showInterstitial();
			this.channelService.goToChannel(url,outside,insidePlayer);
	}

	getUpdate() {
			////////////////////////
			// alert("hola");
	    // code:201, msg:"success, need update"
	    // code:202, msg:"success, up to update"

			this.appUpdate.checkAppUpdate(this.updateUrl).then((update) => 
			{
			// alert(JSON.stringify(update)); 
			this.showUpdateButton=0;
			});
			///////////////////////////
	}

	ngOnInit() {

	}

	showInterstitial() {
		this.admob.InterstitialAd();
	}

}
