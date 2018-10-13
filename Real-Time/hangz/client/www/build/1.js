webpackJsonp([1],{

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_error_messages_error_messages__ = __webpack_require__(308);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_3__components_error_messages_error_messages__["a" /* ErrorMessagesComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_data__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__validators_username__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__validators_email__ = __webpack_require__(206);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, _fb, _authProvider, _userProvider, _dataProvider, _loadingCtrl, _usernameValidator, _emailValidator) {
        this.navCtrl = navCtrl;
        this._fb = _fb;
        this._authProvider = _authProvider;
        this._userProvider = _userProvider;
        this._dataProvider = _dataProvider;
        this._loadingCtrl = _loadingCtrl;
        this._usernameValidator = _usernameValidator;
        this._emailValidator = _emailValidator;
        this.registerForm = this._fb.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(16), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]), this._usernameValidator.checkUsername.bind(this._usernameValidator)],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]), this._emailValidator.checkEmail.bind(this._emailValidator)],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])],
            confirmPassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])],
        }, {
            validators: this.confirmPassword,
        });
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.createAccount = function () {
        var _this = this;
        if (this.registerForm.valid) {
            this.presentLoading();
            this._authProvider.register(this.registerForm.value).subscribe(function (res) {
                if (typeof (res.token) !== 'undefined') {
                    _this._dataProvider.initDatabase(res.userDBs.hangz);
                    _this._userProvider.saveUserData(res);
                    _this.navCtrl.setRoot('HomePage');
                }
                _this.loading.dismiss();
            }, function (err) {
                _this.loading.dismiss();
            });
        }
    };
    RegisterPage.prototype.confirmPassword = function (form) {
        var password = form.get('password');
        var confirmPassword = form.get('confirmPassword');
        var validation = {};
        if ((password.touched || confirmPassword.touched) && password.value !== confirmPassword.value) {
            validation = {
                passwordMismatch: true
            };
        }
        return validation;
    };
    RegisterPage.prototype.presentLoading = function () {
        this.loading = this._loadingCtrl.create({
            content: 'Creating Account...'
        });
        this.loading.present();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/pages/register/register.html"*/'<ion-header no-border>\n\n  <ion-navbar color="primary">\n    <ion-title>Create Account</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <form [formGroup]="registerForm" class="register-form">\n\n      <ion-item class="username-input">\n          <ion-label stacked>Username</ion-label>\n          <ion-label stacked><error-messages [control]="registerForm.controls.username"></error-messages></ion-label>\n          <ion-input formControlName="username" type="text" required></ion-input>\n      </ion-item>\n\n      <ion-item class="email-input">\n          <ion-label stacked>Email</ion-label>\n          <ion-label stacked><error-messages [control]="registerForm.controls.email"></error-messages></ion-label>\n          <ion-input formControlName="email" type="email" required></ion-input>\n      </ion-item>\n\n      <ion-item class="password-input">\n          <ion-label stacked>Password</ion-label>\n          <ion-label stacked><error-messages [control]="registerForm.controls.password"></error-messages></ion-label>\n          <ion-input formControlName="password" type="password" required></ion-input>\n      </ion-item>\n\n      <ion-item class="confirm-password-input">\n          <ion-label stacked>Confirm Password</ion-label>\n          <ion-label stacked><error-messages [control]="registerForm.controls.confirmPassword"></error-messages></ion-label>\n          <ion-input formControlName="confirmPassword" type="password" required></ion-input>\n      </ion-item>\n\n  </form>\n\n  <p class="submit-warning" *ngIf="!registerForm.valid">You must fill out all fields above correctly before you can create your account.</p>\n\n  <button [disabled]="!registerForm.valid" ion-button full icon-right color="light" class="register-button" (click)="createAccount()">Create Account <ion-icon name="arrow-forward"></ion-icon></button>\n\n</ion-content>\n'/*ion-inline-end:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__validators_username__["a" /* UsernameValidator */],
            __WEBPACK_IMPORTED_MODULE_7__validators_email__["a" /* EmailValidator */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorMessagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ErrorMessagesComponent = /** @class */ (function () {
    function ErrorMessagesComponent(zone) {
        this.zone = zone;
        this.errorMessages = {
            'required': 'This field must not be empty',
            'emailInUse': 'Sorry, you can\'t use this email address',
            'usernameInUse': 'Sorry, you can\'t use this username',
            'maxlength': 'Sorry, this field must be less than 30 characters',
            'pattern': 'Sorry, this field can only contain numbers letters'
        };
    }
    Object.defineProperty(ErrorMessagesComponent.prototype, "errorMessage", {
        get: function () {
            for (var error in this.control.errors) {
                if (this.control.errors.hasOwnProperty(error)
                    && (this.control.touched || (this.control.asyncValidator !== null && !this.control.pristine))) {
                    return this.errorMessages[error];
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */])
    ], ErrorMessagesComponent.prototype, "control", void 0);
    ErrorMessagesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'error-messages',template:/*ion-inline-start:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/components/error-messages/error-messages.html"*/'<div\n  class="async-pending"\n  *ngIf="control.pending"\n>\n  <ion-spinner></ion-spinner>\n  Checking...\n</div>\n<div *ngIf="errorMessage !== null">\n  <ul><li>{{errorMessage}}</li></ul>\n</div>\n'/*ion-inline-end:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/components/error-messages/error-messages.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], ErrorMessagesComponent);
    return ErrorMessagesComponent;
}());

//# sourceMappingURL=error-messages.js.map

/***/ })

});
//# sourceMappingURL=1.js.map