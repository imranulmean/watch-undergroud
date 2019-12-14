import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AdmobFreeService } from 'src/app/services/admobfree.service';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Channel, AllChannelService } from '../../services/all-channel.service';

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

	
	showSegment: number = 1;
 	 updateUrl = 'https://raw.githubusercontent.com/livetvappbd/livetv-version/master/version.xml';
  	showUpdateButton:number=0;
  	channelsGang: Channel[];

	constructor(private admob: AdmobFreeService,
		private iab: InAppBrowser,
		private httpClient: HttpClient,
		private appUpdate: AppUpdate,
		private platform: Platform,
		private channelService: AllChannelService,
    	public loadingController: LoadingController) {

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
			res.onDidDismiss().then((dis) => {
			});
	    });
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

	goToChannel(url,outside) {
		this.showInterstitial();
	    if(!outside){
	        this.iab.create(url, '_self', 'location=no');
	    }
	    else{
	      window['plugins'].webintent.startActivity({
	              action: window['plugins'].webintent.ACTION_VIEW,
	              url:  "googlechrome://navigate?url="+url
	          },
	          function() {},
	          function() {
	              alert('Failed to open URL via Android Intent.');
	            console.log("Failed to open URL via Android Intent.")
	          });       
	    }
	}

	// segmentChanged(ev: any) {
	// 	console.log('Segment changed', ev.detail.value);
	// 	this.showSegment = ev.detail.value;
	// 	this.showSegment == 1 ? document.getElementById("ionContentLive").style.setProperty('--background', '#f1f1f1') : document.getElementById("ionContentLive").style.setProperty('--background', '#ffffff');
	// 	this.goToSegment();
	// }

	// goToSegment() {
	// 	if (this.showSegment == 1) {
	// 		this.tv_newspapers = this.tvChannels;
	// 	}
	// 	else if (this.showSegment == 2) {
	// 		this.tv_newspapers = this.indiaChannel;
	// 	}
	// 	else if (this.showSegment == 3) {
	// 		this.tv_newspapers = this.sportsChannel;
	// 	}
	// 	let nextButtonNumber: number = this.showSegment;
	// 	document.getElementById(String(nextButtonNumber)).click();
	// 	let buttonWidth = document.getElementById(String(nextButtonNumber)).offsetWidth;
	// 	document.getElementById('segment').scrollLeft = nextButtonNumber * buttonWidth - buttonWidth;
	// }
	// swipeLeftPress($event) {
	// 	this.showSegment = Number(this.showSegment) + 1;
	// 	this.goToSegment();

	// }


	// swipeRightPress($event) {
	// 	this.showSegment = Number(this.showSegment) - 1;
	// 	this.goToSegment();
	// }

	ngOnInit() {

	}

	showInterstitial() {
		this.admob.InterstitialAd();
	}

}
