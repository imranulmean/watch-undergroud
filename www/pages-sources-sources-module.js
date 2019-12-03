(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-sources-sources-module"],{

/***/ "./src/app/pages/sources/sources.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/sources/sources.module.ts ***!
  \*************************************************/
/*! exports provided: SourcesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourcesPageModule", function() { return SourcesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sources_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sources.page */ "./src/app/pages/sources/sources.page.ts");







var routes = [
    {
        path: '',
        component: _sources_page__WEBPACK_IMPORTED_MODULE_6__["SourcesPage"]
    }
];
var SourcesPageModule = /** @class */ (function () {
    function SourcesPageModule() {
    }
    SourcesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_sources_page__WEBPACK_IMPORTED_MODULE_6__["SourcesPage"]]
        })
    ], SourcesPageModule);
    return SourcesPageModule;
}());



/***/ }),

/***/ "./src/app/pages/sources/sources.page.html":
/*!*************************************************!*\
  !*** ./src/app/pages/sources/sources.page.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n      <img src=\"../../../assets/img/logo-200.png\" height=\"35\" />\r\n    </ion-buttons>\r\n    <ion-title>উৎস</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n\r\n  <ion-grid>\r\n    <ion-row>\r\n      <ion-col>\r\n        <ion-card>\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/Bangla_Tribune_logo.png\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>Bangla Tribune</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n      <ion-col>\r\n        <ion-card>\r\n\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/bbc.png\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>BBC</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col>\r\n        <ion-card>\r\n\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/bdnews24-logo.png\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>Bdnews24</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n      <ion-col>\r\n        <ion-card>\r\n\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/daily-star.svg\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>The Daily Star</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col>\r\n        <ion-card>\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/jugantor.png\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>Jugantor</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n      <ion-col>\r\n        <ion-card>\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/prothom-alo.png\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>Prothom Alo</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col>\r\n        <ion-card>\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/somokal.png\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>Somokal</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n      <ion-col>\r\n        <ion-card>\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/tt-logo.png\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>Techtunes</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col>\r\n        <ion-card>\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/The_Washington_Post_logo_newspaper.png\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>The Washington Post</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n      <ion-col>\r\n        <ion-card>\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/banglanews_logo.jpg\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>Banglanews24</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col>\r\n        <ion-card>\r\n          <img class=\"logos\" src=\"../../../assets/img/news-source-icons/Bengal-Beats-Logo.png\"/>\r\n          <ion-card-header>\r\n            <ion-card-subtitle>Bengal Beats</ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </ion-col>\r\n      <ion-col>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/sources/sources.page.scss":
/*!*************************************************!*\
  !*** ./src/app/pages/sources/sources.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-toolbar {\n  --background: #fe8c00; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvc291cmNlcy9EOlxcTk9ERUpTIEFQUFxcSW9uaWM0XFxzaG9iLWtob2JvciAzXFxzaG9iLWtob2Jvci9zcmNcXGFwcFxccGFnZXNcXHNvdXJjZXNcXHNvdXJjZXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kscUJBQWEsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3NvdXJjZXMvc291cmNlcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tdG9vbGJhciB7XHJcbiAgICAtLWJhY2tncm91bmQ6ICNmZThjMDA7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/sources/sources.page.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/sources/sources.page.ts ***!
  \***********************************************/
/*! exports provided: SourcesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourcesPage", function() { return SourcesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SourcesPage = /** @class */ (function () {
    function SourcesPage() {
    }
    SourcesPage.prototype.ngOnInit = function () {
    };
    SourcesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sources',
            template: __webpack_require__(/*! ./sources.page.html */ "./src/app/pages/sources/sources.page.html"),
            styles: [__webpack_require__(/*! ./sources.page.scss */ "./src/app/pages/sources/sources.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SourcesPage);
    return SourcesPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-sources-sources-module.js.map