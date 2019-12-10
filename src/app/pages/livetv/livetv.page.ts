import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AdmobFreeService } from 'src/app/services/admobfree.service';
import { Platform } from '@ionic/angular';

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

  tvChannels: any = [];
  indiaChannel: any = [];
  sportsChannel: any = [];
  tv_newspapers: any = [];

  showSegment: number = 1;


  constructor(private admob: AdmobFreeService,
    private iab: InAppBrowser, 
    private httpClient: HttpClient, 
    private appUpdate: AppUpdate,
    private platform: Platform) {

      platform.ready().then( () => {
        this.admob.BannerAd();
      });

    this.tvChannels = [
      // tslint:disable-next-line: indent
      { channelName: 'BTV World', url: 'https://itpolly.iptv.digijadoo.net/live/btv_world/chunks.m3u8', logo: 'https://i2.wp.com/tvbd.live/wp-content/uploads/2016/11/btv-world.png?fit=400%2C225' },
      { channelName: 'Jamuna TV', url: 'https://itpolly.iptv.digijadoo.net/live/jamuna_tv/chunks.m3u8', logo: 'http://www.deshibiz.com/img/media/post/1463733058_jamunatv6.jpg' },
      { channelName: 'Somoy News', url: 'https://itpolly.iptv.digijadoo.net/live/somoy_news/chunks.m3u8', logo: 'https://www.freeetv.com/images/03_logo/Somoy_News_Bangladesh.jpg' },
      { channelName: 'Ekattur TV', url: 'https://itpolly.iptv.digijadoo.net/live/ekattor_tv/chunks.m3u8', logo: '../../../assets/img/tv-logos/ekattor-tv.png' },
      { channelName: 'Independent TV', url: 'https://itpolly.iptv.digijadoo.net/live/independent_tv/chunks.m3u8', logo: '../../../assets/img/tv-logos/independent-tv-logo.png' },
      { channelName: 'ATN Bangla', url: 'https://itpolly.iptv.digijadoo.net/live/atn_bangla/chunks.m3u8', logo: '../../../assets/img/tv-logos/atn-bangla-tv.png' },
      { channelName: 'CHANNEL 9 ', url: 'https://itpolly.iptv.digijadoo.net/live/channel_9/chunks.m3u8', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Channel9_bd.svg/1280px-Channel9_bd.svg.png', alt: "CHANNEL 9 " },
      { channelName: 'SA TV', url: 'https://itpolly.iptv.digijadoo.net/live/sa_tv/playlist.m3u8', logo: '../../../assets/img/tv-logos/satv.png' },
      { channelName: 'ATN NEWS', url: 'https://itpolly.iptv.digijadoo.net/live/atn_news/chunks.m3u8', logo: '../../../assets/img/tv-logos/Atn_news.png' },
      // { channelName: 'BBC World', url: 'https://www.bioscopelive.com/en/channel/bbc-world', logo: '../../../assets/img/tv-logos/bbc_world.png' },
      // { channelName: 'Ananda TV', url: 'http://www.jagobd.com/anandatv', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/HRjXQdYEqsE.png' },
      { channelName: 'Nagorik Tv', url: '"https://itpolly.iptv.digijadoo.net/live/nagorik_tv/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/6ms91aehi2a.png' },
      // { channelName: 'Mohona TV', url: 'http://www.jagobd.com/mohonatv', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/UU3a2v6E7Zs.png' },
      { channelName: 'Boishakhi TV', url: 'https://itpolly.iptv.digijadoo.net/live/boishakhi_tv/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/20mgRCbFLz5.png' },
      { channelName: 'DBC News', url: 'https://itpolly.iptv.digijadoo.net/live/dbc_news/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/6GxyIRO4P74.png' },
      { channelName: 'Asian TV', url: 'https://itpolly.iptv.digijadoo.net/live/asian_tv/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/84xExHj3DJ8.png' },
      // { channelName: 'Ruposhi Bangla', url: 'https://www.bioscopelive.com/en/channel/ruposhi-bangla', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/105QtNR46SH.png' },
      // { channelName: 'ATN Islamic TV', url: 'http://www.jagobd.com/atnislamictv', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/DJcpP2t4Mdp.png' },
      // { channelName: 'Sangsad Bangla', url: 'http://www.jagobd.com/songsadtv', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/So3Og8HY4uN.png' },
      { channelName: 'Al Jazeera', url: 'https://www.aljazeera.com/live/', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/0iLtx9H8sr5.png' },
      { channelName: 'Channel 24', url: 'https://itpolly.iptv.digijadoo.net/live/channel_24/chunks.m3u8', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4BJaziwAkuVDBZRuNBuArfKqzINnznF863p6bFp48ynoUoa4L' },
      { channelName: 'Channeli', url: 'https://itpolly.iptv.digijadoo.net/live/channel_i/chunks.m3u8', logo: 'https://dxtm6s46jarcs.cloudfront.net/wp-content/uploads/2015/03/channel-i-logo.jpg' },
      { channelName: 'RTV', url: 'https://itpolly.iptv.digijadoo.net/live/rtv/playlist.m3u8', logo: 'https://www.rtvbd.tv/templates/rtv/img/logo.png' },
      { channelName: 'NTV', url: 'https://itpolly.iptv.digijadoo.net/live/ntv/chunks.m3u8', logo: 'https://www.trzcacak.rs/myfile/detail/354-3547607_ntv-logo-bangladesh-tv-channel.png' },
      { channelName: 'GTV', url: 'https://itpolly.iptv.digijadoo.net/live/gazi_tv/chunks.m3u8', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsHS9VSC-V5QnK9mbSn0mjZUYxp1QGMAAAY9jc0itHn1dMWZNk' },
      // { channelName: 'NEWS24 TV', url: 'http://www.jagobd.com/news24tv', logo: 'http://www.southafricanews24.net/wp-content/uploads/news24.png' },
      // { channelName: 'Peace TV', url: 'http://peacetvnetwork.visionip.tv/live/62424', logo: 'http://www.desifree.tv/wp-content/uploads/peace-tv.jpg' },
      { channelName: 'Peace TV', url: 'http://peacetv.ashttp22.visionip.tv/live/peacetv-peacetv-peacetv-bangla-hsslive-25f-16x9-SDh/chunklist.m3u8', logo: 'http://www.desifree.tv/wp-content/uploads/peace-tv.jpg' },
      { channelName: 'Gaan Bangla', url: 'https://itpolly.iptv.digijadoo.net/live/gaan_bangla/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/um9o21i3T1E.png' },
      // { channelName: 'Bongo Movies', url: 'https://www.bioscopelive.com/en/channel/bongo-movies', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/Mq2jeWV007t.png' },
      // { channelName: '9XM MUSIC', url: 'http://9xm.in/livetv.php', logo: 'https://www.indiantelevision.com/sites/default/files/images/tv-images/2014/05/29/9xm_new.jpg' },
    ];

    this.indiaChannel = [
      // https://www.dsebd.org/images/logo.png
      // https://www.dsebd.org/images/dse-name.jpg
      { channelName: 'ZEE TV', url: 'https://itpolly.iptv.digijadoo.net/live/zee_tv/chunks.m3u8', logo: 'http://zeelwebsite.s3.amazonaws.com/zeetele/wp-content/uploads/2017/09/zee_tv.jpg', alt: "ZEE TV" },
      { channelName: 'Zee Bangla', url: 'http://pockettv.xyz/api/zee.m3u8?c=zeebanglahd', logo: 'https://www.adgully.com/img/400/201810/zee-bangla-logo.jpg', alt: "Zee Bangla" },
      { channelName: 'Colors Bangla', url: 'https://itpolly.iptv.digijadoo.net/live/colors_bangla_hd/playlist.m3u8', logo: 'https://upload.wikimedia.org/wikipedia/en/8/85/Colors_Bangla_Logo.jpg', alt: "Colors Bangla" },
      { channelName: 'Star Jalsha Movies', url: 'http://icom.movply.stream/hls/star_jalsha.m3u8', logo: 'https://www.indiantelevision.com/sites/default/files/styles/smartcrop_800x800/public/images/tv-images/2015/04/29/tv%20regional%20priortiy3.jpg?itok=x2h51LS5', alt: "Star Jalsha " },
      { channelName: 'Star Jalsha Movies', url: 'https://itpolly.iptv.digijadoo.net/live/jalsha_movies/chunks.m3u8', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Jalsha_movies.png/220px-Jalsha_movies.png', alt: "Star Jalsha Movies" },
      { channelName: 'COLORS HD', url: "https://itpolly.iptv.digijadoo.net/live/colors_hd/chunks.m3u8", logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Colors_tv2017.png/220px-Colors_tv2017.png', alt: "COLORS HD" },
      { channelName: 'STAR PLUS HD', url: 'https://itpolly.iptv.digijadoo.net/live/star_plus_hd/chunks.m3u8', logo: 'https://vignette.wikia.nocookie.net/logopedia/images/7/7a/SPL_HD_logo_2018.jpg/revision/latest/scale-to-width-down/180?cb=20180527184922', alt: "STAR PLUS HD" },
      { channelName: 'MOVIES OK', url: 'https://itpolly.iptv.digijadoo.net/live/movies_ok/chunks.m3u8', logo: 'https://www.tvchannelpricelist.com/wp-content/uploads/channels-logo-300/movies-ok-logo-300x300.jpg', alt: "MOVIES OK" },
      { channelName: 'ZEE CINEMA', url: 'https://itpolly.iptv.digijadoo.net/live/zee_cinema/chunks.m3u8', logo: 'https://bestmediainfo.com/timthumb.php?src=/wp-content/uploads/2019/04/Zee-Cinema-New_4.jpg&w=620&h=350&zc=1&q=100', alt: "ZEE CINEMA" },
      { channelName: 'STAR GOLD', url: 'http://216.144.250.174/Star_G0ld_HD/tracks-v1a1/mono.m3u8', logo: 'https://live.staticflickr.com/2906/13937343237_61f69bafc2_c.jpg', alt: "STAR GOLD" },
      { channelName: 'SONY MAX HD', url: 'http://216.144.250.174/Sony_MaX_HD/playlist.m3u8', logo: 'https://image3.mouthshut.com/images/imagesp/925739638s.png', alt: "SONY MAX HD" },
      { channelName: 'SONY SAB', url: 'http://216.144.250.174/S0ny_Sab_HD/playlist.m3u8', logo: 'https://image3.mouthshut.com/images/imagesp/925002091s.jpeg', alt: "SONY SAB" },
      { channelName: 'SONY HD', url: 'http://15.1.1.10:8080/SonyTVHD/tracks-v1a1/mono.m3u8?token=f044f935da5f71aaad674b3a437acaec37abf17e-e48a9a9f42fb99bb28f438d41170ede6-1575645826-1575635026', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/SET_India.jpg/170px-SET_India.jpg', alt: "SONY HD" },
      { channelName: 'SONY Aat', url: 'http://15.1.1.10:8080/SonyAath/tracks-v1a1/mono.m3u8?token=deb1c7aa11427b656677385bb7e7e37e7bf1ac9d-8110bdd6af6473cdf4358a9d9175aa12-1575646025-1575635225', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sony_Aath_logo.svg/120px-Sony_Aath_logo.svg.png', alt: "SONY Aat" },
      { channelName: 'National Geographic', url: 'http://livecdnh1.tvanywhere.ae/hls/nat_geo/05.m3u8', logo: 'https://blog.nationalgeographic.org/wp-content/uploads/2019/08/NG_Logo-1140x450.jpg', alt: "National Geographic" },
      { channelName: 'National Geo Wild', url: 'http://livecdnh1.tvanywhere.ae/hls/nat_geo_wild/05.m3u8', logo: 'http://www.direct-vs-dish.com/media/channel_logos/nat_geo_wild_lam.png.300x300_q85.png', alt: "Nat Geo Wild" },
      { channelName: 'BBC News', url: 'https://streamingserver003.viewtvgroup.com:443/kapanglocal-playout-master/index.m3u8?fluxustv.m3u8', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png' },
      { channelName: 'STAR MOVIES HD', url: 'http://livecdnh1.tvanywhere.ae/hls/star_movies/05.m3u8', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/STAR_Movies_logo.svg/220px-STAR_Movies_logo.svg.png', alt: "STAR MOVIES HD" }
    ];
    this.sportsChannel = [

      // https://ustreamix.su/stream.php?id=sky-sports-cricket&token=ff1-035-e45-09a-646-ba8-15e-eb3-fef-f8a-66
      // SKY SPORTS CRICKET:http://crichd.ws/update/skys2.php
      //Sony Six:http://free.crichd.online/embed2.php?id=sonysix
      // PTV Sports:http://crichd.ws/update/ptv.php

      { channelName: ' SKY SPORTS CRICKET', url: 'http://www.freecast123.com/cricsp.php?player=desktop&live=skyscric&vw=620&vh=490', logo: 'https://e3.365dm.com/tvlogos/channels/1302-Mobile-Logo.svg?', alt: " SKY SPORTS CRICKET" },
      { channelName: ' SKY SPORTS ACTION', url: 'http://crichd.ws/update/skys3.php', logo: 'https://e3.365dm.com/tvlogos/channels/1333-Mobile-Logo.svg?', alt: " SKY SPORTS ACTION" },
      { channelName: 'SKY SPORTS FOOTBALL', url: 'http://crichd.ws/update/skysfotb.php', logo: 'https://e3.365dm.com/tvlogos/channels/3838-Mobile-Logo.svg?', alt: "SKY SPORTS FOOTBALL" },
      { channelName: ' Star Sports 1 HD', url: 'http://icom.movply.stream/hls/star-sports-1-hd.m3u8', logo: 'https://i1.wp.com/sportstvon.com/wp-content/uploads/2017/08/star-sports-1.png?fit=300%2C169', alt: " Star Sports 1 HD" },
      { channelName: ' Star Sports 2 HD', url: 'https://akamai.anytv.live/StartSports2HHD/tracks-v1a1/mono.m3u8', logo: 'https://i2.wp.com/sportstvon.com/wp-content/uploads/2017/08/star-sports-2.png?fit=300%2C169', alt: " Star Sports 2 HD" },
      { channelName: ' PTV Sports', url: 'http://www.freecast123.com/cricsp.php?player=desktop&live=ptvpk&vw=620&vh=490', logo: 'https://i2.wp.com/sportstvon.com/wp-content/uploads/2016/12/ptv-sports.png?fit=300%2C169', alt: " PTV Sports" },
      { channelName: ' Sony Six', url: 'http://www.freecast123.com/crichd.php?player=desktop&live=sonysixind&vw=620&vh=490', logo: 'https://i1.wp.com/sportstvon.com/wp-content/uploads/2016/12/sonysixhd.png?fit=300%2C169', alt: " Sony Six" },
      // {channelName: ' IPL', url: 'http://tv.b4ucast.me/tv/vJ9lsiZFOE20190929/chunklist_w457579760_tkaGxzZW5kdGltZT0xNTc1NjI2MTYwJmhsc3N0YXJ0dGltZT0wJmhsc2hhc2g9RDl4bDdIbWhRVllUMUM0WE5oa3oxNlBXUDVnRTUxN2hPZmdROWhmcV9qbz0=.m3u8', logo: 'https://i1.wp.com/sportstvon.com/wp-content/uploads/2017/04/ipl18.png?fit=300%2C169',alt:" IPL" },
      { channelName: ' Sony Ten 1', url: 'http://icom.movply.stream/hls/ten_1.m3u8', logo: 'https://i0.wp.com/sportstvon.com/wp-content/uploads/2017/08/sony-ten1.png?fit=300%2C169', alt: " Sony Ten 1" },
      { channelName: ' Sony Ten 2', url: 'http://icom.movply.stream/hls/ten_2.m3u8', logo: 'https://i1.wp.com/sportstvon.com/wp-content/uploads/2017/08/ten2hd.png?fit=300%2C169', alt: " Sony Ten 2" },
      { channelName: ' WWE Network', url: 'http://crichd.ws/update/wwe.php', logo: 'http://sportstvon.com/wp-content/uploads/2017/12/wwe-network-300x169.png', alt: " WWE Network" },
      { channelName: 'WWE Network', url: 'http://cdnak19.cast4u.info/channels/4/10804.m3u8?fluxustv.m3u8', logo: 'https://i.imgur.com/6chO5x2.png' },
      { channelName: 'HBO', url: 'https://u65464.cdn884.net:8443/hls/exyjs.m3u8?s=i7LvkMGAc2lu4c0zkhJZAw&e=1575927436', logo: 'https://tvseriesfinale.com/wp-content/uploads/2018/01/hbo_logo-590x332.jpg', alt: "HBO" },
    ];
    this.tv_newspapers = this.tvChannels;
  }

  getUpdate() {
    ////////////////////////
    // alert("hola");
    const updateUrl = 'https://raw.githubusercontent.com/livetvappbd/livetv-version/master/version.xml';
    this.appUpdate.checkAppUpdate(updateUrl).then(() => { console.log('Update available') });
    ///////////////////////////
  }
  goToChannel(url) {
    // if(!url.includes("https") && !url.includes("https")){
    //   this.iab.create(url, '_system', 'location=no');
    // }
    // else{
    this.showInterstitial();
    this.iab.create(url, '_self', 'location=no');
    // }
    // window['plugins'].webintent.startActivity({
    //         action: window['plugins'].webintent.ACTION_VIEW,
    //         url:  "googlechrome://navigate?url="+url
    //     },
    //     function() {},
    //     function() {
    //         alert('Failed to open URL via Android Intent.');
    //       console.log("Failed to open URL via Android Intent.")
    //     });    
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.showSegment = ev.detail.value;
    this.showSegment == 1 ? document.getElementById("ionContentLive").style.setProperty('--background', '#f1f1f1') : document.getElementById("ionContentLive").style.setProperty('--background', '#ffffff');
    this.goToSegment();
  }

  goToSegment() {
    if (this.showSegment == 1) {
      this.tv_newspapers = this.tvChannels;
    }
    else if (this.showSegment == 2) {
      this.tv_newspapers = this.indiaChannel;
    }
    else if (this.showSegment == 3) {
      this.tv_newspapers = this.sportsChannel;
    }
    let nextButtonNumber: number = this.showSegment;
    document.getElementById(String(nextButtonNumber)).click();
    let buttonWidth = document.getElementById(String(nextButtonNumber)).offsetWidth;
    document.getElementById('segment').scrollLeft = nextButtonNumber * buttonWidth - buttonWidth;
  }
  swipeLeftPress($event) {
    this.showSegment = Number(this.showSegment) + 1;
    // if(this.showSegment>2) {
    //  this.showSegment=1;
    // }
    this.goToSegment();

  }


  swipeRightPress($event) {
    this.showSegment = Number(this.showSegment) - 1;
    // if(this.showSegment<1) {
    //  this.showSegment=2;
    // }
    this.goToSegment();
  }

  ngOnInit() {

  }

  showInterstitial() {
    this.admob.InterstitialAd();
  }

}
