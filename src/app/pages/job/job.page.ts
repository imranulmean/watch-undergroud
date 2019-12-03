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

import { IonSlides } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage {

  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSlides) slider: IonSlides;

  routeInterval:any;
  animationStart: any = 1;

  resultsJob = [];
  pageEconomy = 1;
  jobFlag = true;
  resultFlag = true;


  constructor(
    private iab: InAppBrowser,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private newsApi: NewsService,
    public event: Events,
    public platform: Platform,
    // private admobFreeService: AdmobFreeService,
    private route: ActivatedRoute) {
      console.log("inside job");
      this.getJobPosts(this.pageEconomy);
   }

  ngOnInit() {
    // if (this.platform.is('cordova')) {
    //   this.admobFreeService.BannerAd();
    // }
  }

    /**
   * Gets all the posts
   */
  getJobPosts(page) {

    // Get the information from the API
    this.newsApi.getAllJobPosts(page).subscribe(result => {
      if (result) {
        let lengthOfRes = Object.keys(result).length;

        for (var i = 0; i < lengthOfRes; i++) {
          this.resultsJob.push(result[i]);
        }

        this.pageEconomy = this.pageEconomy + 1;
        this.jobFlag = false;
      } else {
        this.resultFlag = false;
      }

      for (let res of this.resultsJob) {
        let x = res.content.rendered;
        let pat = /href="([^\'\"]+)/g;
        let y = pat.exec(x);
        res.link = y['1'];
      }

    });

  }





   /**
   *
   * Infinite scroll for Economy news section on home page
   */
  loadAllJobNews(event) {
    setTimeout(() => {
      console.log('Done');
      this.getJobPosts(this.pageEconomy);
      event.target.complete();
      
      if (this.resultFlag == false) {
        event.target.disabled = true;
      }
    }, 1500);
  }


  goToSource(url) {
    this.iab.create(url, '_self', 'location=yes')
  }

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





}
