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

module.exports = "<ion-header>\r\n\t<ion-toolbar color=\"dark\">\r\n\t\t<ion-buttons slot=\"start\">\r\n\t\t\t<ion-button>\r\n\t\t\t\t<img height=\"30\" src=\"../../../assets/icon/icon.png\" />\r\n\t\t\t</ion-button>\r\n\t\t</ion-buttons>\r\n\t\t<ion-title style=\"padding:0\">আমাদের টিভি \r\n<!-- \t\t\t<ion-chip style=\"padding:0\">\r\n\t\t\t  <ion-label color=\"danger\" outline=true (click)=changeScreen()>Change Screen</ion-label>\r\n\t\t\t</ion-chip> -->\r\n\t\t</ion-title>\r\n\t\t\r\n\t</ion-toolbar>\r\n\t<ion-toolbar id=\"segment\" *ngIf=\"showUpdateButton==1\">\r\n\t\t<ion-button color=\"danger\" expand=\"full\" (click)=getUpdate()>এখনই আপডেট করুন</ion-button>\r\n\t</ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n\r\n\r\n\t<ion-grid class=\"ion-no-padding\">\r\n\r\n\t\t<ion-row class=\"ion-no-padding\">\r\n\t\t\t<ion-col class=\"ion-no-padding\">\r\n\t\t\t\t<div class=\"thumnails\">\r\n\t\t\t\t\t<div class=\"list-thumbnail\">\r\n\t\t\t\t\t\t<div class=\"img-thumb\" *ngFor=\"let c of featuredGang\"  (click)=\"openModal(c)\">\r\n\t\t\t\t\t\t\t<img src=\"{{c.featuredLogo}}\" class=\"tv-logo\">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</ion-col>\r\n\t\t</ion-row>\r\n<!-- \t\t<ion-row class=\"ion-no-padding\">\r\n\t\t\t<ion-col *ngFor=\"let f of featuredGang\" size=\"6\">\r\n\t\t\t\t<ion-card (click)=openModal(f)>\r\n\t\t\t\t\t<img height=\"70\" src=\"{{f.featuredLogo}}\" />\r\n\t\t\t\t</ion-card>\r\n\t\t\t</ion-col>\r\n\t\t</ion-row> -->\r\n\r\n\t\t<ion-row *ngFor=\"let g of channelsGang\">\r\n\t\t\t<ion-col class=\"ion-no-padding\">\r\n\t\t\t\t<ion-text color=\"dark\">\r\n\t\t\t\t\t<h5 class=\"left-padding\">{{g.channelCategory}}:</h5>\r\n\t\t\t\t</ion-text>\r\n\t\t\t\t<div class=\"thumnails\">\r\n\t\t\t\t\t<div class=\"list-thumbnail\">\r\n<!-- \t\t\t\t\t\t<div class=\"img-thumb\" *ngFor=\"let c of g.channels\" \r\n\t\t\t\t\t\t(click)=\"goToChannel(c.url,g.outside,c.videoPlayer,g.streamingMedia)\"> -->\r\n\t\t\t\t\t\t<div class=\"img-thumb\" *ngFor=\"let c of g.channels\" (click)=\"openModal(c,g)\">\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<img src=\"{{c.logo}}\" class=\"tv-logo\">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</ion-col>\r\n\t\t</ion-row>\r\n\t</ion-grid>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/livetv/livetv.page.scss":
/*!***********************************************!*\
  !*** ./src/app/pages/livetv/livetv.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: linear-gradient(to top, white 0%, #dfe9f3 100%); }\n\n.thumnails {\n  overflow-x: scroll;\n  overflow-y: hidden; }\n\n.img-thumb {\n  display: inline-block;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  padding: 3px;\n  margin: 0 0.5em 0 0; }\n\n.list-thumbnail {\n  height: 100%;\n  white-space: nowrap; }\n\n.newpaperLogo {\n  margin-top: 0.5em; }\n\n.tv-logo {\n  margin: 0 auto;\n  height: 6em; }\n\n.left-padding {\n  padding-left: 5px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbGl2ZXR2L0Q6XFxOT0RFSlMgQVBQXFxJb25pYzRcXHdhdGNoLXVuZGVyZ3JvdWQvc3JjXFxhcHBcXHBhZ2VzXFxsaXZldHZcXGxpdmV0di5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSw2REFBYSxFQUFBOztBQUdmO0VBQ0Usa0JBQWtCO0VBQ2xCLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixtQkFBa0IsRUFBQTs7QUFFcEI7RUFDQyxZQUFZO0VBQ1osbUJBQW1CLEVBQUE7O0FBSXBCO0VBQ0MsaUJBQWlCLEVBQUE7O0FBR2xCO0VBQ0MsY0FBYztFQUNkLFdBQVcsRUFBQTs7QUFHWjtFQUNFLGlCQUFpQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbGl2ZXR2L2xpdmV0di5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudHtcclxuICAvLyAtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsICNkZmU5ZjMgMCUsIHdoaXRlIDEwMCUpO1xyXG4gIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgd2hpdGUgMCUsICNkZmU5ZjMgMTAwJSk7XHJcbn1cclxuXHJcbi50aHVtbmFpbHN7XHJcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xyXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcclxufVxyXG5cclxuLmltZy10aHVtYntcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgcGFkZGluZzogM3B4O1xyXG4gIG1hcmdpbjowIDAuNWVtIDAgMDsgXHJcbn1cclxuLmxpc3QtdGh1bWJuYWlse1xyXG5cdGhlaWdodDogMTAwJTtcclxuXHR3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG5cclxufVxyXG5cclxuLm5ld3BhcGVyTG9nb3tcclxuXHRtYXJnaW4tdG9wOiAwLjVlbTtcclxufVxyXG5cclxuLnR2LWxvZ297XHJcblx0bWFyZ2luOiAwIGF1dG87XHJcblx0aGVpZ2h0OiA2ZW07XHJcbn1cclxuXHJcbi5sZWZ0LXBhZGRpbmd7XHJcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XHJcbn0iXX0= */"

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
/* harmony import */ var _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/screen-orientation/ngx */ "./node_modules/@ionic-native/screen-orientation/ngx/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");














var LivetvPage = /** @class */ (function () {
    function LivetvPage(admob, iab, httpClient, appUpdate, platform, channelService, loadingController, streamingMedia, modalController, screenOrientation, router) {
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
        this.screenOrientation = screenOrientation;
        this.router = router;
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
        // Cartoon Network:https://www.streamlive.to/view/76674/Cartoon%20Network%20(SD)
        // sony hd:http://216.144.250.174/Sony_TV_HD_02/playlist.m3u8 	
        // sony six:https://wicket.pw/watch-sony-six-live-hd-quality/
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
        // this.screenOrientation.unlock();	    
    }
    LivetvPage.prototype.changeScreen = function () {
        if (this.screenOrientation.type.includes("portrait")) {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        }
        else {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        }
    };
    LivetvPage.prototype.openModal = function (featureObject, allChannelGangObj) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this.showInterstitial();
                        if (allChannelGangObj) {
                            featureObject['streamingMedia'] = allChannelGangObj['streamingMedia'];
                            featureObject['featuredLogo'] = featureObject.logo;
                            featureObject['channelCategory'] = featureObject.channelName;
                        }
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
    LivetvPage.prototype.goToChannel = function (url, outside, insidePlayer, streamingMedia) {
        // this.showInterstitial();
        this.channelService.goToChannel(url, outside, insidePlayer, streamingMedia);
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
            _ionic_native_streaming_media_ngx__WEBPACK_IMPORTED_MODULE_8__["StreamingMedia"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"],
            _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_10__["ScreenOrientation"], _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"]])
    ], LivetvPage);
    return LivetvPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-livetv-livetv-module.js.map