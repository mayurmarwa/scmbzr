var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Enquiries page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EnquiriesPage = (function () {
    function EnquiriesPage(navCtrl, navParams, af, storage, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        storage.ready().then(function () {
            storage.get('currentuser').then(function (val) {
                _this.currentuser = JSON.parse(val);
                _this.segment = "received";
                _this.currentuserid = _this.currentuser.uid;
                //this.enquiryList = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
            })
                .catch(function (err) {
                return console.log(err);
            });
        }).catch(function (err) {
            return console.log(err);
        });
    }
    EnquiriesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EnquiriesPage');
    };
    EnquiriesPage.prototype.ionViewDidEnter = function () {
        this.updateEnquiryList();
    };
    EnquiriesPage.prototype.openenquirypage = function (enquiry) {
        this.navCtrl.push(EnquiryDetailsPage, { enquiry: enquiry });
    };
    EnquiriesPage.prototype.updateEnquiryList = function () {
        console.log('ionViewDidEnter EnquiriesPage');
        this.loadingPopup = this.loadingCtrl.create({
            content: 'Updating...'
        });
        this.loadingPopup.present();
        if (this.currentuserid) {
            console.log(this.segment);
            this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
                query: {
                    orderByChild: "type",
                    equalTo: this.segment
                }
            });
            this.enqListRev = this.enquiryList.map(function (arr) { return arr.reverse(); });
            this.loadingPopup.dismiss();
        }
    };
    return EnquiriesPage;
}());
EnquiriesPage = __decorate([
    Component({
        selector: 'page-enquiries',
        templateUrl: 'enquiries.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, Storage, LoadingController])
], EnquiriesPage);
export { EnquiriesPage };
//# sourceMappingURL=enquiries.js.map