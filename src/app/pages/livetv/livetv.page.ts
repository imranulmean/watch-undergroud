import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-livetv',
  templateUrl: './livetv.page.html',
  styleUrls: ['./livetv.page.scss'],
})
export class LivetvPage implements OnInit {

  tvChannels: any = [];
  newsPapers:any = [];
  tv_newspapers:any=[];
  showSegment:number=1;
  constructor(private iab: InAppBrowser,private httpClient: HttpClient ) {
    this.tvChannels = [
      // tslint:disable-next-line: indent
      { channelName: 'BTV World', url: 'https://itpolly.iptv.digijadoo.net/live/btv_world/chunks.m3u8', logo: 'https://i2.wp.com/tvbd.live/wp-content/uploads/2016/11/btv-world.png?fit=400%2C225' },
      { channelName: 'Jamuna TV', url: 'https://itpolly.iptv.digijadoo.net/live/jamuna_tv/chunks.m3u8', logo: 'http://www.deshibiz.com/img/media/post/1463733058_jamunatv6.jpg' },
      { channelName: 'Somoy News', url: 'https://itpolly.iptv.digijadoo.net/live/somoy_news/chunks.m3u8', logo: 'https://www.freeetv.com/images/03_logo/Somoy_News_Bangladesh.jpg' },
      { channelName: 'Ekattur TV', url: 'https://itpolly.iptv.digijadoo.net/live/ekattor_tv/chunks.m3u8', logo: '../../../assets/img/tv-logos/ekattor-tv.png' },
      { channelName: 'Independent TV', url: 'https://itpolly.iptv.digijadoo.net/live/independent_tv/chunks.m3u8', logo: '../../../assets/img/tv-logos/independent-tv-logo.png' },
      { channelName: 'ATN Bangla', url: 'https://itpolly.iptv.digijadoo.net/live/atn_bangla/chunks.m3u8', logo: '../../../assets/img/tv-logos/atn-bangla-tv.png' },
      // { channelName: 'My TV', url: 'http://www.jagobd.com/my-tv', logo: '../../../assets/img/tv-logos/my-tv-logo.png' },
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

   this.tv_newspapers=this.tvChannels;
  }

  goToChannel(url) {
    if(url==='https://www.dsebd.org/' || !url.includes("https")){
      this.iab.create(url, '_system', 'location=yes');
    }
    else{
      // let openBrowser=this.showSegment==1 ? '_system':'_self';
      this.iab.create(url, '_self', 'location=no');
    }
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
  ngOnInit() {
  }

}
