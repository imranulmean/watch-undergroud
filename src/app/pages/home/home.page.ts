import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { Observable } from 'rxjs';
import { IonContent } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

// import { AdmobFreeService } from '../../services/admobfree.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { IonSlides } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

declare var require: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSlides) slider: IonSlides;
  homeVisibleFlag: any = true;
  results = [];       // This is the array which contains category segment page getAllBangladeshPosts 
  allPosts = [];
  test = [];
  weather = [];
  jamunaTvYoutube = [];
  category: any = 'home';
  url: string;
  page = 1;
  
  resultFlag = true;
  
  lat = 0;
  long = 0;
  coords: any;
  temp: any;
  humidity: any;
  wind: any;
  speed: any;
  feelsLike: any;
  description: any;
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;
  yOffset: any;

  weatherIconUrl: any;
  weatherFlag: any = false;

  categories = ['704', '658', '729', '726'] // 704= jugantor, 658=bdnews24 729=bengal-beats, 726=prothom-alo
  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  routeInterval:any;
  constructor(
    private router: Router,
    private newsApi: NewsService,
    public event: Events,
    private iab: InAppBrowser,
    public loadingController: LoadingController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public platform: Platform,
    public toastController: ToastController,
    // private admobFreeService: AdmobFreeService,
    private route: ActivatedRoute,
    private openNativeSettings: OpenNativeSettings) {

    // this.home();
    this.showAutoHideLoader();
    this.event.publish('scrollToTop', this.content);
    // console.log(this.route.snapshot.paramMap.get('id'));
    if(this.route.snapshot.paramMap.get('id')!=null){

      if(this.route.snapshot.paramMap.get('id').includes("random")){
          this.clickToHome();
      }

      else{
       this.routeInterval= setInterval(() => {
          if(document.getElementById(String(this.route.snapshot.paramMap.get('id')))) {
            this.segmentWiseSwipe('left', this.route.snapshot.paramMap.get('id'));   
            clearInterval(this.routeInterval);         
          }
        }, 2000);           
      }
    }
      else{
        this.clickToHome();
      }
    setInterval(() => {
      this.refreshTime();
    }, 1000);



  }
  clickToHome(){
       this.routeInterval= setInterval(() => {
          if(document.getElementById(String(0))) {
            this.segmentWiseSwipe('left', 0);   
            clearInterval(this.routeInterval);         
          }
        }, 2000);     
  }
  ngOnInit() {
    // if (this.platform.is('cordova')) {
    //   this.admobFreeService.BannerAd();
    // }
  }

  //////////////////////// Imranul Hasan ///////////////////////
  nowTime;
  currentTab: any = 0;
  animationStart: any = 1;
  cricketTeams:any=[];
  tharmoIcon:any="";
   mainNewsArray:any=[];
   showAutoHide=true;
   pageNumber=1;
   showOtherSegments=false;
   showVideoNews=false;
   swipe_pull:any=true;

  refreshTime() {
    moment.locale('bn');
     this.nowTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    // this.nowTime =moment.unix(1568462657).format("MM/DD/YYYY, , h:mm:ss a");
  }

  openLocation(settings){
    this.openNativeSettings.open(settings).then(val=>
      {
        this.getGeolocation();
      }
    ).catch(err=>{
        alert(JSON.stringify(err));
    });
    
  }

  goToSegment(buttonNumber: number, side: string) {
    let nextButtonNumber = buttonNumber;
    let buttonWidth = document.getElementById(String(buttonNumber)).offsetWidth;

    document.getElementById(String(nextButtonNumber)).click();
    document.getElementById('segment').scrollLeft = nextButtonNumber * buttonWidth - buttonWidth;

  }
  animationDivContent() {
      let element = document.querySelector('ion-content#ionContent');
      if (this.animationStart == 1) {
        element.classList.add('animated', 'zoomInUp');
        element.addEventListener('animationend', () => {
        element.classList.remove('animated', 'zoomInUp');
        this.animationStart = 0;
        });
      }
  }
 animationDiv() {
  if (!document.getElementById("ionContent")) {
  let interval = setInterval(() => {
          if (document.getElementById("ionContent")) {
                clearInterval(interval);
                this.animationDivContent();
          }
        }, 10);
  } else {
      this.animationDivContent();
  }
 }
  segmentWiseSwipe(side: string, currentTab: any) {
       this.goToSegment(currentTab, side);
  }
  swipeLeftPress($event) {
    if (this.swipe_pull) {
      console.log('swipeLeftPress', $event);
      this.currentTab=this.currentTab+1;
      console.log('this.currentTab', this.currentTab)
      this.currentTab = (this.currentTab > 16 ? 0 : this.currentTab );
      this.segmentWiseSwipe('left', this.currentTab);
    }
  }
  swipeRightPress($event) {
    if (this.swipe_pull) {
      console.log('swipeRightPress', $event);
      this.currentTab=this.currentTab-1;
      this.currentTab = (this.currentTab < 0 ? 16 : this.currentTab);
      this.segmentWiseSwipe('right', this.currentTab);      
    }
  }

  panningLogic(side,h1){

    let bounding = h1.getBoundingClientRect();    
    if (side==="left") {
        if(bounding["right"]==document.getElementById('segment').offsetWidth){
          document.getElementById('segment').scrollLeft=0;
        }
    }
    if (side==="right") {
        if(bounding["left"]===0){
        let buttonWidth = document.getElementById('16').offsetWidth;
          document.getElementById('segment').scrollLeft = 16 * buttonWidth - buttonWidth;
        } 
    }    

  }
   panToFirstSeg($event) {
    // console.log($event);    
    if ($event["additionalEvent"]==="panleft") {
        let h1 = document.getElementById('16');
          this.panningLogic("left",h1);    
      }
    if ($event["additionalEvent"]==="panright") {
      let h1 = document.getElementById('0');
          this.panningLogic("right",h1);         
      }      
    }  
  
    fabMove($event,option){
      // console.log($event);
      // console.log("clientX",$event.changedTouches["0"].clientX,"clientY",$event.changedTouches["0"].clientY);
      if (option===1) {
        this.swipe_pull=false;
        let yPos=$event.changedTouches["0"].clientY+50;
        yPos=yPos-window.innerHeight;
        let xPos=$event.changedTouches["0"].clientX+50;
        xPos=xPos-window.innerWidth;
        console.log('xPos:',xPos,'yPos:',yPos);
        console.log('width:',-window.innerWidth,'Height:',-window.innerHeight);
         if(xPos-70>-window.innerWidth && (xPos)<0 &&(yPos-200)>-window.innerHeight && (yPos)<0){
           document.getElementById("fabButton").style.transform ='translate('+xPos+'px,'+yPos+'px)';
         }
      }
      else{
        this.swipe_pull=true;
      }
    }     

  //////////////////////// Imranul Hasan end ///////////////////////

  // Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.geoAccuracy = resp.coords.accuracy;
      this.weatherFlag = true;
      this.curentWeatherReport(this.geoLatitude, this.geoLongitude, this.geoAccuracy)
      // this.getGeoencoder(this.geoLatitude,this.geoLongitude);
    }).catch((error) => {
      this.toastMsg('Please ALLOW geolocation service', 2000);
      this.weatherFlag = false;
    });
  }

  /**
   *
   * @param lat
   * @param long
   * Calls the current weather api
   */
  curentWeatherReport(lat, long, accuracy) {
    this.newsApi.getweatherReport(lat, long, accuracy).subscribe(result => {
      this.temp = result['main'].temp;
        // this.temp = 12.05;
      this.humidity = result['main'].humidity;
      this.wind = result['wind'].speed;
      var icon = result['weather'][0].icon
      this.description = result['weather'][0].description
      
      let sunSet=result["sys"];
      let mainWatherCondition=result['weather'][0].main;
      if(mainWatherCondition=="Mist" || mainWatherCondition=="Smoke" || mainWatherCondition=="Dust" || mainWatherCondition=="Fog" || mainWatherCondition=="Sand" || mainWatherCondition=="Dust"|| mainWatherCondition=="Ash"|| mainWatherCondition=="Squall"|| mainWatherCondition=="Tornado")
          mainWatherCondition="Haze";
      // this.weatherIconUrl = 'http://openweathermap.org/img/w/' + icon + '.png'

      ///////////////////////////////////
      let now = moment();
    let currentHour = now.hour();
    let selectedImage="1.png";
    // selectedImage= currentHour<moment.unix(sunSet["sunset"]).hour() ? "1.png" : "2.png";
    this.tharmoIcon=this.temp>25 ? "../../../assets/weatherIcons/tharm/1.png" : "../../../assets/weatherIcons/tharm/2.png"
    // let morningImage="url(https://image.freepik.com/free-photo/fantastic-morning-sunrise-mountain-landscape-scenery-high-green-mountains_56644-27.jpg)";
    // let morningImage="url(https://wallup.net/wp-content/uploads/2016/01/70149-landscape-rock-old_building-748x468.jpg)";
    let morningImage="url(https://www.tibetexperience.com/wp-content/uploads/2017/10/IMG-20170903-WA0001.jpg)";
      
    let eveningImage="url(https://c.pxhere.com/photos/de/1d/architecture_building_business_city_cityscape_crowded_evening_illuminated-1364419.jpg!d)";
    let nightImage="url(https://data.whicdn.com/images/146867816/original.gif)";
    // currentHour=21;

   if (currentHour>=moment.unix(sunSet["sunrise"]).hour() && currentHour<moment.unix(sunSet["sunset"]).hour()){
    document.getElementById("weatherCard").style.backgroundImage =morningImage;
    selectedImage="1.png";
   }  

   else{
         console.log('moment.unix(sunSet["sunset"]).hour()',moment.unix(sunSet["sunset"]).hour());
     console.log('currentHour',currentHour);
      if (currentHour>=moment.unix(sunSet["sunset"]).hour() && currentHour<=moment.unix(sunSet["sunset"]).hour()+3)  {
        document.getElementById("weatherCard").style.backgroundImage =eveningImage;
       }
       else{
           document.getElementById("weatherCard").style.backgroundImage =nightImage;
       }    
        selectedImage="2.png";
   }
    this.weatherIconUrl = '../../../assets/weatherIcons/'+mainWatherCondition+"/"+selectedImage;
      ///////////////////////////////////////////
      const Feels = require('feels');
      const config = {
        temp: this.temp,
        humidity: this.humidity,
        speed: this.wind,
        units: {
          temp: 'c',
          speed: 'mps'
        }
      };

      this.feelsLike = new Feels(config).like();
      this.feelsLike = Math.floor(this.feelsLike);

    });
  }
  /**
   *
   * @param lat
   * @param long
   * Calls the jamuna tv youtube channel api
   */
   parseChannelNews(result){

      let lengthOfRes = Object.keys(result['items']).length;
      for (var i = 0; i < lengthOfRes; i++) {
      let id={
        videoId:result['items'][i].snippet.resourceId.videoId
      }; 
        result['items'][i].id=id;       
        this.jamunaTvYoutube.push(result['items'][i]);
      }    
   }
  getJamunaTvVideos() {

    this.newsApi.getjamunaTvYoutube().subscribe(result => {
      this.animationDiv();
      let lengthOfRes = Object.keys(result['items']).length;
      for (var i = 0; i < lengthOfRes; i++) {
        this.jamunaTvYoutube.push(result['items'][i])
      }
    });
    this.newsApi.getIndependentTvYoutube().subscribe(result => {
      this.parseChannelNews(result);
    });
    this.newsApi.getchannel24Youtube().subscribe(result => {
      this.parseChannelNews(result);
    });        
  }

  /**
   *
   * Infinite scroll for todays news section on home page
   */
  loadAllNews(event) {
    setTimeout(() => {
      this.getPosts(this.page);
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.resultFlag == false) {
        event.target.disabled = true;
      }
    }, 1500);
  }
 
  loadAllBangladeshNews(event,category1) {

   setTimeout(() => {
      this.loadAll_pullRefresh(category1,true);    
       event.target.complete();
        if (this.resultFlag == false) {
            event.target.disabled = true;
          }
        }, 1500);    
  }

  loadAll_pullRefresh(category1,infinite){  
        if(category1=="bangladesh"){
          if (infinite) {this.getBangladeshPosts();}
          else{this.bangladesh();} 
        }      
      else if(category1=="politics"){
          if (infinite) { this.getPoliticsPosts();}
          else{this.politics();}
        }
       else if(category1=="international"){
         if (infinite) { this.getInternationalPosts();}
          else{this.international();} 
        }
      else if(category1=="economy"){
         if (infinite) {this.getEconomyPosts();}
          else{this.economy();}        
        }
      else if(category1=="share"){
         if (infinite) {this.getShareMarketPosts();}
          else{this.share();}        
        }
      else if(category1=="sports"){
         if (infinite) {this.getSportsPosts();}
          else{this.sports();}        
        }
      else if(category1=="entertainment"){
         if (infinite) {this.getEntertainmentPosts();}
          else{this.entertainment();}        
        }
      else if(category1=="tech"){
         if (infinite) { this.getTechPosts();}
          else{this.tech();}        
        }
      else if(category1=="lifeStyle"){
         if (infinite) {this.getLifeStylePosts();}
          else{ this.lifeStyle();}      
        }
      else if(category1=="education"){
         if (infinite) {this.getEducationPosts();}
          else{this.education();}
      
        }
      else if(category1=="crime"){
         if (infinite) {this.getCrimePosts();}
          else{this.crime();}
        }
      else if(category1=="culture"){
         if (infinite) { this.getCulturePosts();}
          else{this.culture();}        
        }
      else if(category1=="vivid"){
         if (infinite) { this.getVividPosts();}
          else{this.vivid();}        
        }
      else if(category1=="business"){
         if (infinite) { this.getBusinessPosts();}
          else{this.business();}        
        }
      else if(category1=="horoscope"){
         if (infinite) {this.getHoroscopePosts();}
          else{this.horoscope();}        
        }    
  }


  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  goToSource(url) {
    // console.log(url);
    if(url.includes("https")){
      this.iab.create(url, '_self', 'location=yes');
    }
    else{
      let n = url.includes("www.banglatribune");
      if (n) {
       url= url.replace("www.banglatribune", "m.banglatribune");
      } 
     this.iab.create(url, '_system', 'location=yes');      
    }

    
  }
  goToYoutube(videoId) {
    var youtubeURL = 'https://www.youtube.com/watch?v=' + videoId;
    this.iab.create(youtubeURL, '_self', 'location=yes')
  }

  /**
   * Gets all the posts
   */
  getPosts(page) {
    this.newsApi.getAllPosts(page).subscribe(result => {
      let resultArray:any=[];
      resultArray=result;
      if (resultArray.length>0) { 
        for (var i = 0;i< this.allPosts.length; i++) {
          for(var j = 0;j< resultArray.length; j++){
            if (this.allPosts[i].id==resultArray[j].id) {
               resultArray.splice(j, 1);
            }
          }
        }
        let lengthOfRes = Object.keys(resultArray).length;
        for (var i = 0; i < lengthOfRes; i++) {
          moment.locale('bn');
          resultArray[i]['date'] = moment(resultArray[i]['date']).format('MMMM Do YYYY');
          resultArray[i].title.rendered=resultArray[i].title.rendered.substring(0,45);
          resultArray[i].title.rendered = resultArray[i].title.rendered.substr(0, Math.min(resultArray[i].title.rendered.length, resultArray[i].title.rendered.lastIndexOf(" ")));
          resultArray[i].title.rendered+="<b>... আরও পড়ুন</b>";
          this.allPosts.push(resultArray[i]);

           // console.log("allPosts[i].date", this.allPosts[i].title.rendered + "length: "+this.allPosts[i].title.rendered.length);
        }
        this.page = this.page + 1;
      } else {
        this.resultFlag = false;
      }

      for (let res of this.allPosts) {
        let x = res.content.rendered;
        let pat = /href="([^\'\"]+)/g;
        let y = pat.exec(x);
        res.link = y['1'];
      }
    });

    // this.page=this.page+1;
  }   
   apiResult(result){

     let resultArray:any=[];
      resultArray=result;
      if (resultArray.length>0) {

        this.animationDiv();
        for (var i = 0;i< this.mainNewsArray.length; i++) {
          for(var j = 0;j< resultArray.length; j++){
            if (this.mainNewsArray[i].id==resultArray[j].id) {
               resultArray.splice(j, 1);
            }
          }
        }
        let lengthOfRes = Object.keys(resultArray).length;

        for (var i = 0; i < lengthOfRes; i++) {
          this.mainNewsArray.push(resultArray[i])
        }
        this.pageNumber = this.pageNumber + 1;
        this.showAutoHide = false;
      } else {
        this.resultFlag = false;
      }

      for (let res of this.mainNewsArray) {
        let x = res.content.rendered;
        let pat = /href="([^\'\"]+)/g;
        let y = pat.exec(x);
        res.link = y['1'];
      }
   }

  getBangladeshPosts() {
    this.newsApi.getAllBangladeshPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });

  }
  /**
   * Gets all the posts
   */
  getSportsPosts() {
    this.newsApi.getAllSportsPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });
  }
  getLifeStylePosts() {
    this.newsApi.getAllLifeStylePosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });

  }

  getEducationPosts() {
    this.newsApi.getAllEducationPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });

  }
  getCrimePosts() {

    this.newsApi.getAllCrimePosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);

    });

  }
  getCulturePosts() {
    this.newsApi.getAllCulturePosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);

    });

  }
  getVividPosts() {
    this.newsApi.getAllVividPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });

  }
  getBusinessPosts() {
    this.newsApi.getAllBusinessPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });

  } 
  getHoroscopePosts() {
    this.newsApi.getAllHoroscopePosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);

    });

  }
  getPoliticsPosts() {
    this.newsApi.getAllPoliticsPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });
  }
  getShareMarketPosts() {
    this.newsApi.getAllShareMarketPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });

  }
  getInternationalPosts() {
    this.newsApi.getAllInternationalPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });

  }
  getEconomyPosts() {
    this.newsApi.getAllEconomyPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);

    });

  }
  getEntertainmentPosts() {
    this.newsApi.getAllEntertainmentPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });

  }
  getTechPosts() {
    this.newsApi.getAllTechPosts(this.pageNumber).subscribe(result => {
      this.apiResult(result);
    });


  }


  doRefresh(event,category1) {
    setTimeout(() => {
    if(category1=="home"){
      this.home();    
    }
    else if(category1=="videos"){
      this.getJamunaTvVideos();      
    }
    else{
      this.loadAll_pullRefresh(category1,false);
    }      
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  }

  home() {   
    this.showOtherSegments=false; 
    this.weatherFlag = false;
    this.showVideoNews=false;   
    this.allPosts = [];  
    this.mainNewsArray = [];    
    this.animationStart = 1;
    this.animationDiv();
    this.getGeolocation();
    this.currentTab = 0;
    this.homeVisibleFlag = true;
    this.page=1;
    this.getPosts(this.page);
  }

  videos() {
    this.showOtherSegments=false;  
    this.homeVisibleFlag = false;
    this.showVideoNews=true;
    this.mainNewsArray = [];    
    this.jamunaTvYoutube = [];   
    this.currentTab = 1;
    this.getJamunaTvVideos();
    
  }

  commonParam(){
    this.mainNewsArray = [];
    this.pageNumber=1;    
    this.animationStart = 1;  
    this.content.scrollToTop();  
    this.homeVisibleFlag = false;
    this.showVideoNews=false; 
    this.showOtherSegments=true;    
    this.showAutoHide=true;
    if (this.showAutoHide) {
      this.showAutoHideLoader();
    }

  }


  bangladesh() {
    this.currentTab = 2;
    this.commonParam();
    this.getBangladeshPosts();
  }
   politics() {
    this.currentTab = 3;
    this.commonParam();
    this.getPoliticsPosts();
  }

  international() {
    this.currentTab = 4;
    this.commonParam();    
    this.getInternationalPosts();

  }
  economy() {
    this.currentTab = 5;
    this.commonParam();    
    this.getEconomyPosts();
  }

  share() {
    this.currentTab = 6;
    this.commonParam();    
    this.getShareMarketPosts();
  }

  sports() {
    this.currentTab = 7;
    this.commonParam();    
    this.getSportsPosts();

  }
  entertainment() {
    this.currentTab = 8;
    this.commonParam();    
    this.getEntertainmentPosts();
  }
  tech() {
    this.currentTab = 9;
    this.commonParam();    
    this.getTechPosts();
  }
  lifeStyle() {
    this.currentTab = 10;
    this.commonParam();    
    this.getLifeStylePosts();
  }
  education() {
    this.currentTab = 11;
    this.commonParam();    
    this.getEducationPosts();
  }
  crime() {
    this.currentTab = 12;
    this.commonParam();    
    this.getCrimePosts();
  }
  culture() {
    this.currentTab = 13;
    this.commonParam();    
    this.getCulturePosts();
  }
  vivid() {
    this.currentTab = 14;
    this.commonParam();    
    this.getVividPosts();
  }
  business() {
    this.currentTab = 15;
    this.commonParam();    
    this.getBusinessPosts();
  }
  horoscope() {
    this.currentTab = 16;
    this.commonParam();    
    this.getHoroscopePosts();
  }


  ionViewDidEnter() {
    this.content.scrollToTop();
  }


  /**
   * Ionic Loading Controller
   */

  showAutoHideLoader() {
    this.loadingController.create({
      spinner: 'crescent',
      cssClass: 'loader',
      duration: 800
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading...');
      });
    });
  }

  async toastMsg(msg, duration) {

    const toast = await this.toastController.create({
      message: msg,
      duration: duration
    });
    toast.present();

  }


}
