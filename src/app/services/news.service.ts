import { Injectable } from '@angular/core';

import 'rxjs/add/observable/forkJoin';
import * as Global from '../../globalSettings';

import { HttpClient,HttpHeaders  } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})


export class NewsService {

  apiURL = Global.API_SLUG;
  jamunaTvYouTubeURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCPKMoCzd_WwQ6HeQAFWITwVnL1-YDBxgE&channelId=UCN6sm8iHiPd0cnoUardDAnw&part=snippet,id&order=date&maxResults=20';
  independentTvYoutubeUrl='https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyCPKMoCzd_WwQ6HeQAFWITwVnL1-YDBxgE&channelId=UCATUkaOHwO9EP_W87zCiPbA&playlistId=PLb6HuVa35CcP70EwOwBvTtvK4gMFhHXBi&part=snippet,id&order=date&maxResults=20';
  channel24YoutubeUrl='https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyCPKMoCzd_WwQ6HeQAFWITwVnL1-YDBxgE&channelId=UCHLqIOMPk20w-6cFgkA90jw&playlistId=PLc_kkJn0dwWtIc8TovOKm7HStcrz8KAAD&part=snippet,id&order=date&maxResults=20';
  data: any = [];

  headers: any = new HttpHeaders({
    'Cache-Control': 'no-cache, no-store, must-revalidate, post- check=0, pre-check=0, max-age=0, private, max-stale=0',
    Pragma: 'no-cache',
    Expires: '0'
  });   

  constructor(public http: HttpClient) {
  }

  /**
   * Get all the posts
   */
  getweatherReport(lat, long, accuracy) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=metric&appid=40e08730efcea491d4b72d2d32656090'
    return this.http.get(apiUrl);
  }

  /**
   * Jamuna Tv Youtube channel api call
   */
  getjamunaTvYoutube() {
    return this.http.get(this.jamunaTvYouTubeURL);
  }
  getIndependentTvYoutube() {
    return this.http.get(this.independentTvYoutubeUrl);
  }
  getchannel24Youtube() {
    return this.http.get(this.channel24YoutubeUrl);
  }

  /**
   * Get all the posts
   */
  getAllPosts(page) {
    console.log('NEWS SERVICE PAGE NUM');
    console.log(page);

    let rand = Math.random();
    // return this.http.get(Global.API_SLUG + 'posts?categories_exclude=262,16&page=' + page + "&per_page=20"+'&force='+rand, { headers: this.headers });
    return this.http.get(Global.API_SLUG + 'posts?categories_exclude=262,16&page=' + page + "&per_page=20"+'&force='+rand);
  }


  // get job posts
  getAllJobPosts(page) {
    console.log('NEWS SERVICE PAGE NUM');
    console.log(page);
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?categories=531&page=' + page + "&per_page=20"+'&force='+rand);
  }

  /**
   * Get all the posts from LifeStyle category
   * http://ahayder.me/wp-json/wp/v2/posts?
   */
  getAllLifeStylePosts(page) {
    //114=জীবনশৈলী,403=কৃষি,277,772,278=স্বাস্থ্য,334=রূপচর্চা
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=34,35,90,31,61,62,176,182,31,69,68,235,403,277,772,278,334&page=' + page + "&per_page=20"+'&force='+rand);
  }

  /**
* Get all the posts from Education category
* http://ahayder.me/wp-json/wp/v2/posts?
*/
  getAllEducationPosts(page) {
    //767,718,412,471,33,717=শিক্ষা
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=33,767,718,412,471,717&page=' + page + "&per_page=20"+'&force='+rand);
  }


  /**
   * Get all the posts from Sports category
   * http://ahayder.me/wp-json/wp/v2/posts?
   */
  getAllSportsPosts(page) {
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 
      'posts?tags=19,27,192,53,125,205,109,231,163,49,46,126,140,191,50,193,258,145,48,150,138,190,265,209,93,309&page=' + page + "&per_page=20"+'&force='+rand);
  }
  /**
   * Get all the posts from Bangladesh category
   * http://ahayder.me/wp-json/wp/v2/posts?
   */
  getAllBangladeshPosts(page) {
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=25,13,9,29,21,241,160,133&page=' + page + "&per_page=20"+'&force='+rand);
  }
  /**
   * Get all the posts from Tech category
   * http://ahayder.me/wp-json/wp/v2/posts?
   */
  getAllTechPosts(page) {
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=28,183,252,270,271,332,501&page=' + page + "&per_page=20"+'&force='+rand);
  }

  /**
   * Get all the posts from antorjatik category
   */
  getAllInternationalPosts(page) {
    //229=যুক্তরাজ্য,12,140,658,479=আন্তর্জাতিক,226=ইউরোপ,401,663,118,121=বিদেশ
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=32,409,440,410,368,376,406,374,441,380,371,430,367,229,12,140,658,479,226,401,663,118,121&page=' + page + "&per_page=20"+'&force='+rand);
  }

  /**
   * Get all the posts from orthoniti category
   */
  getAllEconomyPosts(page) {
    //458=অর্থনীতি-ব্যবসা,325=অর্থনীতি
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=22,26,44,256,257,242,170,458,325&page=' + page + "&per_page=20"+'&force='+rand);
  }

  /**
   * Get all the posts from Binodon category
   * http://ahayder.me/wp-json/wp/v2/posts?
   */
  getAllEntertainmentPosts(page) {
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=10,147,55,155,54,154&page=' + page + "&per_page=20"+'&force='+rand);
  }


  getAllCrimePosts(page) {
    ////399,20,438,274,96,13=সমগ্র%20বাংলাদেশ,614,9=সারাদেশ
    //http://shobkhobor.dreamdiver.nl/wp-json/wp/v2/tags?search=স্বাস্থ্য
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=78,131,132,82,220,170,344,419,399,20,438,274,96,13,614,9&page=' + page + "&per_page=20"+'&force='+rand);
  }
  
  
  getAllCulturePosts(page) {
    // 390=কারেন্ট স্টোরিজ,259=আলাপন
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=267,207,206,111,203,54,259,390&page=' + page + "&per_page=20"+'&force='+rand);
  }
  
  
  getAllVividPosts(page) {
    //391=টপ%20স্টোরিজ,225,342,202,660,353=বিশ্ব
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=164,178,92,165,230,233,114,67,36,180,154,194,209,225,342,202,660,353,391&page=' + page + "&per_page=20"+'&force='+rand);
  }
  
  
  getAllBusinessPosts(page) {
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=264,274,86,87,26,44,263,257,400,242,670&page=' + page + "&per_page=20"+'&force='+rand);
  }
  
  
  getAllHoroscopePosts(page) {
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=195,196,197&page=' + page + "&per_page=20"+'&force='+rand);
  }


  getAllPoliticsPosts(page) {
    //23=রাজনীতি,149=বিএনপি,186=আওয়ামী%20লীগ
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=442,199,134,23,149,186&page=' + page + "&per_page=20"+'&force='+rand);
  }


  getAllShareMarketPosts(page) {
    //458=অর্থনীতি-ব্যবসা
        let rand = Math.random();
    return this.http.get(Global.API_SLUG + 'posts?tags=522,30&page=' + page + "&per_page=20"+'&force='+rand);
  }

}
