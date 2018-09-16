webpackJsonp([3],{

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(271);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = (function () {
    function HomePageModule() {
    }
    return HomePageModule;
}());
HomePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]
        ]
    })
], HomePageModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, authProvider) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.modules = [];
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.modules = [
            {
                title: 'Module One',
                description: 'Test',
                lessons: [
                    { title: 'Lesson 1', content: 'this is the lesson content' },
                    { title: 'Lesson 2', content: 'this is the lesson content' }
                ]
            },
            {
                title: 'Module Two',
                description: 'Test',
                lessons: [
                    { title: 'Lesson 1', content: 'this is the lesson content' },
                    { title: 'Lesson 2', content: 'this is the lesson content' }
                ]
            },
            {
                title: 'Module Three',
                description: 'Test',
                lessons: [
                    { title: 'Lesson 1', content: 'this is the lesson content' },
                    { title: 'Lesson 2', content: 'this is the lesson content' }
                ]
            },
            {
                title: 'Module Four',
                description: 'Test',
                lessons: [
                    { title: 'Lesson 1', content: 'this is the lesson content' },
                    { title: 'Lesson 2', content: 'this is the lesson content' }
                ]
            },
            {
                title: 'Module Five',
                description: 'Test',
                lessons: [
                    { title: 'Lesson 1', content: 'this is the lesson content' },
                    { title: 'Lesson 2', content: 'this is the lesson content' }
                ]
            }
        ];
    };
    HomePage.prototype.openModule = function (module) {
        this.navCtrl.push('LessonSelectPage', {
            module: module
        });
    };
    HomePage.prototype.logout = function () {
        this.authProvider.logout();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/home/michael/Dev/ionic/jm-elite-ionic-simple/src/pages/home/home.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n\n  <ion-buttons left>\n    <button\n      (click)="logout()"\n      class="logout-button"\n      ion-button\n      icon-only\n    >\n      <ion-icon name="log-out"></ion-icon>\n    </button>\n  </ion-buttons>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list class="module-list">\n    <button\n      ion-item\n      *ngFor="let module of modules"\n      (click)="openModule(module)"\n    >\n      {{module.title}}\n    </button>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/home/michael/Dev/ionic/jm-elite-ionic-simple/src/pages/home/home.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=3.js.map