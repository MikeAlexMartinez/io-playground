webpackJsonp([1],{

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoticesPageModule", function() { return NoticesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notices__ = __webpack_require__(302);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NoticesPageModule = /** @class */ (function () {
    function NoticesPageModule() {
    }
    NoticesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notices__["a" /* NoticesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notices__["a" /* NoticesPage */]),
            ],
        })
    ], NoticesPageModule);
    return NoticesPageModule;
}());

//# sourceMappingURL=notices.module.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_notices_notices__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NoticesPage = /** @class */ (function () {
    function NoticesPage(_navCtrl, _alertCtrl, _modalCtrl, _noticesProvider, _userProvider, _authProvider) {
        this._navCtrl = _navCtrl;
        this._alertCtrl = _alertCtrl;
        this._modalCtrl = _modalCtrl;
        this._noticesProvider = _noticesProvider;
        this._userProvider = _userProvider;
        this._authProvider = _authProvider;
        this.notices = [];
        // Just some test notices for now
        this.notices = [
            { title: 'hello', message: 'this is a message', author: 'test' },
            { title: 'hello', message: 'this is a message', author: 'test' }
        ];
    }
    NoticesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this._noticesProvider.init();
        this._noticesProvider.getNotices().subscribe(function (notices) {
            _this.notices = notices;
            if (_this.notices.length === 0) {
                _this.notices.push({
                    author: 'Hanqz Admin',
                    title: 'Welcome!',
                    message: 'Looks like there aren\'t any notices yet. Click the \'+\' symbol to add one.'
                });
            }
        });
    };
    NoticesPage.prototype.openAddNoticePage = function (notice) {
        var modal = this._modalCtrl.create('AddNoticePage', {
            notice: notice
        });
        modal.present();
    };
    NoticesPage.prototype.deleteNotice = function (notice) {
        var _this = this;
        var confirm = this._alertCtrl.create({
            title: 'Delete this notice?',
            message: 'Deleting this notice will remove it permanently.',
            buttons: [
                {
                    text: 'Delete',
                    handler: function () {
                        _this._noticesProvider.deleteNotice(notice);
                    }
                },
                {
                    text: 'Keep it'
                }
            ]
        });
        confirm.present();
    };
    NoticesPage.prototype.logout = function () {
        this._authProvider.logout();
    };
    NoticesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notices',template:/*ion-inline-start:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/pages/notices/notices.html"*/'<ion-header no-border>\n\n  <ion-navbar color="primary">\n    <ion-title>Notices</ion-title>\n\n    <ion-buttons left>\n      <button (click)="logout()" class="logout-button" ion-button icon-only><ion-icon name="log-out"></ion-icon></button>\n    </ion-buttons>\n\n    <ion-buttons right>\n      <button (click)="openAddNoticePage()" class="add-notice-button" ion-button icon-only><ion-icon name="add"></ion-icon></button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list class="notice-list" no-lines>\n    <ion-card class="notice-cards" *ngFor="let notice of notices">\n\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="https://api.adorable.io/avatars/100/{{notice.author}}">\n        </ion-avatar>\n        <h2>{{notice.author}}</h2>\n      </ion-item>\n\n      <ion-card-content>\n        <div class="mega-text">\n          <p>{{notice.title}}</p>\n        </div>\n        <p class="message-content">{{notice.message}}</p>\n      </ion-card-content>\n\n      <div\n        *ngIf="notice.author === userProvider?.currentUser?.user_id"\n        class="control-buttons"\n      >\n        <button\n          (click)="deleteNotice(notice)"\n          color="light"\n          class="delete-notice-button"\n          ion-button\n          icon-left\n          clear\n          small\n        >\n          <ion-icon name="trash"></ion-icon>\n          <div>delete</div>\n        </button>\n        <button (click)="openAddNoticePage(notice)" color="primary" class="edit-notice-button" ion-button icon-left clear small>\n          <ion-icon name="book"></ion-icon>\n          <div>edit</div>\n        </button>\n      </div>\n\n    </ion-card>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/pages/notices/notices.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_notices_notices__["a" /* NoticesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */]])
    ], NoticesPage);
    return NoticesPage;
}());

//# sourceMappingURL=notices.js.map

/***/ })

});
//# sourceMappingURL=1.js.map