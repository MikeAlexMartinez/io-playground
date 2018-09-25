webpackJsonp([2],{

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, authProvider, dataProvider, userProvider, loadingCtrl, zone) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.dataProvider = dataProvider;
        this.userProvider = userProvider;
        this.loadingCtrl = loadingCtrl;
        this.zone = zone;
        this.username = '';
        this.password = '';
        this.failedAttempt = false;
    }
    LoginPage.prototype.openRegisterPage = function () {
        this.navCtrl.push('RegisterPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.presentLoading();
        var credentials = {
            username: this.username,
            password: this.password,
        };
        this.authProvider.authenticate(credentials).subscribe(function (res) {
            if (typeof (res.token) !== 'undefined') {
                _this.failedAttempt = false;
                _this.zone.runOutsideAngular(function () {
                    _this.dataProvider.initDatabase(res.userDBs.hangz);
                });
                _this.userProvider.saveUserData(res);
                _this.loading.dismiss().then(function () {
                    _this.navCtrl.setRoot('HomePage');
                });
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.failedAttempt = true;
            console.log(err);
        });
    };
    LoginPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/pages/login/login.html"*/'<ion-content padding>\n\n  <svg id="hangz-logo" data-name="hangz-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.19 149.4">\n    <defs>\n      <style>\n        .cls-1 {\n          fill: #fff;\n        }\n      </style>\n    </defs>\n    <title>hangz</title>\n    <g>\n      <path class="cls-1" d="M314.45,312.6V363h0.3a13.54,13.54,0,0,1,2.55-4.2,20,20,0,0,1,4.35-3.75,23.71,23.71,0,0,1,6-2.7,25.69,25.69,0,0,1,7.5-1.05q8.55,0,13.8,2.63a20,20,0,0,1,8.17,7.28,29.44,29.44,0,0,1,4,10.95,83.37,83.37,0,0,1,1,13.65V426h-22.5V390.3q0-3.15-.23-6.52a20.59,20.59,0,0,0-1.35-6.23,10.76,10.76,0,0,0-3.45-4.65q-2.33-1.8-6.67-1.8a13.89,13.89,0,0,0-7.05,1.57,10.74,10.74,0,0,0-4.12,4.2,17.16,17.16,0,0,0-1.87,5.92,51.11,51.11,0,0,0-.45,6.9V426H292V312.6h22.5Z" transform="translate(-291.95 -312.6)"/>\n      <path class="cls-1" d="M423.8,416.85h-0.3a21.17,21.17,0,0,1-10,8.4,34.31,34.31,0,0,1-13.12,2.55,33.86,33.86,0,0,1-9.82-1.42,24.77,24.77,0,0,1-8.33-4.27,20.61,20.61,0,0,1-5.7-7.05,21.5,21.5,0,0,1-2.1-9.75,22.35,22.35,0,0,1,2.32-10.65,20.8,20.8,0,0,1,6.3-7.2,31.31,31.31,0,0,1,9.07-4.43,66.36,66.36,0,0,1,10.58-2.32,101.36,101.36,0,0,1,11-.9q5.47-.15,10.13-0.15a11.7,11.7,0,0,0-4.28-9.52,15.42,15.42,0,0,0-10.12-3.52,22,22,0,0,0-10.12,2.32,27.67,27.67,0,0,0-8.17,6.38l-12-12.3a41.28,41.28,0,0,1,14.7-8.77,52.53,52.53,0,0,1,17.4-2.93q9.9,0,16.27,2.48a23.68,23.68,0,0,1,10.2,7.27A28.05,28.05,0,0,1,443,372.83,77.38,77.38,0,0,1,444.5,389v37H423.8v-9.15ZM418.25,394q-2.55,0-6.37.23a32.38,32.38,0,0,0-7.35,1.27,16.38,16.38,0,0,0-6,3.15,7.26,7.26,0,0,0-2.47,5.85,6.43,6.43,0,0,0,3.45,6,14.42,14.42,0,0,0,7.2,2,22.59,22.59,0,0,0,6.38-.9,19,19,0,0,0,5.48-2.55,12.34,12.34,0,0,0,3.82-4.2,12.11,12.11,0,0,0,1.43-6V394h-5.55Z" transform="translate(-291.95 -312.6)"/>\n      <path class="cls-1" d="M458.6,353.1h21.6V363h0.3a18.24,18.24,0,0,1,3-4.2,21.88,21.88,0,0,1,4.65-3.75,26.62,26.62,0,0,1,6.15-2.7,25.69,25.69,0,0,1,7.5-1.05q8.55,0,13.8,2.63a20,20,0,0,1,8.17,7.28,29.43,29.43,0,0,1,4,10.95,83.25,83.25,0,0,1,1.05,13.65V426H506.3V390.3q0-3.15-.23-6.52a20.57,20.57,0,0,0-1.35-6.23,10.76,10.76,0,0,0-3.45-4.65q-2.33-1.8-6.67-1.8a13.89,13.89,0,0,0-7,1.57,10.74,10.74,0,0,0-4.12,4.2,17.14,17.14,0,0,0-1.87,5.92,51,51,0,0,0-.45,6.9V426H458.6V353.1Z" transform="translate(-291.95 -312.6)"/>\n      <path class="cls-1" d="M621.2,419.85q0,20.7-10.42,31.42T579,462a85.43,85.43,0,0,1-19.2-2.17,43.46,43.46,0,0,1-17.4-8.48l12.45-18.6a47.12,47.12,0,0,0,11,6.9,31,31,0,0,0,12.67,2.55q10.35,0,15.23-5a17.67,17.67,0,0,0,4.88-12.82V417.3h-0.3a21.21,21.21,0,0,1-9.68,7.43,31,31,0,0,1-10.87,2.17,37.54,37.54,0,0,1-14.7-2.77,32.72,32.72,0,0,1-11.33-7.8,34.75,34.75,0,0,1-7.28-11.93A43.36,43.36,0,0,1,542,389.25a43.83,43.83,0,0,1,2.33-14.1,38.54,38.54,0,0,1,6.6-12.15,33.14,33.14,0,0,1,10.42-8.48,29.6,29.6,0,0,1,14-3.23A33.94,33.94,0,0,1,591.2,355a26.25,26.25,0,0,1,5.4,3.68,23.38,23.38,0,0,1,3.6,4h0.3v-9.6h20.7v66.75ZM564.5,389.1a17.57,17.57,0,0,0,5.17,12.52,19.76,19.76,0,0,0,5.7,4,17.49,17.49,0,0,0,14.17,0,19.5,19.5,0,0,0,5.78-4,17.7,17.7,0,0,0,0-25,19.53,19.53,0,0,0-5.78-4,17.49,17.49,0,0,0-14.17,0,19.79,19.79,0,0,0-5.7,4A17.57,17.57,0,0,0,564.5,389.1Z" transform="translate(-291.95 -312.6)"/>\n      <path class="cls-1" d="M636.34,403.5l37.8-32.4h-36.9v-18h63v21.6L660.64,408h40.5v18h-64.8V403.5Z" transform="translate(-291.95 -312.6)"/>\n    </g>\n  </svg>\n\n  <ion-item class="username-input">\n    <ion-icon color="light" item-start name="contact"></ion-icon>\n    <ion-input [(ngModel)]="username" type="text" placeholder="username"></ion-input>\n  </ion-item>\n\n  <ion-item class="password-input">\n    <ion-icon color="light" item-start name="lock"></ion-icon>\n    <ion-input [(ngModel)]="password" type="password" placeholder="password"></ion-input>\n  </ion-item>\n\n  <button ion-button full icon-left color="light" class="login-button" (click)="login()"><ion-icon name="log-in"></ion-icon> Log In</button>\n\n  <p *ngIf="failedAttempt" class="error-logging-in">\n    Incorrect username or password!\n  </p>\n\n</ion-content>\n\n<ion-footer>\n\n  <button ion-button color="primary" full icon-right (click)="openRegisterPage()" class="create-account-button">Create an Account <ion-icon name="arrow-forward"></ion-icon></button>\n\n</ion-footer>'/*ion-inline-end:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]) === "function" && _f || Object])
    ], LoginPage);
    return LoginPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=2.js.map