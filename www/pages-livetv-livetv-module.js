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

module.exports = "<ion-header>\r\n\t<ion-toolbar>\r\n\t\t<ion-row>\r\n\t\t\t<ion-col size=\"6\">\r\n\t\t\t\t<ion-title>Amader TV</ion-title>\r\n\t\t\t</ion-col>\r\n\t\t</ion-row>\r\n\r\n\t</ion-toolbar>\r\n</ion-header>\r\n<ion-toolbar id=\"segment\" *ngIf=\"showUpdateButton==1\">\r\n\t<ion-button  color=\"danger\" expand=\"full\" (click)=getUpdate()>Software Update</ion-button>\r\n\t<!--   <ion-segment (ionChange)=\"segmentChanged($event)\" value=\"1\" scrollable>\r\n    <ion-segment-button value=\"1\" id=\"1\">\r\n      <ion-label><b>Bangla</b></ion-label>\r\n    </ion-segment-button>\r\n    <ion-segment-button value=\"2\" id=\"2\">\r\n      <ion-label><b>India</b></ion-label>\r\n    </ion-segment-button>\r\n    <ion-segment-button value=\"3\" id=\"3\">\r\n      <ion-label><b>Sports</b></ion-label>\r\n    </ion-segment-button>\r\n  </ion-segment> -->\r\n</ion-toolbar>\r\n\r\n<!-- <ion-content id=\"ionContentLive\" (swipeleft)=\"swipeLeftPress($event)\" (swiperight)=\"swipeRightPress($event)\"> -->\r\n<ion-content id=\"ionContentLive\" class=\"container\">\r\n\r\n\t<ion-grid>\r\n\t\t<ion-row>\r\n\t\t\t<ion-col>\r\n\t\t\t\t<ion-item-divider class=\"ion-no-padding\">\r\n\t\t\t\t\t<ion-text color=\"dark\">\r\n\t\t\t\t\t\t<h4>Bangladeshi Channels:</h4>\r\n\t\t\t\t\t</ion-text>\r\n\t\t\t\t</ion-item-divider>\r\n\t\t\t\t<ion-item class=\"ion-no-padding\">\r\n\t\t\t\t\t<div class=\"thumnails\">\r\n\t\t\t\t\t\t<div class=\"list-thumbnail\">\r\n\t\t\t\t\t\t\t<div class=\"img-thumb\" *ngFor=\"let c of tvChannels\" (click)=\"goToChannel(c.url)\">\r\n\t\t\t\t\t\t\t\t<img src=\"{{c.logo}}\" class=\"tv-logo\">\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</ion-item>\r\n\t\t\t</ion-col>\r\n\t\t</ion-row>\r\n\r\n\r\n    <ion-row>\r\n      <ion-col>\r\n        <ion-item-divider class=\"ion-no-padding\">\r\n          <ion-text color=\"dark\">\r\n            <h4>Bangladeshi Channels:(Outside Bangladesh)</h4>\r\n          </ion-text>\r\n        </ion-item-divider>\r\n        <div class=\"thumnails\">\r\n          <div class=\"list-thumbnail\">\r\n            <div class=\"img-thumb\" *ngFor=\"let c of tvChannelsOutsideBD\" (click)='goToChannel(c.url,\"outside\")'>\r\n              <img src=\"{{c.logo}}\" class=\"tv-logo\">\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n\t\t<ion-row>\r\n\t\t\t<ion-col>\r\n\t\t\t\t<ion-item-divider class=\"ion-no-padding\">\r\n\t\t\t\t\t<ion-text color=\"dark\">\r\n\t\t\t\t\t\t<h4>Indian Channels:</h4>\r\n\t\t\t\t\t</ion-text>\r\n\t\t\t\t</ion-item-divider>\r\n\t\t\t\t<div class=\"thumnails\">\r\n\t\t\t\t\t<div class=\"list-thumbnail\">\r\n\t\t\t\t\t\t<div class=\"img-thumb\" *ngFor=\"let c of indiaChannel\" (click)=\"goToChannel(c.url)\">\r\n\t\t\t\t\t\t\t<img src=\"{{c.logo}}\" class=\"tv-logo\">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</ion-col>\r\n\t\t</ion-row>\r\n\r\n\t\t<ion-row>\r\n\t\t\t<ion-col>\r\n\t\t\t\t<ion-item-divider class=\"ion-no-padding\">\r\n\t\t\t\t\t<ion-text color=\"dark\">\r\n\t\t\t\t\t\t<h4>Sports Channels:</h4>\r\n\t\t\t\t\t</ion-text>\r\n\t\t\t\t</ion-item-divider>\r\n\t\t\t\t<div class=\"thumnails\">\r\n\t\t\t\t\t<div class=\"list-thumbnail\">\r\n\t\t\t\t\t\t<div class=\"img-thumb\" *ngFor=\"let c of sportsChannel\" (click)=\"goToChannel(c.url)\">\r\n\t\t\t\t\t\t\t<img src=\"{{c.logo}}\" class=\"tv-logo\">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</ion-col>\r\n\t\t</ion-row>\r\n\t</ion-grid>\r\n\t<!--   <ion-grid>\r\n\r\n    <ion-row>\r\n  \r\n      <ion-col size=\"6\" size-md=\"4\" size-lg=\"2\" size-xl=\"1\" *ngFor=\"let c of tv_newspapers\" (click)=goToChannel(c.url)>\r\n  \r\n        <ion-card *ngIf=\"showSegment==1\">\r\n          <img src=\"{{c.logo}}\" class=\"tv-logo\">\r\n        </ion-card>\r\n  \r\n        <ion-card *ngIf=\"showSegment==2\">\r\n          <img src=\"{{c.logo}}\" class=\"tv-logo\" alt=\"{{c.alt}}\">\r\n        </ion-card>\r\n  \r\n        <ion-card *ngIf=\"showSegment==3\">\r\n          <img src=\"{{c.logo}}\" class=\"tv-logo\" alt=\"{{c.alt}}\">\r\n        </ion-card>\r\n  \r\n      </ion-col>\r\n  \r\n    </ion-row>\r\n\r\n  </ion-grid> -->\r\n\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/livetv/livetv.page.scss":
/*!***********************************************!*\
  !*** ./src/app/pages/livetv/livetv.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".thumnails {\n  overflow-x: scroll;\n  overflow-y: hidden; }\n\n.img-thumb {\n  display: inline-block;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  padding: 3px;\n  margin: 0 0.5em 0 0; }\n\n.list-thumbnail {\n  height: 100%;\n  white-space: nowrap; }\n\nion-toolbar {\n  /*--background: #fe8c00;*/\n  --background:#fff8ed; }\n\nion-content {\n  /*--background: #424242;*/ }\n\n#segment {\n  --background: #fabc5a1b; }\n\n.newpaperLogo {\n  margin-top: 0.5em; }\n\n.tv-logo {\n  margin: 0 auto;\n  height: 6em; }\n\n.newpaperHeader {\n  padding: 0 0 1em 0.2em; }\n\nion-segment-button {\n  border: none;\n  font-weight: 900;\n  font-size: 0.8em;\n  --indicator-color-checked: #fcb13c;\n  --color-activated: #fcb13c;\n  --color-checked: #fcb13c; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbGl2ZXR2L0Q6XFxOT0RFSlMgQVBQXFxJb25pYzRcXHdhdGNoLXVuZGVyZ3JvdWQvc3JjXFxhcHBcXHBhZ2VzXFxsaXZldHZcXGxpdmV0di5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0UscUJBQXFCO0VBQ3JCLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsWUFBWTtFQUdaLG1CQUFrQixFQUFBOztBQUdwQjtFQUNDLFlBQVk7RUFDWixtQkFBbUIsRUFBQTs7QUFHcEI7RUFDSSx5QkFBQTtFQUNBLG9CQUFhLEVBQUE7O0FBRWpCO0VBQ0kseUJBQUEsRUFBMEI7O0FBRzlCO0VBQ0MsdUJBQWEsRUFBQTs7QUFFZDtFQUNDLGlCQUFpQixFQUFBOztBQUdsQjtFQUNDLGNBQWM7RUFDZCxXQUFXLEVBQUE7O0FBR1o7RUFDQyxzQkFBc0IsRUFBQTs7QUFHdkI7RUFDQyxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixrQ0FBMEI7RUFDMUIsMEJBQWtCO0VBQ2xCLHdCQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbGl2ZXR2L2xpdmV0di5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGh1bW5haWxze1xyXG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbn1cclxuXHJcbi5pbWctdGh1bWJ7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIHBhZGRpbmc6IDNweDtcclxuICAvLyB3aWR0aDogNDAlO1xyXG4gIC8vIGhlaWdodDogNTBweDtcclxuICBtYXJnaW46MCAwLjVlbSAwIDA7IFxyXG4gIC8vIGxpbmUtaGVpZ2h0OiA2MHB4O1xyXG59XHJcbi5saXN0LXRodW1ibmFpbHtcclxuXHRoZWlnaHQ6IDEwMCU7XHJcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuXHJcbn1cclxuaW9uLXRvb2xiYXIge1xyXG4gICAgLyotLWJhY2tncm91bmQ6ICNmZThjMDA7Ki9cclxuICAgIC0tYmFja2dyb3VuZDojZmZmOGVkO1xyXG59XHJcbmlvbi1jb250ZW50IHtcclxuICAgIC8qLS1iYWNrZ3JvdW5kOiAjNDI0MjQyOyovXHJcbiAgICAvLyAtLWJhY2tncm91bmQ6I2YxZjFmMVxyXG59XHJcbiNzZWdtZW50e1xyXG5cdC0tYmFja2dyb3VuZDogI2ZhYmM1YTFiO1xyXG59XHJcbi5uZXdwYXBlckxvZ297XHJcblx0bWFyZ2luLXRvcDogMC41ZW07XHJcbn1cclxuXHJcbi50di1sb2dve1xyXG5cdG1hcmdpbjogMCBhdXRvO1xyXG5cdGhlaWdodDogNmVtO1xyXG59XHJcblxyXG4ubmV3cGFwZXJIZWFkZXJ7XHJcblx0cGFkZGluZzogMCAwIDFlbSAwLjJlbTtcclxufVxyXG5cclxuaW9uLXNlZ21lbnQtYnV0dG9uIHtcclxuXHRib3JkZXI6IG5vbmU7XHJcblx0Zm9udC13ZWlnaHQ6IDkwMDtcclxuXHRmb250LXNpemU6IDAuOGVtO1xyXG5cdC0taW5kaWNhdG9yLWNvbG9yLWNoZWNrZWQ6ICNmY2IxM2M7XHJcblx0LS1jb2xvci1hY3RpdmF0ZWQ6ICNmY2IxM2M7XHJcblx0LS1jb2xvci1jaGVja2VkOiAjZmNiMTNjO1xyXG4gIH1cclxuIl19 */"

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
/* harmony import */ var src_app_services_admobfree_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admobfree.service */ "./src/app/services/admobfree.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");







var LivetvPage = /** @class */ (function () {
    function LivetvPage(admob, iab, httpClient, appUpdate, platform) {
        var _this = this;
        this.admob = admob;
        this.iab = iab;
        this.httpClient = httpClient;
        this.appUpdate = appUpdate;
        this.platform = platform;
        // http://tv.bdixsports.com/
        // http://fomny.com/Video/USA/04/HBO/HBO.php
        // http://cdn.crichd.to/embed2.php?id=sonysix
        // http://crichd.ws/update/skys2.php
        // https://www.youtube.com/watch?v=256XTt0pVuA
        this.tvChannels = [];
        this.tvChannelsOutsideBD = [];
        this.indiaChannel = [];
        this.sportsChannel = [];
        this.tv_newspapers = [];
        this.showSegment = 1;
        this.updateUrl = 'https://raw.githubusercontent.com/livetvappbd/livetv-version/master/version.xml';
        this.showUpdateButton = 0;
        platform.ready().then(function () {
            _this.admob.BannerAd();
        });
        // this.tvChannels = [
        //   { channelName: 'BTV World', url: 'https://itpolly.iptv.digijadoo.net/live/btv_world/chunks.m3u8', logo: 'https://i2.wp.com/tvbd.live/wp-content/uploads/2016/11/btv-world.png?fit=400%2C225' },
        //   { channelName: 'Jamuna TV', url: 'https://itpolly.iptv.digijadoo.net/live/jamuna_tv/chunks.m3u8', logo: 'http://www.deshibiz.com/img/media/post/1463733058_jamunatv6.jpg' },
        //   { channelName: 'Somoy News', url: 'https://itpolly.iptv.digijadoo.net/live/somoy_news/chunks.m3u8', logo: 'https://www.freeetv.com/images/03_logo/Somoy_News_Bangladesh.jpg' },
        //   { channelName: 'Ekattur TV', url: 'https://itpolly.iptv.digijadoo.net/live/ekattor_tv/chunks.m3u8', logo: '../../../assets/img/tv-logos/ekattor-tv.png' },
        //   { channelName: 'Independent TV', url: 'https://itpolly.iptv.digijadoo.net/live/independent_tv/chunks.m3u8', logo: '../../../assets/img/tv-logos/independent-tv-logo.png' },
        //   { channelName: 'ATN Bangla', url: 'https://itpolly.iptv.digijadoo.net/live/atn_bangla/chunks.m3u8', logo: '../../../assets/img/tv-logos/atn-bangla-tv.png' },
        //   { channelName: 'CHANNEL 9 ', url: 'https://itpolly.iptv.digijadoo.net/live/channel_9/chunks.m3u8', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Channel9_bd.svg/1280px-Channel9_bd.svg.png', alt: "CHANNEL 9 " },
        //   { channelName: 'SA TV', url: 'https://itpolly.iptv.digijadoo.net/live/sa_tv/playlist.m3u8', logo: '../../../assets/img/tv-logos/satv.png' },
        //   { channelName: 'ATN NEWS', url: 'https://itpolly.iptv.digijadoo.net/live/atn_news/chunks.m3u8', logo: '../../../assets/img/tv-logos/Atn_news.png' },
        //   { channelName: 'Nagorik Tv', url: '"https://itpolly.iptv.digijadoo.net/live/nagorik_tv/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/6ms91aehi2a.png' },
        //   { channelName: 'Boishakhi TV', url: 'https://itpolly.iptv.digijadoo.net/live/boishakhi_tv/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/20mgRCbFLz5.png' },
        //   { channelName: 'DBC News', url: 'https://itpolly.iptv.digijadoo.net/live/dbc_news/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/6GxyIRO4P74.png' },
        //   { channelName: 'Asian TV', url: 'https://itpolly.iptv.digijadoo.net/live/asian_tv/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/84xExHj3DJ8.png' },
        //   { channelName: 'Al Jazeera', url: 'https://www.aljazeera.com/live/', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/0iLtx9H8sr5.png' },
        //   { channelName: 'Channel 24', url: 'https://itpolly.iptv.digijadoo.net/live/channel_24/chunks.m3u8', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4BJaziwAkuVDBZRuNBuArfKqzINnznF863p6bFp48ynoUoa4L' },
        //   { channelName: 'Channeli', url: 'https://itpolly.iptv.digijadoo.net/live/channel_i/chunks.m3u8', logo: 'https://dxtm6s46jarcs.cloudfront.net/wp-content/uploads/2015/03/channel-i-logo.jpg' },
        //   { channelName: 'RTV', url: 'https://itpolly.iptv.digijadoo.net/live/rtv/playlist.m3u8', logo: 'https://www.rtvbd.tv/templates/rtv/img/logo.png' },
        //   { channelName: 'NTV', url: 'https://itpolly.iptv.digijadoo.net/live/ntv/chunks.m3u8', logo: 'https://www.trzcacak.rs/myfile/detail/354-3547607_ntv-logo-bangladesh-tv-channel.png' },
        //   { channelName: 'GTV', url: 'https://itpolly.iptv.digijadoo.net/live/gazi_tv/chunks.m3u8', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsHS9VSC-V5QnK9mbSn0mjZUYxp1QGMAAAY9jc0itHn1dMWZNk' },
        //   { channelName: 'Peace TV', url: 'http://peacetv.ashttp22.visionip.tv/live/peacetv-peacetv-peacetv-bangla-hsslive-25f-16x9-SDh/chunklist.m3u8', logo: 'http://www.desifree.tv/wp-content/uploads/peace-tv.jpg' },
        //   { channelName: 'Gaan Bangla', url: 'https://itpolly.iptv.digijadoo.net/live/gaan_bangla/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/um9o21i3T1E.png' },
        // ];
        this.tvChannels = [
            { channelName: 'BTV World', url: 'https://itpolly.iptv.digijadoo.net/live/btv_world/chunks.m3u8', logo: 'https://i2.wp.com/tvbd.live/wp-content/uploads/2016/11/btv-world.png?fit=400%2C225' },
            { channelName: 'Jamuna TV', url: 'https://itpolly.iptv.digijadoo.net/live/jamuna_tv/chunks.m3u8', logo: 'http://www.deshibiz.com/img/media/post/1463733058_jamunatv6.jpg' },
            { channelName: 'Somoy News', url: 'https://itpolly.iptv.digijadoo.net/live/somoy_news/chunks.m3u8', logo: 'https://www.freeetv.com/images/03_logo/Somoy_News_Bangladesh.jpg' },
            { channelName: 'Ekattur TV', url: 'https://itpolly.iptv.digijadoo.net/live/ekattor_tv/chunks.m3u8', logo: '../../../assets/img/tv-logos/ekattor-tv.png' },
            { channelName: 'Independent TV', url: 'https://itpolly.iptv.digijadoo.net/live/independent_tv/chunks.m3u8', logo: '../../../assets/img/tv-logos/independent-tv-logo.png' },
            { channelName: 'ATN Bangla', url: 'https://itpolly.iptv.digijadoo.net/live/atn_bangla/chunks.m3u8', logo: '../../../assets/img/tv-logos/atn-bangla-tv.png' },
            { channelName: 'CHANNEL 9 ', url: 'https://itpolly.iptv.digijadoo.net/live/channel_9/chunks.m3u8', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Channel9_bd.svg/1280px-Channel9_bd.svg.png', alt: "CHANNEL 9 " },
            { channelName: 'SA TV', url: 'https://itpolly.iptv.digijadoo.net/live/sa_tv/playlist.m3u8', logo: '../../../assets/img/tv-logos/satv.png' },
            { channelName: 'ATN NEWS', url: 'https://itpolly.iptv.digijadoo.net/live/atn_news/chunks.m3u8', logo: '../../../assets/img/tv-logos/Atn_news.png' },
            { channelName: 'Nagorik Tv', url: '"https://itpolly.iptv.digijadoo.net/live/nagorik_tv/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/6ms91aehi2a.png' },
            { channelName: 'Boishakhi TV', url: 'https://itpolly.iptv.digijadoo.net/live/boishakhi_tv/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/20mgRCbFLz5.png' },
            { channelName: 'DBC News', url: 'https://itpolly.iptv.digijadoo.net/live/dbc_news/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/6GxyIRO4P74.png' },
            { channelName: 'Asian TV', url: 'https://itpolly.iptv.digijadoo.net/live/asian_tv/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/84xExHj3DJ8.png' },
            { channelName: 'Al Jazeera', url: 'https://www.aljazeera.com/live/', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/0iLtx9H8sr5.png' },
            { channelName: 'Channel 24', url: 'https://itpolly.iptv.digijadoo.net/live/channel_24/chunks.m3u8', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4BJaziwAkuVDBZRuNBuArfKqzINnznF863p6bFp48ynoUoa4L' },
            { channelName: 'Channeli', url: 'https://itpolly.iptv.digijadoo.net/live/channel_i/chunks.m3u8', logo: 'https://dxtm6s46jarcs.cloudfront.net/wp-content/uploads/2015/03/channel-i-logo.jpg' },
            { channelName: 'RTV', url: 'https://itpolly.iptv.digijadoo.net/live/rtv/playlist.m3u8', logo: 'https://www.rtvbd.tv/templates/rtv/img/logo.png' },
            { channelName: 'NTV', url: 'https://itpolly.iptv.digijadoo.net/live/ntv/chunks.m3u8', logo: 'https://www.trzcacak.rs/myfile/detail/354-3547607_ntv-logo-bangladesh-tv-channel.png' },
            { channelName: 'GTV', url: 'https://itpolly.iptv.digijadoo.net/live/gazi_tv/chunks.m3u8', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsHS9VSC-V5QnK9mbSn0mjZUYxp1QGMAAAY9jc0itHn1dMWZNk' },
            { channelName: 'Peace TV', url: 'http://peacetv.ashttp22.visionip.tv/live/peacetv-peacetv-peacetv-bangla-hsslive-25f-16x9-SDh/chunklist.m3u8', logo: 'http://www.desifree.tv/wp-content/uploads/peace-tv.jpg' },
            { channelName: 'Gaan Bangla', url: 'https://itpolly.iptv.digijadoo.net/live/gaan_bangla/chunks.m3u8', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/um9o21i3T1E.png' },
        ];
        this.tvChannelsOutsideBD = [
            { channelName: 'BTV World', url: 'http://www.jagobd.com/btvworld', logo: 'https://i2.wp.com/tvbd.live/wp-content/uploads/2016/11/btv-world.png?fit=400%2C225' },
            { channelName: 'Jamuna TV', url: 'http://www.jagobd.com/jamunatv', logo: 'http://www.deshibiz.com/img/media/post/1463733058_jamunatv6.jpg' },
            { channelName: 'Somoy News', url: 'http://www.jagobd.com/somoynews', logo: 'https://www.freeetv.com/images/03_logo/Somoy_News_Bangladesh.jpg' },
            { channelName: 'Ekattur TV', url: 'http://www.jagobd.com/ekattortv', logo: '../../../assets/img/tv-logos/ekattor-tv.png' },
            { channelName: 'Independent TV', url: 'http://www.jagobd.com/independent', logo: '../../../assets/img/tv-logos/independent-tv-logo.png' },
            { channelName: 'ATN Bangla', url: 'http://www.jagobd.com/atn-bangla', logo: '../../../assets/img/tv-logos/atn-bangla-tv.png' },
            { channelName: 'SA TV', url: 'http://www.jagobd.com/satv', logo: '../../../assets/img/tv-logos/satv.png' },
            { channelName: 'ATN NEWS', url: 'http://www.jagobd.com/atnnews', logo: '../../../assets/img/tv-logos/Atn_news.png' },
            { channelName: 'Ananda TV', url: 'http://www.jagobd.com/anandatv', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/HRjXQdYEqsE.png' },
            { channelName: 'Mohona TV', url: 'http://www.jagobd.com/mohonatv', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/UU3a2v6E7Zs.png' },
            { channelName: 'Boishakhi TV', url: 'http://www.jagobd.com/boishakhitv', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/20mgRCbFLz5.png' },
            { channelName: 'DBC News', url: 'http://www.jagobd.com/dbcnews', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/6GxyIRO4P74.png' },
            { channelName: 'ATN Islamic TV', url: 'http://www.jagobd.com/atnislamictv', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/DJcpP2t4Mdp.png' },
            { channelName: 'Sangsad Bangla', url: 'http://www.jagobd.com/songsadtv', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/So3Og8HY4uN.png' },
            { channelName: 'Al Jazeera', url: 'https://www.aljazeera.com/live/', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/0iLtx9H8sr5.png' },
            { channelName: 'Channel 24', url: 'http://www.jagobd.com/channel24', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4BJaziwAkuVDBZRuNBuArfKqzINnznF863p6bFp48ynoUoa4L' },
            { channelName: 'Channeli', url: 'http://www.jagobd.com/channeli', logo: 'https://dxtm6s46jarcs.cloudfront.net/wp-content/uploads/2015/03/channel-i-logo.jpg' },
            { channelName: 'RTV', url: 'http://www.jagobd.com/rtv', logo: 'https://www.rtvbd.tv/templates/rtv/img/logo.png' },
            { channelName: 'NEWS24 TV', url: 'http://www.jagobd.com/news24tv', logo: 'http://www.southafricanews24.net/wp-content/uploads/news24.png' },
            { channelName: 'Peace TV', url: 'http://peacetvnetwork.visionip.tv/live/62424', logo: 'http://www.desifree.tv/wp-content/uploads/peace-tv.jpg' },
            { channelName: 'Gaan Bangla', url: 'http://www.jagobd.com/gaanbangla', logo: 'https://cdn.bioscopelive.com/upload/channels/sd/um9o21i3T1E.png' }
        ];
        this.indiaChannel = [
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
        this.appUpdate.checkAppUpdate(this.updateUrl).then(function (update) {
            // alert(JSON.stringify(update)); 
            if (update['code'] === 201) {
                _this.showUpdateButton = 1;
            }
        });
    }
    LivetvPage.prototype.getUpdate = function () {
        ////////////////////////
        // alert("hola");
        // code:201, msg:"success, need update"
        // code:202, msg:"success, up to update"
        var _this = this;
        this.appUpdate.checkAppUpdate(this.updateUrl).then(function (update) {
            // alert(JSON.stringify(update)); 
            _this.showUpdateButton = 0;
        });
        ///////////////////////////
    };
    LivetvPage.prototype.goToChannel = function (url, outside) {
        this.showInterstitial();
        if (!outside) {
            if (url.includes("bioscopelive")) {
                this.iab.create(url, '_system', 'location=no');
            }
            else {
                this.iab.create(url, '_self', 'location=no');
            }
        }
        else {
            window['plugins'].webintent.startActivity({
                action: window['plugins'].webintent.ACTION_VIEW,
                url: "googlechrome://navigate?url=" + url
            }, function () { }, function () {
                alert('Failed to open URL via Android Intent.');
                console.log("Failed to open URL via Android Intent.");
            });
        }
    };
    LivetvPage.prototype.segmentChanged = function (ev) {
        console.log('Segment changed', ev.detail.value);
        this.showSegment = ev.detail.value;
        this.showSegment == 1 ? document.getElementById("ionContentLive").style.setProperty('--background', '#f1f1f1') : document.getElementById("ionContentLive").style.setProperty('--background', '#ffffff');
        this.goToSegment();
    };
    LivetvPage.prototype.goToSegment = function () {
        if (this.showSegment == 1) {
            this.tv_newspapers = this.tvChannels;
        }
        else if (this.showSegment == 2) {
            this.tv_newspapers = this.indiaChannel;
        }
        else if (this.showSegment == 3) {
            this.tv_newspapers = this.sportsChannel;
        }
        var nextButtonNumber = this.showSegment;
        document.getElementById(String(nextButtonNumber)).click();
        var buttonWidth = document.getElementById(String(nextButtonNumber)).offsetWidth;
        document.getElementById('segment').scrollLeft = nextButtonNumber * buttonWidth - buttonWidth;
    };
    LivetvPage.prototype.swipeLeftPress = function ($event) {
        this.showSegment = Number(this.showSegment) + 1;
        // if(this.showSegment>2) {
        //  this.showSegment=1;
        // }
        this.goToSegment();
    };
    LivetvPage.prototype.swipeRightPress = function ($event) {
        this.showSegment = Number(this.showSegment) - 1;
        // if(this.showSegment<1) {
        //  this.showSegment=2;
        // }
        this.goToSegment();
    };
    LivetvPage.prototype.ngOnInit = function () {
    };
    LivetvPage.prototype.showInterstitial = function () {
        this.admob.InterstitialAd();
    };
    LivetvPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-livetv',
            template: __webpack_require__(/*! ./livetv.page.html */ "./src/app/pages/livetv/livetv.page.html"),
            styles: [__webpack_require__(/*! ./livetv.page.scss */ "./src/app/pages/livetv/livetv.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_admobfree_service__WEBPACK_IMPORTED_MODULE_5__["AdmobFreeService"],
            _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_2__["InAppBrowser"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _ionic_native_app_update_ngx__WEBPACK_IMPORTED_MODULE_4__["AppUpdate"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"]])
    ], LivetvPage);
    return LivetvPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-livetv-livetv-module.js.map