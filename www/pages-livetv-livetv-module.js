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

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n      <ion-buttons slot=\"start\">\r\n        <ion-menu-button></ion-menu-button>\r\n        <img src=\"../../../assets/img/logo-200.png\" height=\"35\">\r\n      </ion-buttons>\r\n    <ion-title>লাইভ টিভি ও পত্রিকা</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-toolbar id=\"segment\">\r\n  <ion-segment (ionChange)=\"segmentChanged($event)\" value=\"1\" scrollable >\r\n    <ion-segment-button value=\"1\" id=\"1\">\r\n      <ion-label><b>লাইভ টিভি</b></ion-label>\r\n    </ion-segment-button>\r\n    <ion-segment-button value=\"2\" id=\"2\">\r\n      <ion-label><b>পত্রিকা</b></ion-label>\r\n    </ion-segment-button>\r\n  </ion-segment>\r\n</ion-toolbar>\r\n\r\n<ion-content id=\"ionContentLive\" (swipeleft)=\"swipeLeftPress($event)\" (swiperight)=\"swipeRightPress($event)\">\r\n\r\n <ion-row >\r\n  <ion-col size=\"6\" *ngFor=\"let c of tv_newspapers\" (click)=goToChannel(c.url)>\r\n    <ion-card *ngIf=\"showSegment==1\">\r\n      <img src=\"{{c.logo}}\" class=\"tv-logo\">\r\n      <!-- <ion-label color=\"warning\">{{c.channelName}}</ion-label> -->\r\n    </ion-card>\r\n\r\n    <ion-card *ngIf=\"showSegment==2\" style=\"height: 4em;\">\r\n      <img src=\"{{c.logo}}\" class=\"newpaperLogo\">\r\n    </ion-card>  \r\n\r\n    </ion-col>  \r\n  </ion-row>\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/livetv/livetv.page.scss":
/*!***********************************************!*\
  !*** ./src/app/pages/livetv/livetv.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-toolbar {\n  --background: #fe8c00; }\n\nion-content {\n  /*--background: #424242;*/\n  --background:#f1f1f1\r\n; }\n\n#segment {\n  --background: #fabc5a1b; }\n\n.newpaperLogo {\n  margin-top: 0.5em; }\n\n.tv-logo {\n  /*\tmax-height: 50px;\r\n\twidth: unset;*/\n  margin: 0 auto;\n  height: 6em; }\n\n.newpaperHeader {\n  padding: 0 0 1em 0.2em; }\n\nion-segment-button {\n  border: none;\n  font-weight: 900;\n  font-size: 0.8em;\n  --indicator-color-checked: #fcb13c;\n  --color-activated: #fcb13c;\n  --color-checked: #fcb13c; }\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbGl2ZXR2L0Q6XFxOT0RFSlMgQVBQXFxJb25pYzRcXHNob2Ita2hvYm9yIDNcXHNob2Ita2hvYm9yL3NyY1xcYXBwXFxwYWdlc1xcbGl2ZXR2XFxsaXZldHYucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9saXZldHYvbGl2ZXR2LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFCQUFhLEVBQUE7O0FBRWpCO0VBQ0kseUJBQUE7RUFDQTtBQUFhLEVBQUE7O0FBRWpCO0VBQ0MsdUJBQWEsRUFBQTs7QUFFZDtFQUNDLGlCQUFpQixFQUFBOztBQUdsQjtFQUNBO2VDQ2U7RURDZCxjQUFjO0VBQ2QsV0FBVyxFQUFBOztBQUdaO0VBQ0Msc0JBQXNCLEVBQUE7O0FBR3ZCO0VBQ0MsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsa0NBQTBCO0VBQzFCLDBCQUFrQjtFQUNsQix3QkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2xpdmV0di9saXZldHYucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXRvb2xiYXIge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjZmU4YzAwO1xyXG59XHJcbmlvbi1jb250ZW50IHtcclxuICAgIC8qLS1iYWNrZ3JvdW5kOiAjNDI0MjQyOyovXHJcbiAgICAtLWJhY2tncm91bmQ6I2YxZjFmMVxyXG59XHJcbiNzZWdtZW50e1xyXG5cdC0tYmFja2dyb3VuZDogI2ZhYmM1YTFiO1xyXG59XHJcbi5uZXdwYXBlckxvZ297XHJcblx0bWFyZ2luLXRvcDogMC41ZW07XHJcbn1cclxuXHJcbi50di1sb2dve1xyXG4vKlx0bWF4LWhlaWdodDogNTBweDtcclxuXHR3aWR0aDogdW5zZXQ7Ki9cclxuXHRtYXJnaW46IDAgYXV0bztcclxuXHRoZWlnaHQ6IDZlbTtcclxufVxyXG5cclxuLm5ld3BhcGVySGVhZGVye1xyXG5cdHBhZGRpbmc6IDAgMCAxZW0gMC4yZW07XHJcbn1cclxuXHJcbmlvbi1zZWdtZW50LWJ1dHRvbiB7XHJcblx0Ym9yZGVyOiBub25lO1xyXG5cdGZvbnQtd2VpZ2h0OiA5MDA7XHJcblx0Zm9udC1zaXplOiAwLjhlbTtcclxuXHQtLWluZGljYXRvci1jb2xvci1jaGVja2VkOiAjZmNiMTNjO1xyXG5cdC0tY29sb3ItYWN0aXZhdGVkOiAjZmNiMTNjO1xyXG5cdC0tY29sb3ItY2hlY2tlZDogI2ZjYjEzYztcclxuICB9IiwiaW9uLXRvb2xiYXIge1xuICAtLWJhY2tncm91bmQ6ICNmZThjMDA7IH1cblxuaW9uLWNvbnRlbnQge1xuICAvKi0tYmFja2dyb3VuZDogIzQyNDI0MjsqL1xuICAtLWJhY2tncm91bmQ6I2YxZjFmMVxyXG47IH1cblxuI3NlZ21lbnQge1xuICAtLWJhY2tncm91bmQ6ICNmYWJjNWExYjsgfVxuXG4ubmV3cGFwZXJMb2dvIHtcbiAgbWFyZ2luLXRvcDogMC41ZW07IH1cblxuLnR2LWxvZ28ge1xuICAvKlx0bWF4LWhlaWdodDogNTBweDtcclxuXHR3aWR0aDogdW5zZXQ7Ki9cbiAgbWFyZ2luOiAwIGF1dG87XG4gIGhlaWdodDogNmVtOyB9XG5cbi5uZXdwYXBlckhlYWRlciB7XG4gIHBhZGRpbmc6IDAgMCAxZW0gMC4yZW07IH1cblxuaW9uLXNlZ21lbnQtYnV0dG9uIHtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXdlaWdodDogOTAwO1xuICBmb250LXNpemU6IDAuOGVtO1xuICAtLWluZGljYXRvci1jb2xvci1jaGVja2VkOiAjZmNiMTNjO1xuICAtLWNvbG9yLWFjdGl2YXRlZDogI2ZjYjEzYztcbiAgLS1jb2xvci1jaGVja2VkOiAjZmNiMTNjOyB9XG4iXX0= */"

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




var LivetvPage = /** @class */ (function () {
    function LivetvPage(iab, httpClient) {
        this.iab = iab;
        this.httpClient = httpClient;
        this.tvChannels = [];
        this.newsPapers = [];
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
        this.newsPapers = [
            // https://www.dsebd.org/images/logo.png
            // https://www.dsebd.org/images/dse-name.jpg
            { channelName: 'www.dsebd.org', url: 'https://www.dsebd.org/', logo: '../../../assets/img/news-source-icons/dse-name.jpg' },
            { channelName: 'Bangladesh Pratidin', url: 'https://www.bd-pratidin.com/', logo: 'https://www.bd-pratidin.com/assets/importent_images/main_logo.gif?v=1567837737' },
            { channelName: 'Kaler Kantho', url: 'https://www.kalerkantho.com/index.php', logo: 'https://www.kalerkantho.com/assets/site/img/logo.png' },
            { channelName: 'Jugantor', url: 'https://www.jugantor.com/', logo: 'https://www.jugantor.com/templates/jugantor-v2/images/logo_main.png?v=1' },
            { channelName: 'Ittefaq', url: 'https://www.ittefaq.com.bd/', logo: 'https://www.ittefaq.com.bd/templates/desktop-v1/images/main-logo.png' },
            { channelName: 'Manab Zamin', url: 'http://www.mzamin.com/', logo: 'http://www.mzamin.com/asset/images/logos.png' },
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
            { channelName: 'banglanews24.com', url: 'https://www.banglanews24.com', logo: 'https://www.banglanews24.com/media/imgAll/2016October/bg/banglanews_logo20180725112204.jpg' },
            { channelName: 'dailystockbangladesh', url: 'https://www.dailystockbangladesh.com', logo: '../../../assets/img/news-source-icons/dailystock.png' },
        ];
        this.tv_newspapers = this.tvChannels;
    }
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
        this.tv_newspapers = this.showSegment == 1 ? this.tvChannels : this.newsPapers;
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
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_2__["InAppBrowser"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], LivetvPage);
    return LivetvPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-livetv-livetv-module.js.map