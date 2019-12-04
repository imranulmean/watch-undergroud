(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-livetv-livetv-module"],{

/***/ "./src/app/pages/livetv/livetv.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/livetv/livetv.module.ts ***!
  \***********************************************/
/*! exports provided: LivetvPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LivetvPageModule", function() { return LivetvPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _livetv_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./livetv.page */ "./src/app/pages/livetv/livetv.page.ts");







var routes = [
    {
        path: '',
        component: _livetv_page__WEBPACK_IMPORTED_MODULE_6__["LivetvPage"]
    }
];
var LivetvPageModule = /** @class */ (function () {
    function LivetvPageModule() {
    }
    LivetvPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_livetv_page__WEBPACK_IMPORTED_MODULE_6__["LivetvPage"]]
        })
    ], LivetvPageModule);
    return LivetvPageModule;
}());



/***/ }),

/***/ "./src/app/pages/livetv/livetv.page.html":
/*!***********************************************!*\
  !*** ./src/app/pages/livetv/livetv.page.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n      <ion-buttons slot=\"start\">\r\n        <ion-menu-button></ion-menu-button>\r\n        <img src=\"../../../assets/img/logo-200.png\" height=\"35\">\r\n      </ion-buttons>\r\n    <ion-title>Live TV</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-button (click)=getUpdate()>Get Update</ion-button> \r\n<ion-toolbar id=\"segment\">\r\n  <ion-segment (ionChange)=\"segmentChanged($event)\" value=\"1\" scrollable >\r\n    <ion-segment-button value=\"1\" id=\"1\">\r\n      <ion-label><b>Bangla</b></ion-label>\r\n    </ion-segment-button>\r\n    <ion-segment-button value=\"2\" id=\"2\">\r\n      <ion-label><b>India</b></ion-label>\r\n    </ion-segment-button>\r\n  </ion-segment>\r\n</ion-toolbar>\r\n\r\n<ion-content id=\"ionContentLive\" (swipeleft)=\"swipeLeftPress($event)\" (swiperight)=\"swipeRightPress($event)\">\r\n\r\n <ion-row >\r\n  <ion-col size=\"6\" *ngFor=\"let c of tv_newspapers\" (click)=goToChannel(c.url)>\r\n    <ion-card *ngIf=\"showSegment==1\">\r\n      <img src=\"{{c.logo}}\" class=\"tv-logo\">\r\n      <!-- <ion-label color=\"warning\">{{c.channelName}}</ion-label> -->\r\n    </ion-card>\r\n\r\n    <ion-card *ngIf=\"showSegment==2\">\r\n      <img src=\"{{c.logo}}\" class=\"tv-logo\" alt=\"{{c.alt}}\">\r\n    </ion-card>  \r\n\r\n    </ion-col>  \r\n  </ion-row>\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/livetv/livetv.page.scss":
/*!***********************************************!*\
  !*** ./src/app/pages/livetv/livetv.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-toolbar {\n  --background: #fe8c00; }\n\nion-content {\n  /*--background: #424242;*/\n  --background:#f1f1f1\r\n; }\n\n#segment {\n  --background: #fabc5a1b; }\n\n.newpaperLogo {\n  margin-top: 0.5em; }\n\n.tv-logo {\n  /*\tmax-height: 50px;\r\n\twidth: unset;*/\n  margin: 0 auto;\n  height: 6em; }\n\n.newpaperHeader {\n  padding: 0 0 1em 0.2em; }\n\nion-segment-button {\n  border: none;\n  font-weight: 900;\n  font-size: 0.8em;\n  --indicator-color-checked: #fcb13c;\n  --color-activated: #fcb13c;\n  --color-checked: #fcb13c; }\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbGl2ZXR2L0Q6XFxOT0RFSlMgQVBQXFxJb25pYzRcXHdhdGNoLXVuZGVyZ3JvdWQvc3JjXFxhcHBcXHBhZ2VzXFxsaXZldHZcXGxpdmV0di5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2xpdmV0di9saXZldHYucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kscUJBQWEsRUFBQTs7QUFFakI7RUFDSSx5QkFBQTtFQUNBO0FBQWEsRUFBQTs7QUFFakI7RUFDQyx1QkFBYSxFQUFBOztBQUVkO0VBQ0MsaUJBQWlCLEVBQUE7O0FBR2xCO0VBQ0E7ZUNDZTtFRENkLGNBQWM7RUFDZCxXQUFXLEVBQUE7O0FBR1o7RUFDQyxzQkFBc0IsRUFBQTs7QUFHdkI7RUFDQyxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixrQ0FBMEI7RUFDMUIsMEJBQWtCO0VBQ2xCLHdCQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbGl2ZXR2L2xpdmV0di5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tdG9vbGJhciB7XHJcbiAgICAtLWJhY2tncm91bmQ6ICNmZThjMDA7XHJcbn1cclxuaW9uLWNvbnRlbnQge1xyXG4gICAgLyotLWJhY2tncm91bmQ6ICM0MjQyNDI7Ki9cclxuICAgIC0tYmFja2dyb3VuZDojZjFmMWYxXHJcbn1cclxuI3NlZ21lbnR7XHJcblx0LS1iYWNrZ3JvdW5kOiAjZmFiYzVhMWI7XHJcbn1cclxuLm5ld3BhcGVyTG9nb3tcclxuXHRtYXJnaW4tdG9wOiAwLjVlbTtcclxufVxyXG5cclxuLnR2LWxvZ297XHJcbi8qXHRtYXgtaGVpZ2h0OiA1MHB4O1xyXG5cdHdpZHRoOiB1bnNldDsqL1xyXG5cdG1hcmdpbjogMCBhdXRvO1xyXG5cdGhlaWdodDogNmVtO1xyXG59XHJcblxyXG4ubmV3cGFwZXJIZWFkZXJ7XHJcblx0cGFkZGluZzogMCAwIDFlbSAwLjJlbTtcclxufVxyXG5cclxuaW9uLXNlZ21lbnQtYnV0dG9uIHtcclxuXHRib3JkZXI6IG5vbmU7XHJcblx0Zm9udC13ZWlnaHQ6IDkwMDtcclxuXHRmb250LXNpemU6IDAuOGVtO1xyXG5cdC0taW5kaWNhdG9yLWNvbG9yLWNoZWNrZWQ6ICNmY2IxM2M7XHJcblx0LS1jb2xvci1hY3RpdmF0ZWQ6ICNmY2IxM2M7XHJcblx0LS1jb2xvci1jaGVja2VkOiAjZmNiMTNjO1xyXG4gIH0iLCJpb24tdG9vbGJhciB7XG4gIC0tYmFja2dyb3VuZDogI2ZlOGMwMDsgfVxuXG5pb24tY29udGVudCB7XG4gIC8qLS1iYWNrZ3JvdW5kOiAjNDI0MjQyOyovXG4gIC0tYmFja2dyb3VuZDojZjFmMWYxXHJcbjsgfVxuXG4jc2VnbWVudCB7XG4gIC0tYmFja2dyb3VuZDogI2ZhYmM1YTFiOyB9XG5cbi5uZXdwYXBlckxvZ28ge1xuICBtYXJnaW4tdG9wOiAwLjVlbTsgfVxuXG4udHYtbG9nbyB7XG4gIC8qXHRtYXgtaGVpZ2h0OiA1MHB4O1xyXG5cdHdpZHRoOiB1bnNldDsqL1xuICBtYXJnaW46IDAgYXV0bztcbiAgaGVpZ2h0OiA2ZW07IH1cblxuLm5ld3BhcGVySGVhZGVyIHtcbiAgcGFkZGluZzogMCAwIDFlbSAwLjJlbTsgfVxuXG5pb24tc2VnbWVudC1idXR0b24ge1xuICBib3JkZXI6IG5vbmU7XG4gIGZvbnQtd2VpZ2h0OiA5MDA7XG4gIGZvbnQtc2l6ZTogMC44ZW07XG4gIC0taW5kaWNhdG9yLWNvbG9yLWNoZWNrZWQ6ICNmY2IxM2M7XG4gIC0tY29sb3ItYWN0aXZhdGVkOiAjZmNiMTNjO1xuICAtLWNvbG9yLWNoZWNrZWQ6ICNmY2IxM2M7IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/pages/livetv/livetv.page.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/livetv/livetv.page.ts ***!
  \*********************************************/
/*! exports provided: LivetvPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LivetvPage", function() { return LivetvPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ionic_native_app_update_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/app-update/ngx */ "./node_modules/@ionic-native/app-update/ngx/index.js");





var LivetvPage = /** @class */ (function () {
    function LivetvPage(iab, httpClient, appUpdate) {
        this.iab = iab;
        this.httpClient = httpClient;
        this.appUpdate = appUpdate;
        this.tvChannels = [];
        this.indiaChannel = [];
        this.tv_newspapers = [];
        this.showSegment = 1;
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
        ];
        this.indiaChannel = [
            // https://www.dsebd.org/images/logo.png
            // https://www.dsebd.org/images/dse-name.jpg
            { channelName: 'ZEE TV', url: 'https://itpolly.iptv.digijadoo.net/live/zee_tv/chunks.m3u8', logo: 'http://zeelwebsite.s3.amazonaws.com/zeetele/wp-content/uploads/2017/09/zee_tv.jpg', alt: "ZEE TV" },
            { channelName: 'COLORS HD', url: "https://itpolly.iptv.digijadoo.net/live/colors_hd/chunks.m3u8", logo: '', alt: "COLORS HD" },
            { channelName: 'STAR PLUS HD', url: 'https://itpolly.iptv.digijadoo.net/live/star_plus_hd/chunks.m3u8', logo: '', alt: "STAR PLUS HD" },
            { channelName: 'MOVIES OK', url: 'https://itpolly.iptv.digijadoo.net/live/movies_ok/chunks.m3u8', logo: '', alt: "MOVIES OK" },
            { channelName: 'Cartoon Network', url: 'https://peer1.ustv.to/CN/myStream/chunks.m3u8?nimblesessionid=132494835&wmsAuthSign=c2VydmVyX3RpbWU9MTIvMy8yMDE5IDg6NTQ6NDQgUE0maGFzaF92YWx1ZT1oOXhISGtXdnJ6NWRXNENIamkzYkhBPT0mdmFsaWRtaW51dGVzPTM2MCZzdHJtX2xlbj0w', logo: '', alt: "Cartoon Network" },
            { channelName: 'Bein Sports USA', url: 'https://ul.cdn946.net:8443/hls/yu3w26c9imgo814.m3u8?s=8B1_iTOaqOZYnqy6Zq6JdQ&e=1575428682', logo: '', alt: "Bein Sports USA" },
            { channelName: 'Samakal', url: 'https://samakal.com/', logo: 'https://samakal.com/assets/images/logo-bn.png' },
            { channelName: 'Amader Shomoy', url: 'http://www.dainikamadershomoy.com/', logo: 'http://www.dainikamadershomoy.com/files/assets/img/main-logo.png' },
            { channelName: 'Prothom Alo', url: 'https://www.prothomalo.com/', logo: 'https://paloimages.prothom-alo.com/contents/themes/public/style/images/Prothom-Alo.png' },
            { channelName: 'Janakantha', url: 'http://web.dailyjanakantha.com/', logo: 'http://web.dailyjanakantha.com/layouts/website/assets/img/header-top.png' },
            { channelName: 'Inqilab', url: 'https://www.dailyinqilab.com/', logo: 'https://www.dailyinqilab.com/includes/themes/dailyinqilab/images/logo.png' },
            { channelName: 'Bhorer Kagoj', url: 'https://www.bhorerkagoj.com/', logo: 'https://www.w3newspapers.com/bangladesh/images/bhorerkagoj.png' },
            { channelName: 'Daily Star', url: 'https://www.thedailystar.net/', logo: 'https://assetsds.cdnedge.bluemix.net/sites/all/themes/tds/logo.svg' },
            { channelName: 'Observer', url: 'https://www.observerbd.com/', logo: 'https://www.observerbd.com/files/logo.jpg' },
            { channelName: 'Bangladesh Today', url: 'http://thebangladeshtoday.com/', logo: 'https://thebangladeshtoday.com/wp-content/uploads/2018/06/TBT-Logo-Transparent-1-1.png' },
            { channelName: 'bdnews24.com', url: 'https://bangla.bdnews24.com/', logo: 'https://d30fl32nd2baj9.cloudfront.net/media/2013/01/04/logo1.png1/BINARY/logo1.png' },
        ];
        this.tv_newspapers = this.tvChannels;
    }
    LivetvPage.prototype.getUpdate = function () {
        ////////////////////////
        alert("hola");
        var updateUrl = 'https://raw.githubusercontent.com/imranulmean/version-control/master/version.xml';
        this.appUpdate.checkAppUpdate(updateUrl).then(function () { console.log('Update available'); });
        ///////////////////////////
    };
    LivetvPage.prototype.goToChannel = function (url) {
        if (url === 'https://www.dsebd.org/' || !url.includes("https")) {
            this.iab.create(url, '_system', 'location=yes');
        }
        else {
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
    };
    LivetvPage.prototype.segmentChanged = function (ev) {
        console.log('Segment changed', ev.detail.value);
        this.showSegment = ev.detail.value;
        this.showSegment == 1 ? document.getElementById("ionContentLive").style.setProperty('--background', '#f1f1f1') : document.getElementById("ionContentLive").style.setProperty('--background', '#ffffff');
        this.goToSegment();
    };
    LivetvPage.prototype.goToSegment = function () {
        this.tv_newspapers = this.showSegment == 1 ? this.tvChannels : this.indiaChannel;
        var nextButtonNumber = this.showSegment;
        document.getElementById(String(nextButtonNumber)).click();
        var buttonWidth = document.getElementById(String(nextButtonNumber)).offsetWidth;
        document.getElementById('segment').scrollLeft = nextButtonNumber * buttonWidth - buttonWidth;
    };
    LivetvPage.prototype.swipeLeftPress = function ($event) {
        this.showSegment = Number(this.showSegment) + 1;
        if (this.showSegment > 2) {
            this.showSegment = 1;
        }
        this.goToSegment();
    };
    LivetvPage.prototype.swipeRightPress = function ($event) {
        this.showSegment = Number(this.showSegment) - 1;
        if (this.showSegment < 1) {
            this.showSegment = 2;
        }
        this.goToSegment();
    };
    LivetvPage.prototype.ngOnInit = function () {
    };
    LivetvPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-livetv',
            template: __webpack_require__(/*! ./livetv.page.html */ "./src/app/pages/livetv/livetv.page.html"),
            styles: [__webpack_require__(/*! ./livetv.page.scss */ "./src/app/pages/livetv/livetv.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_2__["InAppBrowser"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _ionic_native_app_update_ngx__WEBPACK_IMPORTED_MODULE_4__["AppUpdate"]])
    ], LivetvPage);
    return LivetvPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-livetv-livetv-module.js.map