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

module.exports = "<ion-header>\n\t<ion-toolbar color=\"dark\">\n\t\t<ion-buttons slot=\"start\">\n\t\t\t<ion-button>\n\t\t\t\t<img height=\"30\" src=\"../../../assets/icon/icon.png\" />\n\t\t\t</ion-button>\n\t\t</ion-buttons>\n\t\t<ion-title>আমাদের টিভি</ion-title>\n\t</ion-toolbar>\n\t<ion-toolbar id=\"segment\" *ngIf=\"showUpdateButton==1\">\n\t\t<ion-button color=\"danger\" expand=\"full\" (click)=getUpdate()>এখনই আপডেট করুন</ion-button>\n\t</ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-no-padding\">\n\n\n\t<ion-grid class=\"ion-no-padding\">\n\n\t\t<ion-row class=\"ion-no-padding\">\n\t\t\t<ion-col class=\"ion-no-padding\">\n\t\t\t\t<div class=\"thumnails\">\n\t\t\t\t\t<div class=\"list-thumbnail\">\n\t\t\t\t\t\t<div class=\"img-thumb\" *ngFor=\"let c of featuredGang\"  (click)=\"openModal(c)\">\n\t\t\t\t\t\t\t<img src=\"{{c.featuredLogo}}\" class=\"tv-logo\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</ion-col>\n\t\t</ion-row>\n<!-- \t\t<ion-row class=\"ion-no-padding\">\n\t\t\t<ion-col *ngFor=\"let f of featuredGang\" size=\"6\">\n\t\t\t\t<ion-card (click)=openModal(f)>\n\t\t\t\t\t<img height=\"70\" src=\"{{f.featuredLogo}}\" />\n\t\t\t\t</ion-card>\n\t\t\t</ion-col>\n\t\t</ion-row> -->\n\n\t\t<ion-row *ngFor=\"let g of channelsGang\">\n\t\t\t<ion-col class=\"ion-no-padding\">\n\t\t\t\t<ion-text color=\"dark\">\n\t\t\t\t\t<h5 class=\"left-padding\">{{g.channelCategory}}:</h5>\n\t\t\t\t</ion-text>\n\t\t\t\t<div class=\"thumnails\">\n\t\t\t\t\t<div class=\"list-thumbnail\">\n\t\t\t\t\t\t<div class=\"img-thumb\" *ngFor=\"let c of g.channels\" \n\t\t\t\t\t\t(click)=\"goToChannel(c.url,g.outside,c.videoPlayer)\">\n\t\t\t\t\t\t\t<img src=\"{{c.logo}}\" class=\"tv-logo\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</ion-col>\n\t\t</ion-row>\n\t</ion-grid>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/livetv/livetv.page.scss":
/*!***********************************************!*\
  !*** ./src/app/pages/livetv/livetv.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: linear-gradient(to top, white 0%, #dfe9f3 100%); }\n\n.thumnails {\n  overflow-x: scroll;\n  overflow-y: hidden; }\n\n.img-thumb {\n  display: inline-block;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  padding: 3px;\n  margin: 0 0.5em 0 0; }\n\n.list-thumbnail {\n  height: 100%;\n  white-space: nowrap; }\n\n.newpaperLogo {\n  margin-top: 0.5em; }\n\n.tv-logo {\n  margin: 0 auto;\n  height: 6em; }\n\n.left-padding {\n  padding-left: 5px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9haGF5ZGVyL1dvcmsvd2F0Y2gtdW5kZXJncm91ZC9zcmMvYXBwL3BhZ2VzL2xpdmV0di9saXZldHYucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUUsNkRBQWEsRUFBQTs7QUFHZjtFQUNFLGtCQUFrQjtFQUNsQixrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxxQkFBcUI7RUFDckIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osbUJBQWtCLEVBQUE7O0FBRXBCO0VBQ0MsWUFBWTtFQUNaLG1CQUFtQixFQUFBOztBQUlwQjtFQUNDLGlCQUFpQixFQUFBOztBQUdsQjtFQUNDLGNBQWM7RUFDZCxXQUFXLEVBQUE7O0FBR1o7RUFDRSxpQkFBaUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2xpdmV0di9saXZldHYucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnR7XG4gIC8vIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgI2RmZTlmMyAwJSwgd2hpdGUgMTAwJSk7XG4gIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgd2hpdGUgMCUsICNkZmU5ZjMgMTAwJSk7XG59XG5cbi50aHVtbmFpbHN7XG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xufVxuXG4uaW1nLXRodW1ie1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogM3B4O1xuICBtYXJnaW46MCAwLjVlbSAwIDA7IFxufVxuLmxpc3QtdGh1bWJuYWlse1xuXHRoZWlnaHQ6IDEwMCU7XG5cdHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbn1cblxuLm5ld3BhcGVyTG9nb3tcblx0bWFyZ2luLXRvcDogMC41ZW07XG59XG5cbi50di1sb2dve1xuXHRtYXJnaW46IDAgYXV0bztcblx0aGVpZ2h0OiA2ZW07XG59XG5cbi5sZWZ0LXBhZGRpbmd7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xufSJdfQ== */"

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
/* harmony import */ var _services_all_channel_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/all-channel.service */ "./src/app/services/all-channel.service.ts");
/* harmony import */ var _ionic_native_streaming_media_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/streaming-media/ngx */ "./node_modules/@ionic-native/streaming-media/ngx/index.js");
/* harmony import */ var _example_modal_example_modal_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../example-modal/example-modal.page */ "./src/app/pages/example-modal/example-modal.page.ts");












var LivetvPage = /** @class */ (function () {
    function LivetvPage(admob, iab, httpClient, appUpdate, platform, channelService, loadingController, streamingMedia, modalController) {
        var _this = this;
        this.admob = admob;
        this.iab = iab;
        this.httpClient = httpClient;
        this.appUpdate = appUpdate;
        this.platform = platform;
        this.channelService = channelService;
        this.loadingController = loadingController;
        this.streamingMedia = streamingMedia;
        this.modalController = modalController;
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
        this.showSegment = 1;
        this.updateUrl = 'https://raw.githubusercontent.com/livetvappbd/livetv-version/master/version.xml';
        this.showUpdateButton = 0;
        this.platform.ready().then(function () {
            _this.admob.BannerAd();
        });
        this.showAutoHideLoader();
        this.appUpdate.checkAppUpdate(this.updateUrl).then(function (update) {
            // alert(JSON.stringify(update)); 
            if (update['code'] === 201) {
                _this.showUpdateButton = 1;
            }
        });
    }
    LivetvPage.prototype.openModal = function (featureObject) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showInterstitial();
                        return [4 /*yield*/, this.modalController.create({
                                component: _example_modal_example_modal_page__WEBPACK_IMPORTED_MODULE_9__["ExampleModalPage"],
                                componentProps: {
                                    "featureObject": featureObject
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (dataReturned) { });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LivetvPage.prototype.showAutoHideLoader = function () {
        var _this = this;
        this.loadingController.create({
            spinner: 'crescent',
            cssClass: 'loader',
        }).then(function (res) {
            res.present();
            _this.channelService.getChannels().subscribe(function (res) {
                _this.channelsGang = res;
                _this.loadingController.dismiss();
                console.log(_this.channelsGang);
            });
            _this.channelService.getFeaturedGames().subscribe(function (res) {
                _this.featuredGang = res;
                //this.loadingController.dismiss();
                console.log(_this.featuredGang);
            });
            res.onDidDismiss().then(function (dis) {
            });
        });
    };
    LivetvPage.prototype.goToChannel = function (url, outside, insidePlayer) {
        this.showInterstitial();
        this.channelService.goToChannel(url, outside, insidePlayer);
    };
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
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"],
            _services_all_channel_service__WEBPACK_IMPORTED_MODULE_7__["AllChannelService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["LoadingController"],
            _ionic_native_streaming_media_ngx__WEBPACK_IMPORTED_MODULE_8__["StreamingMedia"], _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"]])
    ], LivetvPage);
    return LivetvPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-livetv-livetv-module.js.map