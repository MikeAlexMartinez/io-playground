webpackJsonp([6],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserProvider = /** @class */ (function () {
    function UserProvider(storage) {
        this.storage = storage;
        this.currentUser = false;
        console.log('Hello UserProvider Provider');
    }
    UserProvider.prototype.saveUserData = function (data) {
        this.currentUser = data;
        this.storage.set('hangzUserData', data);
    };
    UserProvider.prototype.getUserData = function () {
        return this.storage.get('hangzUserData');
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-notice/add-notice.module": [
		293,
		5
	],
	"../pages/chat/chat.module": [
		295,
		4
	],
	"../pages/home/home.module": [
		294,
		3
	],
	"../pages/login/login.module": [
		297,
		2
	],
	"../pages/notices/notices.module": [
		296,
		1
	],
	"../pages/register/register.module": [
		298,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 154;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_user__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_data__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_constants__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthProvider = /** @class */ (function () {
    function AuthProvider(http, userProvider, dataProvider, appCtrl, zone) {
        this.http = http;
        this.userProvider = userProvider;
        this.dataProvider = dataProvider;
        this.appCtrl = appCtrl;
        this.zone = zone;
        console.log('Hello AuthProvider Provider');
    }
    AuthProvider.prototype.reauthenticate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.dataProvider.db === null) {
                _this.userProvider.getUserData().then(function (userData) {
                    if (userData !== null) {
                        var now = new Date();
                        var expires = new Date(userData.expires);
                        if (expires > now) {
                            _this.userProvider.currentUser = userData;
                            _this.zone.runOutsideAngular(function () {
                                _this.dataProvider.initDatabase(userData.userDBs.hangz);
                            });
                            resolve(true);
                        }
                        else {
                            reject(true);
                        }
                    }
                    else {
                        reject(true);
                    }
                });
            }
            else {
                resolve(true);
            }
        });
    };
    AuthProvider.prototype.authenticate = function (credentials) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_5__config_constants__["a" /* SERVER_ADDRESS */] + 'auth/login', credentials).map(function (res) { return res.json(); });
    };
    AuthProvider.prototype.logout = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.userProvider.currentUser.token + ':' + this.userProvider.currentUser.password);
        this.http.post(__WEBPACK_IMPORTED_MODULE_5__config_constants__["a" /* SERVER_ADDRESS */] + 'auth/logout', {}, { headers: headers }).subscribe(function (res) { });
        this.dataProvider.db.destroy().then(function (res) {
            _this.dataProvider.db = null;
            _this.userProvider.saveUserData(null);
            _this.appCtrl.getRootNav().setRoot('LoginPage');
        }, function (err) {
            console.log('could not destroy db');
        });
    };
    AuthProvider.prototype.register = function (details) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_5__config_constants__["a" /* SERVER_ADDRESS */] + 'auth/register', details).map(function (res) { return res.json(); });
    };
    AuthProvider.prototype.validateUsername = function (username) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__config_constants__["a" /* SERVER_ADDRESS */] + 'auth/validate-username/' + username).map(function (res) { return res.json(); });
    };
    AuthProvider.prototype.validateEmail = function (email) {
        var encodedEmail = encodeURIComponent(email);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__config_constants__["a" /* SERVER_ADDRESS */] + 'auth/validate-email/' + encodedEmail).map(function (res) { return res.json(); });
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__user_user__["a" /* UserProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__user_user__["a" /* UserProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__data_data__["a" /* DataProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__data_data__["a" /* DataProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]) === "function" && _e || Object])
    ], AuthProvider);
    return AuthProvider;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_data__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NoticesProvider = /** @class */ (function () {
    function NoticesProvider(_dataProvider, _zone) {
        this._dataProvider = _dataProvider;
        this._zone = _zone;
        this.noticesSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
    }
    NoticesProvider.prototype.init = function () {
        var _this = this;
        this.emitNotices();
        this._dataProvider.db.changes({
            live: true,
            since: 'now',
            include_docs: true
        }).on('change', function (change) {
            if (change.doc.type === 'notice' || change.deleted) {
                _this.emitNotices();
            }
        });
    };
    NoticesProvider.prototype.getNotices = function () {
        return this.noticesSubject;
    };
    NoticesProvider.prototype.saveNotice = function (notice) {
        if (notice.doc) {
            var updatedDoc = notice.doc;
            updatedDoc.title = notice.title;
            updatedDoc.message = notice.message;
            updatedDoc.dateUpdated = notice.dateUpdated;
            this._dataProvider.updateDoc(updatedDoc);
        }
        else {
            this._dataProvider.createDoc({
                title: notice.title,
                message: notice.message,
                author: notice.author,
                dateCreated: notice.dateCreated,
                dateUpdated: notice.dateUpdated,
                type: 'notice'
            });
        }
    };
    NoticesProvider.prototype.deleteNotice = function (notice) {
        this._dataProvider.deleteDoc(notice);
    };
    NoticesProvider.prototype.emitNotices = function () {
        var _this = this;
        this._zone.run(function () {
            var options = {
                include_docs: true,
                descending: true
            };
            _this._dataProvider.db.query('notices/by_date_updated', options).then(function (data) {
                var notices = data.rows.map(function (row) { return row.doc; });
                _this.noticesSubject.next(notices);
            }).catch(function (err) {
                console.log(err);
            });
        });
    };
    NoticesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], NoticesProvider);
    return NoticesProvider;
}());

//# sourceMappingURL=notices.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_data__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatProvider = /** @class */ (function () {
    function ChatProvider(dataProvider, zone) {
        this.dataProvider = dataProvider;
        this.zone = zone;
        this.chatsSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
    }
    ChatProvider.prototype.init = function () {
    };
    ChatProvider.prototype.getChats = function () {
        return this.chatsSubject;
    };
    ChatProvider.prototype.addChat = function (message) {
        this.dataProvider.createDoc({
            message: message.message,
            author: message.author,
            dateCreated: message.dateCreated,
            type: 'chat'
        });
    };
    ChatProvider.prototype.emitChats = function () {
        var _this = this;
        this.zone.run(function () {
            var options = {
                include_docs: true,
                descending: true
            };
            _this.dataProvider.db.query('chats.by_date_created', options).then(function (data) {
                var chats = data.rows.map(function (row) { return row.doc; });
                chats.reverse();
                _this.chatsSubject.next(chats);
            }).catch(function (err) {
                console.log(err);
            });
        });
    };
    ChatProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__data_data__["a" /* DataProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__data_data__["a" /* DataProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]) === "function" && _b || Object])
    ], ChatProvider);
    return ChatProvider;
    var _a, _b;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data_data__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_notices_notices__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_chat_chat__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_user_user__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_auth_auth__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {
                    tabsPlacement: 'top',
                    preloadModules: true
                }, {
                    links: [
                        { loadChildren: '../pages/add-notice/add-notice.module#AddNoticePageModule', name: 'AddNoticePage', segment: 'add-notice', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notices/notices.module#NoticesPageModule', name: 'NoticesPage', segment: 'notices', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: ['LoginPage'] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__providers_notices_notices__["a" /* NoticesProvider */],
                __WEBPACK_IMPORTED_MODULE_8__providers_data_data__["a" /* DataProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_chat_chat__["a" /* ChatProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_user_user__["a" /* UserProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_auth_auth__["a" /* AuthProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SERVER_ADDRESS; });
var SERVER_ADDRESS = 'http://localhost:8080/';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(_platform, _statusBar, _splashScreen, _zone, _dataProvider) {
        this._platform = _platform;
        this._statusBar = _statusBar;
        this._splashScreen = _splashScreen;
        this._zone = _zone;
        this._dataProvider = _dataProvider;
        this.rootPage = 'LoginPage';
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this._platform.ready().then(function () {
            _this._zone.runOutsideAngular(function () {
                _this._dataProvider.initDatabase('http://127.0.0.1:5984/hangz');
            });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this._statusBar.styleDefault();
            _this._splashScreen.hide();
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/michael/Dev/ionic/io-playground/Real-Time/hangz/client/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_pouchdb__ = __webpack_require__(252);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataProvider = /** @class */ (function () {
    function DataProvider() {
        this.db = null;
    }
    DataProvider.prototype.initDatabase = function (remote) {
        this.db = new __WEBPACK_IMPORTED_MODULE_1_pouchdb__["a" /* default */]('hangz', {
            auto_compaction: true
        });
        this.remote = remote;
        this.initRemoteSync();
    };
    DataProvider.prototype.initRemoteSync = function () {
        var options = {
            live: true,
            retry: true
        };
        this.db.sync(this.remote, options);
    };
    DataProvider.prototype.createDoc = function (doc) {
        return this.db.post(doc);
    };
    DataProvider.prototype.updateDoc = function (doc) {
        return this.db.put(doc);
    };
    DataProvider.prototype.deleteDoc = function (doc) {
        return this.db.remove(doc);
    };
    DataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DataProvider);
    return DataProvider;
}());

//# sourceMappingURL=data.js.map

/***/ })

},[205]);
//# sourceMappingURL=main.js.map