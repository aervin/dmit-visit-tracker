webpackJsonp([6],{

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateVisitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_firebase_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__empty_day_results__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_components_modals_create_visit_invalid_create_visit_invalid__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_components_modals_success_success__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__index__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_loading_loading_controller__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CreateVisitPage = /** @class */ (function () {
    function CreateVisitPage(navCtrl, navParams, fb, modalCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.newVisit = {
            dayResults: null,
            userId: this.fb.readUserProfile().id,
            goalSet: null,
            note: '',
            salesTrend: null,
            visitDate: new Date().toISOString(),
            status: 'active',
            visitType: null
        };
    }
    CreateVisitPage_1 = CreateVisitPage;
    CreateVisitPage.prototype.createVisit = function () {
        var _this = this;
        if (this.newVisit.goalSet === null ||
            this.newVisit.salesTrend === null ||
            this.newVisit.visitType === null) {
            var invalidModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__app_components_modals_create_visit_invalid_create_visit_invalid__["a" /* CreateVisitInvalidComponent */]);
            invalidModal.present();
            return;
        }
        var loader = this.loadingCtrl.create({
            content: 'Creating your visit...'
        });
        this.newVisit.dayResults = Object(__WEBPACK_IMPORTED_MODULE_3__empty_day_results__["a" /* generateDayResults */])(this.newVisit.visitDate);
        this.fb.createVisit(this.newVisit).subscribe(function (success) {
            var successModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__app_components_modals_success_success__["a" /* SuccessComponent */]);
            successModal.present();
            successModal.onDidDismiss(function () {
                _this.fb.getActiveVisit(_this.fb.readUserProfile().id).subscribe(function (visit) {
                    loader.dismiss();
                    _this.navCtrl.setRoot(visit === undefined ? CreateVisitPage_1 : __WEBPACK_IMPORTED_MODULE_6__index__["a" /* ActiveVisitPage */]);
                });
            });
        });
    };
    CreateVisitPage = CreateVisitPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-visit',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/create-visit/create-visit.html"*/'<ion-header>\n    <ion-navbar>\n        <button\n            ion-button\n            menuToggle\n        >\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>New visit</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list>\n        <ion-item>\n            <ion-datetime\n                displayFormat="MM/DD/YYYY"\n                pickerFormat="MM/DD/YYYY"\n                placeholder="Visit date"\n                [(ngModel)]="newVisit.visitDate"\n            ></ion-datetime>\n        </ion-item>\n        <ion-item>\n            <ion-label>Visit type</ion-label>\n            <ion-select [(ngModel)]="newVisit.visitType">\n                <ion-option\n                    *ngFor="let type of fb.readVisitTypes()"\n                    [value]="type.displayText"\n                >\n                    {{ type.displayText }}\n                </ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-input\n                type="number"\n                placeholder="6 week trend"\n                [(ngModel)]="newVisit.salesTrend"\n            ></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-input\n                type="number"\n                placeholder="Goal set"\n                [(ngModel)]="newVisit.goalSet"\n            ></ion-input>\n        </ion-item>\n    </ion-list>\n    <ion-row justify-content-center>\n        <button\n            ion-button\n            round\n            large\n            (click)="createVisit()"\n        >\n            <ion-icon name="new"></ion-icon>\n            Create visit\n        </button>\n    </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/create-visit/create-visit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */]])
    ], CreateVisitPage);
    return CreateVisitPage;
    var CreateVisitPage_1;
}());

//# sourceMappingURL=create-visit.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateTimeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DateTimeService = /** @class */ (function () {
    function DateTimeService() {
    }
    DateTimeService.prototype.timestampToDisplayDate = function (stamp) {
        var d = new Date(stamp);
        return d.toLocaleDateString();
    };
    DateTimeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], DateTimeService);
    return DateTimeService;
}());

//# sourceMappingURL=date-time.service.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuccessComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SuccessComponent = /** @class */ (function () {
    function SuccessComponent(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    SuccessComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'success',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/success/success.html"*/'<h3 class="text-center uppercase">Visit updated successfully!</h3>\n<ion-row justify-content-center>\n    <button\n        ion-button\n        large\n        round\n        outline\n        (click)="viewCtrl.dismiss()"\n    >\n        Awesome!\n    </button>\n</ion-row>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/success/success.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__["a" /* ViewController */]])
    ], SuccessComponent);
    return SuccessComponent;
}());

//# sourceMappingURL=success.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateVisitInvalidComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CreateVisitInvalidComponent = /** @class */ (function () {
    function CreateVisitInvalidComponent(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    CreateVisitInvalidComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'create-visit-invalid',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/create-visit-invalid/create-visit-invalid.html"*/'<h3 class="text-center uppercase">You didn\'t fill out the form correctly</h3>\n<p class="text-center">\n    Wake up!\n</p>\n<ion-row justify-content-center>\n    <button\n        ion-button\n        large\n        round\n        outline\n        (click)="viewCtrl.dismiss()"\n    >\n        My bad...\n    </button>\n</ion-row>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/create-visit-invalid/create-visit-invalid.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__["a" /* ViewController */]])
    ], CreateVisitInvalidComponent);
    return CreateVisitInvalidComponent;
}());

//# sourceMappingURL=create-visit-invalid.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EncounteredProblemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EncounteredProblemComponent = /** @class */ (function () {
    function EncounteredProblemComponent(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    EncounteredProblemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'encountered-problem',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/encountered-problem/encountered-problem.html"*/'<h3 class="text-center uppercase">The was a problem</h3>\n<ion-row justify-content-center>\n    <button\n        ion-button\n        large\n        round\n        color="secondary"\n        (click)="viewCtrl.dismiss()"\n    >\n        I understand\n    </button>\n</ion-row>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/encountered-problem/encountered-problem.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], EncounteredProblemComponent);
    return EncounteredProblemComponent;
}());

//# sourceMappingURL=encountered-problem.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActiveVisitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_firebase_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_date_time_service__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_modal_modal_controller__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_components_modals_success_success__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_components_modals_submit_completed_visit_submit_completed_visit__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7____ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_loading_loading_controller__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ActiveVisitPage = /** @class */ (function () {
    function ActiveVisitPage(navCtrl, navParams, fb, dateTimeService, modalCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.dateTimeService = dateTimeService;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.visit = this.fb.readActiveVisit();
    }
    ActiveVisitPage.prototype.dayResultIsGreaterThanOrEqualToGoalSet = function (dayResult) {
        var result = parseFloat(dayResult.result);
        var goal = parseFloat(this.visit.goalSet);
        return result >= goal;
    };
    ActiveVisitPage.prototype.isFutureDate = function (dayResult) {
        var today = new Date();
        var resultDate = new Date(dayResult.date);
        return (today.getDate() < resultDate.getDate() &&
            today.getMonth() <= resultDate.getMonth() &&
            today.getFullYear() <= resultDate.getFullYear());
    };
    ActiveVisitPage.prototype.submit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: 'Updating...' });
        if (this.visit.dayResults.every(function (dayResult) { return dayResult.result !== null; })) {
            var submitVisitModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__app_components_modals_submit_completed_visit_submit_completed_visit__["a" /* SubmitCompletedVisitComponent */]);
            submitVisitModal.present();
            submitVisitModal.onDidDismiss(function (doIt) {
                if (doIt) {
                    loader.present();
                    _this.visit.status = 'complete';
                    _this.fb.updateActiveVisit(_this.visit).subscribe(function (success) {
                        var successModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__app_components_modals_success_success__["a" /* SuccessComponent */]);
                        successModal.present();
                        _this.navCtrl.popToRoot();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7____["e" /* VisitHistoryPage */]);
                    }, function (error) { }, function () { return loader.dismiss(); });
                }
            });
            return;
        }
        loader.present();
        this.fb.updateActiveVisit(this.visit).subscribe(function (success) {
            loader.dismiss();
            var successModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__app_components_modals_success_success__["a" /* SuccessComponent */]);
            successModal.present();
        }, function (error) { });
    };
    ActiveVisitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-active-visit',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/active-visit/active-visit.html"*/'<ion-header>\n    <ion-navbar>\n        <button\n            ion-button\n            menuToggle\n        >\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>My active visit</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <img\n        src="assets/imgs/logo.png"\n        class="dmit-logo"\n    >\n    <ion-list>\n        <ion-item>\n            <ion-row\n                justify-content-between\n                align-items-center\n            >\n                <span>Visit date</span>\n                <span>\n                    {{ dateTimeService.timestampToDisplayDate(visit.visitDate) }}\n                </span>\n            </ion-row>\n        </ion-item>\n        <ion-item>\n            <ion-row\n                justify-content-between\n                align-items-center\n            >\n                <span>Visit type</span>\n                <span>{{ visit.visitType }}</span>\n            </ion-row>\n        </ion-item>\n        <ion-item>\n            <ion-row\n                justify-content-between\n                align-items-center\n            >\n                <span>Trend</span>\n                <span>{{ visit.salesTrend }}%</span>\n            </ion-row>\n        </ion-item>\n        <ion-item>\n            <ion-row\n                justify-content-between\n                align-items-center\n            >\n                <span>Visit goal</span>\n                <span>{{ visit.goalSet }}%</span>\n            </ion-row>\n        </ion-item>\n    </ion-list>\n\n    <div padding>\n        <div\n            class="wrapper__day-result"\n            *ngFor="let dayResult of visit.dayResults; let i = index;"\n        >\n            <ion-row\n                justify-content-between\n                align-items-center\n                class="wrapper__past-results"\n                *ngIf="!isFutureDate(dayResult)"\n            >\n                <div class="wrapper__day-label">\n                    <h3>Day {{ i + 1 }}</h3>\n                    <p>\n                        {{ dateTimeService.timestampToDisplayDate(dayResult.date) }}\n                    </p>\n                </div>\n                <ion-badge\n                    *ngIf="!!dayResult.result"\n                    [color]="dayResultIsGreaterThanOrEqualToGoalSet(dayResult) ? \'primary\' : \'danger\'"\n                >\n                    {{ dayResult.result }}%\n                </ion-badge>\n            </ion-row>\n            <ion-input\n                *ngIf="!isFutureDate(dayResult)"\n                type="text"\n                [(ngModel)]="dayResult.result"\n                placeholder="Enter today\'s result"\n            ></ion-input>\n        </div>\n\n        <ion-row\n            justify-content-start\n            align-items-center\n            class="wrapper__notes"\n        >\n            <ion-icon name="list-box"></ion-icon>\n            <h4>Notes</h4>\n        </ion-row>\n        <ion-textarea\n            [(ngModel)]="visit.note"\n            placeholder="Enter notes here..."\n        >\n            {{ visit.note }}\n        </ion-textarea>\n        <ion-row\n            justify-content-center\n            align-items-center\n        >\n            <button\n                ion-button\n                round\n                large\n                (click)="submit()"\n            >\n                Update\n            </button>\n        </ion-row>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/active-visit/active-visit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_date_time_service__["a" /* DateTimeService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_modal_modal_controller__["a" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */]])
    ], ActiveVisitPage);
    return ActiveVisitPage;
}());

//# sourceMappingURL=active-visit.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_visit_create_visit__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_firebase_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__index__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sign_up_sign_up__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_modal_modal_controller__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_components_modals_encountered_problem_encountered_problem__ = __webpack_require__(186);
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
    function LoginPage(navCtrl, navParams, fb, loadingCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Logging you in...'
        });
        loader.present();
        this.fb.authenticateUser(this.email, this.password).subscribe(function (success) {
            if (success) {
                _this.fb.getUserProfile(_this.email).subscribe(function (user) {
                    _this.fb.user = user;
                    _this.fb
                        .getActiveVisit(_this.fb.readUserProfile().id)
                        .subscribe(function (visit) {
                        loader.dismiss();
                        _this.navCtrl.setRoot(visit === undefined
                            ? __WEBPACK_IMPORTED_MODULE_2__create_visit_create_visit__["a" /* CreateVisitPage */]
                            : __WEBPACK_IMPORTED_MODULE_5__index__["a" /* ActiveVisitPage */]);
                    });
                });
            }
            else {
                loader.dismiss();
                var problemModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__app_components_modals_encountered_problem_encountered_problem__["a" /* EncounteredProblemComponent */]);
                problemModal.present();
            }
        }, function (error) { }, function () { return loader.dismiss(); });
    };
    LoginPage.prototype.signUp = function (event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__sign_up_sign_up__["a" /* SignUpPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/login/login.html"*/'<ion-content padding>\n    <img\n        src="assets/imgs/logo.png"\n        class="dmit-logo"\n    >\n    <ion-list>\n        <ion-item>\n            <ion-input\n                type="text"\n                placeholder="Email"\n                [(ngModel)]="email"\n            ></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-input\n                type="password"\n                placeholder="Password"\n                [(ngModel)]="password"\n            ></ion-input>\n        </ion-item>\n    </ion-list>\n    <ion-row justify-content-center>\n        <button\n            ion-button\n            round\n            block\n            large\n            padding\n            (click)="login($event)"\n        >\n            Login\n        </button>\n    </ion-row>\n\n    <ion-row\n        justify-content-center\n        align-items-center\n        padding\n    >\n        <p>Don\'t have an account?</p>\n        <button\n            ion-button\n            round\n            color="secondary"\n            outline\n            (click)="signUp($event)"\n        >\n            Sign up\n        </button>\n    </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_modal_modal_controller__["a" /* ModalController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_firebase_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_components_modals_success_signup_success_signup__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_components_modals_create_visit_invalid_create_visit_invalid__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_components_modals_encountered_problem_encountered_problem__ = __webpack_require__(186);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignUpPage = /** @class */ (function () {
    function SignUpPage(navCtrl, navParams, fb, modalCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    SignUpPage.prototype.isValid = function () {
        return (!!this.email &&
            !!this.password &&
            !!this.passwordConfirmation &&
            this.password === this.passwordConfirmation);
    };
    SignUpPage.prototype.submit = function () {
        var _this = this;
        if (!this.isValid()) {
            var invalidModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__app_components_modals_create_visit_invalid_create_visit_invalid__["a" /* CreateVisitInvalidComponent */]);
            invalidModal.present();
            return;
        }
        var loader = this.loadingCtrl.create({
            content: 'Creating your profile...'
        });
        loader.present();
        this.fb.createUser(this.email, this.password).subscribe(function (success) {
            loader.dismiss();
            if (success) {
                var successModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__app_components_modals_success_signup_success_signup__["a" /* SuccessSignupComponent */]);
                successModal.present();
                successModal.onDidDismiss(function () { return _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3____["b" /* CreateVisitPage */]); });
                return;
            }
            var problemModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__app_components_modals_encountered_problem_encountered_problem__["a" /* EncounteredProblemComponent */]);
            problemModal.present();
        });
    };
    SignUpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sign-up',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/sign-up/sign-up.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Sign up</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <img\n        src="assets/imgs/logo.png"\n        class="dmit-logo"\n    >\n    <ion-list>\n        <ion-item>\n            <ion-input\n                type="text"\n                placeholder="Email"\n                [(ngModel)]="email"\n            ></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-input\n                type="password"\n                placeholder="Password"\n                [(ngModel)]="password"\n            ></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-input\n                type="password"\n                placeholder="Confirm password"\n                [(ngModel)]="passwordConfirmation"\n            ></ion-input>\n        </ion-item>\n    </ion-list>\n    <ion-row justify-content-center>\n        <button\n            ion-button\n            round\n            block\n            large\n            padding\n            (click)="submit($event)"\n        >\n            Sign up\n        </button>\n    </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/sign-up/sign-up.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], SignUpPage);
    return SignUpPage;
}());

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 225:
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
webpackEmptyAsyncContext.id = 225;

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/active-visit/active-visit.module": [
		668,
		5
	],
	"../pages/create-visit/create-visit.module": [
		669,
		4
	],
	"../pages/login/login.module": [
		670,
		3
	],
	"../pages/results-board/results-board.module": [
		671,
		2
	],
	"../pages/sign-up/sign-up.module": [
		672,
		1
	],
	"../pages/visit-history/visit-history.module": [
		673,
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
webpackAsyncContext.id = 269;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmitCompletedVisitComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SubmitCompletedVisitComponent = /** @class */ (function () {
    function SubmitCompletedVisitComponent(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    SubmitCompletedVisitComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'submit-completed-visit',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/submit-completed-visit/submit-completed-visit.html"*/'<h3 class="text-center uppercase">Are you ready to complete your visit?</h3>\n<ion-row justify-content-center>\n    <button\n        ion-button\n        large\n        round\n        (click)="viewCtrl.dismiss(true)"\n    >\n        Save and submit\n    </button>\n</ion-row>\n<ion-row justify-content-center>\n    <button\n        ion-button\n        large\n        color="secondary"\n        round\n        outline\n        (click)="viewCtrl.dismiss(false)"\n    >\n        Dismiss\n    </button>\n</ion-row>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/submit-completed-visit/submit-completed-visit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__["a" /* ViewController */]])
    ], SubmitCompletedVisitComponent);
    return SubmitCompletedVisitComponent;
}());

//# sourceMappingURL=submit-completed-visit.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuccessSignupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SuccessSignupComponent = /** @class */ (function () {
    function SuccessSignupComponent(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    SuccessSignupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'success-signup',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/success-signup/success-signup.html"*/'<h3 class="text-center uppercase">Your account was created successfully</h3>\n<ion-row justify-content-center>\n    <button\n        ion-button\n        large\n        round\n        block\n        padding\n        (click)="viewCtrl.dismiss()"\n    >\n        Create my first visit\n    </button>\n</ion-row>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/success-signup/success-signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], SuccessSignupComponent);
    return SuccessSignupComponent;
}());

//# sourceMappingURL=success-signup.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActiveVisitExistsModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ActiveVisitExistsModalComponent = /** @class */ (function () {
    function ActiveVisitExistsModalComponent(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    ActiveVisitExistsModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'active-visit-exists',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/active-visit-exists/active-visit-exists.html"*/'<h3 class="text-center uppercase">You already have an active visit.</h3>\n<p class="text-center">\n    To create a new visit, first complete the existing visit.\n</p>\n<ion-row justify-content-center>\n    <button\n        ion-button\n        large\n        round\n        outline\n        (click)="viewCtrl.dismiss()"\n    >\n        Dismiss\n    </button>\n</ion-row>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/active-visit-exists/active-visit-exists.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], ActiveVisitExistsModalComponent);
    return ActiveVisitExistsModalComponent;
}());

//# sourceMappingURL=active-visit-exists.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActiveVisitDoesNotExistComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ActiveVisitDoesNotExistComponent = /** @class */ (function () {
    function ActiveVisitDoesNotExistComponent(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    ActiveVisitDoesNotExistComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'active-visit-does-not-exist',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/active-visit-does-not-exist/active-visit-does-not-exist.html"*/'<h3 class="text-center uppercase">You don\'t have an active visit</h3>\n<ion-row justify-content-center>\n    <button\n        ion-button\n        large\n        round\n        (click)="viewCtrl.dismiss(true)"\n    >\n        Create visit\n    </button>\n</ion-row>\n<ion-row justify-content-center>\n    <button\n        ion-button\n        large\n        color="secondary"\n        round\n        outline\n        (click)="viewCtrl.dismiss()"\n    >\n        Dismiss\n    </button>\n</ion-row>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/_modals/active-visit-does-not-exist/active-visit-does-not-exist.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], ActiveVisitDoesNotExistComponent);
    return ActiveVisitDoesNotExistComponent;
}());

//# sourceMappingURL=active-visit-does-not-exist.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/* tslint:disable no-console quotemark */
var LogService = /** @class */ (function () {
    function LogService() {
    }
    LogService.log = function (caller, toBeLogged) {
        var now = new Date();
        console.groupCollapsed("%c" + now.toLocaleTimeString() + " | " + caller + " says:", 'background: black; color: white; padding: 2px 4px;');
        console.log(toBeLogged);
        console.groupEnd();
    };
    LogService.logHttpRequest = function (request) {
        var now = new Date();
        console.groupCollapsed("%c" + now.toLocaleTimeString() + " | [HTTP REQUEST] | " + request.url.split('api')[1], 'background: #0d47a1; color: white; padding: 2px 4px;');
        console.log(request.method.toLocaleUpperCase());
        console.log(request.url);
        if (request.params !== null && request.params.toString().length > 0) {
            console.log('Params:');
            console.log(request.params.toString());
        }
        else if (request.body !== null && JSON.stringify(request.body).length < 200) {
            console.log('Request body:');
            console.log(request.body);
        }
        else {
            console.log("%cNothin' sent with this request", 'font-style: italic;');
        }
        console.groupEnd();
    };
    LogService.logHttpResponse = function (response, duration) {
        var now = new Date();
        console.groupCollapsed("%c" + now.toLocaleTimeString() + " | [HTTP RESPONSE] | " + response.url.split('api')[1], 'background: #0da168; color: white; padding: 2px 4px;');
        console.log(response.url);
        console.log(response.status);
        console.log('Response body:');
        if (JSON.stringify(response.body).length < 5000) {
            console.log(response.body);
        }
        else {
            console.log("%cResponse too frinkin' large for this console!", 'font-style: italic;');
        }
        console.log(duration + "ms");
        console.groupEnd();
    };
    LogService.logHttpError = function (error) {
        var now = new Date();
        console.groupCollapsed("%c" + now.toLocaleTimeString() + " | [HTTP ERROR] | " + (error.url ? error.url.split('api')[1] : undefined), 'background: #d42424; color: white; padding: 2px 4px;');
        console.log(error.url || undefined);
        console.log(error.status || undefined);
        console.log(error.message || 'No message!');
        console.groupEnd();
    };
    LogService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], LogService);
    return LogService;
}());

//# sourceMappingURL=log.service.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultsBoardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_firebase_service__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResultsBoardPage = /** @class */ (function () {
    function ResultsBoardPage(navCtrl, navParams, fb) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        fb.getResultsBoard().subscribe(function (results) { return (_this.results = results); });
    }
    ResultsBoardPage.prototype.formatScoreAsPercentage = function (score) {
        if (score <= 0) {
            return '0.0';
        }
        return (score / 10 * 100).toFixed(1);
    };
    ResultsBoardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-results-board',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/results-board/results-board.html"*/'<ion-header>\n    <ion-navbar>\n        <button\n            ion-button\n            menuToggle\n        >\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Results board</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-card padding>\n        <ion-row\n            justify-content-between\n            align-items-center\n        >\n            <p>\n                <ion-icon name="time"></ion-icon>\n                Last updated\n            </p>\n            <p>{{ fb.readResultsBoardLastUpdated() }}</p>\n        </ion-row>\n    </ion-card>\n    <ion-row\n        *ngFor="let dmit of results; let i = index;"\n        justify-content-between\n        align-items-center\n    >\n        <p>{{ dmit.user }}</p>\n        <h5>\n            {{ formatScoreAsPercentage(dmit.score) }}%\n        </h5>\n    </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/results-board/results-board.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_firebase_service__["a" /* FirebaseService */]])
    ], ResultsBoardPage);
    return ResultsBoardPage;
}());

//# sourceMappingURL=results-board.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitHistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_firebase_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_date_time_service__ = __webpack_require__(183);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VisitHistoryPage = /** @class */ (function () {
    function VisitHistoryPage(navCtrl, navParams, fb, dateTimeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.dateTimeService = dateTimeService;
        this.visitHistory = this.fb.readVisitHistory();
    }
    VisitHistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visit-history',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/visit-history/visit-history.html"*/'<ion-header>\n    <ion-navbar>\n        <button\n            ion-button\n            menuToggle\n        >\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>My visit history</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <img\n        src="assets/imgs/logo.png"\n        class="dmit-logo"\n    >\n    <ion-list *ngFor="let visit of visitHistory">\n        <ion-item>\n            <ion-row\n                justify-content-between\n                align-items-center\n            >\n                <span>Visit date</span>\n                <span>\n                    {{ dateTimeService.timestampToDisplayDate(visit.visitDate) }}\n                </span>\n            </ion-row>\n        </ion-item>\n        <ion-item>\n            <ion-row\n                justify-content-between\n                align-items-center\n            >\n                <span>Visit type</span>\n                <span>{{ visit.visitType }}</span>\n            </ion-row>\n        </ion-item>\n        <ion-item>\n            <ion-row\n                justify-content-between\n                align-items-center\n            >\n                <span>Trend</span>\n                <span>{{ visit.salesTrend }}</span>\n            </ion-row>\n        </ion-item>\n        <ion-item>\n            <ion-row\n                justify-content-between\n                align-items-center\n            >\n                <span>Visit goal</span>\n                <span>{{ visit.goalSet }}</span>\n            </ion-row>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/pages/visit-history/visit-history.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_date_time_service__["a" /* DateTimeService */]])
    ], VisitHistoryPage);
    return VisitHistoryPage;
}());

//# sourceMappingURL=visit-history.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(393);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_firebase_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_log_service__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__interceptors_httpLogger_interceptor__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_date_time_service__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_visit_progress_visit_progress__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_modals_active_visit_exists_active_visit_exists__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_modals_active_visit_does_not_exist_active_visit_does_not_exist__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_modals_success_success__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_modals_submit_completed_visit_submit_completed_visit__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_modals_create_visit_invalid_create_visit_invalid__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_sign_up_sign_up__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_modals_success_signup_success_signup__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_modals_encountered_problem_encountered_problem__ = __webpack_require__(186);
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
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__components_modals_active_visit_does_not_exist_active_visit_does_not_exist__["a" /* ActiveVisitDoesNotExistComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_modals_active_visit_exists_active_visit_exists__["a" /* ActiveVisitExistsModalComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["a" /* ActiveVisitPage */],
                __WEBPACK_IMPORTED_MODULE_17__components_modals_create_visit_invalid_create_visit_invalid__["a" /* CreateVisitInvalidComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["b" /* CreateVisitPage */],
                __WEBPACK_IMPORTED_MODULE_20__components_modals_encountered_problem_encountered_problem__["a" /* EncounteredProblemComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["c" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["d" /* ResultsBoardPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_16__components_modals_submit_completed_visit_submit_completed_visit__["a" /* SubmitCompletedVisitComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_modals_success_success__["a" /* SuccessComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_modals_success_signup_success_signup__["a" /* SuccessSignupComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["e" /* VisitHistoryPage */],
                __WEBPACK_IMPORTED_MODULE_12__components_visit_progress_visit_progress__["a" /* VisitProgressComponent */]
            ],
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/active-visit/active-visit.module#ActiveVisitPageModule', name: 'ActiveVisitPage', segment: 'active-visit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/create-visit/create-visit.module#CreateVisitPageModule', name: 'CreateVisitPage', segment: 'create-visit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/results-board/results-board.module#ResultsBoardPageModule', name: 'ResultsBoardPage', segment: 'results-board', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sign-up/sign-up.module#SignUpPageModule', name: 'SignUpPage', segment: 'sign-up', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/visit-history/visit-history.module#VisitHistoryPageModule', name: 'VisitHistoryPage', segment: 'visit-history', priority: 'low', defaultHistory: [] }
                    ]
                })],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__components_modals_active_visit_does_not_exist_active_visit_does_not_exist__["a" /* ActiveVisitDoesNotExistComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_modals_active_visit_exists_active_visit_exists__["a" /* ActiveVisitExistsModalComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["a" /* ActiveVisitPage */],
                __WEBPACK_IMPORTED_MODULE_17__components_modals_create_visit_invalid_create_visit_invalid__["a" /* CreateVisitInvalidComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["b" /* CreateVisitPage */],
                __WEBPACK_IMPORTED_MODULE_20__components_modals_encountered_problem_encountered_problem__["a" /* EncounteredProblemComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["c" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["d" /* ResultsBoardPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_16__components_modals_submit_completed_visit_submit_completed_visit__["a" /* SubmitCompletedVisitComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_modals_success_success__["a" /* SuccessComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_modals_success_signup_success_signup__["a" /* SuccessSignupComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["e" /* VisitHistoryPage */]
            ],
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_9__interceptors_httpLogger_interceptor__["a" /* HttpLoggerInterceptor */],
                    multi: true
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */],
                    useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */]
                },
                __WEBPACK_IMPORTED_MODULE_11__services_date_time_service__["a" /* DateTimeService */],
                __WEBPACK_IMPORTED_MODULE_7__services_firebase_service__["a" /* FirebaseService */],
                __WEBPACK_IMPORTED_MODULE_8__services_log_service__["a" /* LogService */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = generateDayResults;
function generateDayResults(visitDate) {
    var dates = [];
    for (var i = 0; i < 10; i++) {
        var d = new Date(visitDate);
        d.setDate(d.getDate() + i);
        dates.push({
            date: d.toISOString(),
            result: null
        });
    }
    return dates;
}
//# sourceMappingURL=empty-day-results.js.map

/***/ }),

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_firebase_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_create_visit_create_visit__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_active_visit_active_visit__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_index__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_modals_active_visit_exists_active_visit_exists__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_modals_active_visit_does_not_exist_active_visit_does_not_exist__ = __webpack_require__(365);
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
    function MyApp(platform, statusBar, splashScreen, fb, modalCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.fb = fb;
        this.modalCtrl = modalCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.pages = [
            { title: 'My active visit', component: __WEBPACK_IMPORTED_MODULE_7__pages_active_visit_active_visit__["a" /* ActiveVisitPage */] },
            { title: 'New visit', component: __WEBPACK_IMPORTED_MODULE_6__pages_create_visit_create_visit__["a" /* CreateVisitPage */] },
            { title: 'My visit history', component: __WEBPACK_IMPORTED_MODULE_8__pages_index__["e" /* VisitHistoryPage */] },
            { title: 'Results board', component: __WEBPACK_IMPORTED_MODULE_8__pages_index__["d" /* ResultsBoardPage */] },
            { title: 'Sign off', component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */] }
        ];
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        if (page.component === __WEBPACK_IMPORTED_MODULE_6__pages_create_visit_create_visit__["a" /* CreateVisitPage */] &&
            this.fb.readActiveVisit() !== undefined) {
            var alreadyExistsModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__components_modals_active_visit_exists_active_visit_exists__["a" /* ActiveVisitExistsModalComponent */]);
            alreadyExistsModal.present();
            return;
        }
        if (page.component === __WEBPACK_IMPORTED_MODULE_7__pages_active_visit_active_visit__["a" /* ActiveVisitPage */] &&
            this.fb.readActiveVisit() === undefined) {
            var doesntExistModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__components_modals_active_visit_does_not_exist_active_visit_does_not_exist__["a" /* ActiveVisitDoesNotExistComponent */]);
            doesntExistModal.present();
            doesntExistModal.onDidDismiss(function (data) {
                if (data) {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_create_visit_create_visit__["a" /* CreateVisitPage */]);
                }
            });
            return;
        }
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n        <ion-toolbar>\n            <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n        <ion-list>\n            <button\n                menuClose\n                ion-item\n                *ngFor="let p of pages"\n                (click)="openPage(p)"\n            >\n                {{p.title}}\n            </button>\n        </ion-list>\n    </ion-content>\n\n</ion-menu>\n\n<ion-nav\n    [root]="rootPage"\n    #content\n    swipeBackEnabled="false"\n></ion-nav>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_firestore__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_firestore__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FirebaseService = /** @class */ (function () {
    function FirebaseService() {
        var _this = this;
        this._user = null;
        this._visitTypes = [];
        this._resultsBoardLastUpdated = new Date().toLocaleTimeString();
        try {
            __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.initializeApp(FirebaseService_1.FIREBASE_CREDENTIALS);
            __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
                .firestore()
                .collection('visitType')
                .get()
                .then(function (typeDocs) {
                typeDocs.forEach(function (typeDoc) {
                    _this._visitTypes.push(typeDoc.data());
                });
            });
        }
        catch (error) {
            throw error;
        }
    }
    FirebaseService_1 = FirebaseService;
    Object.defineProperty(FirebaseService.prototype, "user", {
        set: function (user) {
            this._user = user;
        },
        enumerable: true,
        configurable: true
    });
    FirebaseService.prototype.authenticateUser = function (email, password) {
        var userSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function (success) {
            userSubject.next(true);
        }, function (error) {
            userSubject.next(false);
        });
        return userSubject;
    };
    FirebaseService.prototype.createUser = function (email, password) {
        var _this = this;
        var successSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (success) {
            successSubject.next(true);
            __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
                .firestore()
                .doc("users/" + email)
                .set({
                email: email,
                bestScore: 0
            });
            _this._user = {
                id: email,
                email: email,
                bestScore: 0
            };
        }, function (error) {
            successSubject.next(false);
        });
        return successSubject;
    };
    FirebaseService.prototype.createVisit = function (visit) {
        var newVisitSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .firestore()
            .collection('visits')
            .add(visit)
            .then(function (newVisit) {
            newVisitSubject.next(true);
        });
        return newVisitSubject;
    };
    FirebaseService.prototype.getActiveVisit = function (userId) {
        var _this = this;
        var visitsSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .firestore()
            .collection('visits')
            .where('userId', '==', userId)
            .get()
            .then(function (visitsSnapshot) {
            var activeVisit = visitsSnapshot.docs.find(function (doc) { return doc.data().status === 'active'; });
            _this._activeVisit =
                activeVisit !== undefined
                    ? __assign({}, activeVisit.data(), { id: activeVisit.id })
                    : undefined;
            visitsSubject.next(activeVisit !== undefined ? activeVisit.data() : undefined);
        });
        return visitsSubject;
    };
    FirebaseService.prototype.getResultsBoard = function () {
        var _this = this;
        var resultBoardSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .firestore()
            .collection('users')
            .orderBy('bestScore', 'desc')
            .onSnapshot(function (usersSnapshot) {
            _this._resultsBoardLastUpdated = new Date().toLocaleTimeString();
            var resultsBoard = usersSnapshot.docs.map(function (userDoc) {
                return {
                    user: userDoc.id,
                    score: userDoc.data().bestScore
                };
            });
            resultBoardSubject.next(resultsBoard);
        });
        return resultBoardSubject;
    };
    FirebaseService.prototype.getUserProfile = function (email) {
        var _this = this;
        var userSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then(function (users) {
            userSubject.next(__assign({ id: users.docs[0].id }, users.docs[0].data()));
            _this.initVisitsListener();
        });
        return userSubject;
    };
    FirebaseService.prototype.initVisitsListener = function () {
        var _this = this;
        var visits = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .firestore()
            .collection('visits')
            .where('userId', '==', this._user.id);
        visits.get().then(function (visits) {
            _this._visitHistory = [];
            visits.docs.forEach(function (visit) {
                if (visit.data().status === 'complete') {
                    _this._visitHistory.push(visit.data());
                }
            });
        });
        visits.onSnapshot(function (visits) {
            _this._visitHistory = [];
            visits.docs.forEach(function (doc) {
                if (doc.data().status === 'complete') {
                    _this._visitHistory.push(doc.data());
                }
            });
        });
    };
    FirebaseService.prototype.readActiveVisit = function () {
        return this._activeVisit;
    };
    FirebaseService.prototype.readResultsBoardLastUpdated = function () {
        return this._resultsBoardLastUpdated;
    };
    FirebaseService.prototype.readUserProfile = function () {
        return this._user;
    };
    FirebaseService.prototype.readVisitHistory = function () {
        return this._visitHistory;
    };
    FirebaseService.prototype.readVisitTypes = function () {
        return this._visitTypes;
    };
    FirebaseService.prototype.updateActiveVisit = function (visit) {
        var _this = this;
        var successSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .firestore()
            .collection('visits')
            .doc(visit.id)
            .set(visit)
            .then(function () {
            _this._activeVisit = visit.status === 'complete' ? undefined : visit;
            successSubject.next(true);
        })
            .catch(function (error) { return successSubject.next(false); });
        return successSubject;
    };
    FirebaseService.FIREBASE_CREDENTIALS = {
        apiKey: 'AIzaSyCaDyAh0QyfEOmcBfVA_lQio8qlDsQxbNI',
        authDomain: 'dmit-visit-tracker.firebaseapp.com',
        databaseURL: 'https://dmit-visit-tracker.firebaseio.com',
        projectId: 'dmit-visit-tracker',
        storageBucket: 'dmit-visit-tracker.appspot.com',
        messagingSenderId: '648342855448'
    };
    FirebaseService = FirebaseService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], FirebaseService);
    return FirebaseService;
    var FirebaseService_1;
}());

//# sourceMappingURL=firebase.service.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpLoggerInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_log_service__ = __webpack_require__(366);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HttpLoggerInterceptor = /** @class */ (function () {
    function HttpLoggerInterceptor() {
    }
    HttpLoggerInterceptor.prototype.intercept = function (request, next) {
        var start = Date.now();
        __WEBPACK_IMPORTED_MODULE_3__services_log_service__["a" /* LogService */].logHttpRequest(request);
        return next.handle(request).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function (response) {
            var end = Date.now();
            if (response instanceof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpResponse */]) {
                __WEBPACK_IMPORTED_MODULE_3__services_log_service__["a" /* LogService */].logHttpResponse(response, end - start);
            }
        }, function (error) { return __WEBPACK_IMPORTED_MODULE_3__services_log_service__["a" /* LogService */].logHttpError(error); }));
    };
    HttpLoggerInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])()
    ], HttpLoggerInterceptor);
    return HttpLoggerInterceptor;
}());

//# sourceMappingURL=httpLogger.interceptor.js.map

/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitProgressComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VisitProgressComponent = /** @class */ (function () {
    function VisitProgressComponent() {
    }
    VisitProgressComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'dmit-visit-progress',template:/*ion-inline-start:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/visit-progress/visit-progress.html"*/'<h4 class="text-center uppercase">Record each day\'s result below</h4>\n\n<ion-row\n    justify-content-center\n    align-items-center\n>\n    <ng-container *ngFor="let progressBar of progressBars"></ng-container>\n</ion-row>\n'/*ion-inline-end:"/home/aaron/Desktop/dmit-visit-tracker/src/app/_components/visit-progress/visit-progress.html"*/
        })
    ], VisitProgressComponent);
    return VisitProgressComponent;
}());

//# sourceMappingURL=visit-progress.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login__ = __webpack_require__(214);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__login_login__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__active_visit_active_visit__ = __webpack_require__(213);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__active_visit_active_visit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__results_board_results_board__ = __webpack_require__(383);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__results_board_results_board__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__visit_history_visit_history__ = __webpack_require__(384);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__visit_history_visit_history__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_visit_create_visit__ = __webpack_require__(126);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__create_visit_create_visit__["a"]; });





//# sourceMappingURL=index.js.map

/***/ })

},[385]);
//# sourceMappingURL=main.js.map