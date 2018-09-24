webpackJsonp([12],{

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddNoticePageModule", function() { return AddNoticePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_notice__ = __webpack_require__(293);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddNoticePageModule = /** @class */ (function () {
    function AddNoticePageModule() {
    }
    AddNoticePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_notice__["a" /* AddNoticePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_notice__["a" /* AddNoticePage */]),
            ],
        })
    ], AddNoticePageModule);
    return AddNoticePageModule;
}());

//# sourceMappingURL=add-notice.module.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddNoticePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_notices_notices__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddNoticePage = /** @class */ (function () {
    function AddNoticePage(_navCtrl, _navParams, _noticeProvider, _viewCtrl, _userProvider) {
        this._navCtrl = _navCtrl;
        this._navParams = _navParams;
        this._noticeProvider = _noticeProvider;
        this._viewCtrl = _viewCtrl;
        this._userProvider = _userProvider;
        this.title = '';
        this.message = '';
        this.existingNotice = false;
        this.submitAttempt = false;
    }
    AddNoticePage.prototype.ionViewDidLoad = function () {
        if (typeof (this._navParams.get('notice')) !== 'undefined') {
            this.existingNotice = this._navParams.get('notice');
            this.title = this.existingNotice.title;
            this.message = this.existingNotice.message;
        }
    };
    AddNoticePage.prototype.saveNotice = function () {
        if (this.title.length > 0) {
            var iso = this.getDateISOString();
            this._noticeProvider.saveNotice({
                doc: this.existingNotice,
                title: this.title,
                message: this.message,
                author: this._userProvider.currentUser.user_id,
                dateCreated: iso,
                dateUpdated: iso
            });
            this._viewCtrl.dismiss();
        }
    };
    AddNoticePage.prototype.getDateISOString = function () {
        return new Date().toISOString();
    };
    AddNoticePage.prototype.close = function () {
        this._viewCtrl.dismiss();
    };
    AddNoticePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-notice',template:/*ion-inline-start:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/pages/add-notice/add-notice.html"*/'<ion-header>\n\n    <ion-navbar color="primary">\n  \n      <ion-title>Add Notice</ion-title>\n  \n      <ion-buttons right>\n          <button ion-button icon-only class="close-modal-button" (click)="close()"><ion-icon name="close"></ion-icon></button>\n      </ion-buttons>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content>\n  \n      <ion-card>\n  \n          <ion-item class="title-input">\n              <ion-label>Title:</ion-label>\n              <ion-input type="text" [(ngModel)]="title" placeholder="(required)"></ion-input>\n          </ion-item>\n  \n          <ion-item class="message-input">\n              <ion-textarea [(ngModel)]="message" placeholder="type your message..."></ion-textarea>\n          </ion-item>\n  \n          <button ion-button class="save-notice-button" (click)="saveNotice()">Save Notice</button>\n  \n      </ion-card>\n  \n  </ion-content>\n'/*ion-inline-end:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/pages/add-notice/add-notice.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_notices_notices__["a" /* NoticesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_notices_notices__["a" /* NoticesProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */]) === "function" && _e || Object])
    ], AddNoticePage);
    return AddNoticePage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=add-notice.js.map

/***/ })

});
//# sourceMappingURL=12.js.map