import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the OfferNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer-new',
  templateUrl: 'offer-new.html',
})
export class OfferNewPage {

  offerForm = new FormGroup({
    'immo_address': new FormControl(
      null,
      [
        Validators.required
      ]),
    'immo_baujahr': new FormControl(
      null,
      [
        Validators.required
      ]),
    'immo_condition': new FormControl(
      null,
      [
        Validators.required
      ]),
    'offer_title': new FormControl(
      null,
      [
        Validators.required
      ]),
    'immo_desc': new FormControl(
      null,
      [
        Validators.required
      ]),
    'immo_features': new FormControl(
      null,
      [
        Validators.required
      ]),
    'immo_floors': new FormControl(
      null,
      [
        Validators.required
      ]),
    'immo_heating': new FormControl(
      null,
      [
        Validators.required
      ]),
    'immo_media': new FormControl(
      null,
      []),
    'immo_purpose': new FormControl(
      null,
      [
        Validators.required
      ]),
    'immo_qm': new FormControl(
      null,
      [
        Validators.required
      ]),
    'immo_rooms': new FormControl(
      null,
      [
        Validators.required
      ]),
    'immo_type': new FormControl(
      null,
      [
        Validators.required
      ]),
    'offer_pricing': new FormControl(
      null,
      [
        Validators.required
      ]),
    'offer_provision': new FormControl(
      null,
      [
        Validators.required
      ]),
    'offer_utilcosts': new FormControl(
      null,
      [
        Validators.required
      ]),
    'city_name': new FormControl(
      null,
      [
        Validators.required
      ]),
    'city_plz': new FormControl(
      null,
      [
        Validators.required
      ]),
    'offer_type': new FormControl(
      null,
      [
        Validators.required
      ]),
    'offer_bail': new FormControl(
      null,
      [
        Validators.required
      ]),
    'offer_startdate': new FormControl(
      null,
      [
        Validators.required
      ])
    ,
    'offer_enddate': new FormControl(
      null,
      [
        Validators.required
      ])
    ,
    'agent_id': new FormControl(
      null,
      [
        Validators.required
      ])
  })
  agents = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private resthandler: ResthandlerProvider, private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad OfferNewPage');
    if(this.authService.getUserInfo().role === 2 ) {
      this.resthandler.getAllAgents().subscribe( (data: any) => {
        if(data.response == 'true') {
          this.agents = data.result;
          console.log(data);
          /*
          agency: "CSURealEstate"
          ​firstname: "Luka"
          ​​​id: 1
          ​​​lastname: "Eggers"
           */
        }
      })
    }
  }

  commitEstate() {
    // console.log('trying finish')
    const estate = {
      "agentID": this.authService.getUserInfo().id,
      "ownerID": this.authService.getUserInfo().id,
      "request": 3,
      "title": this.offerForm.controls.offer_title.value,
      "desc": this.offerForm.controls.immo_desc.value,
      "estateType": this.offerForm.controls.immo_type.value,
      "offerPurpose": this.offerForm.controls.immo_purpose.value,
      "condition": this.offerForm.controls.immo_condition.value,
      "heatingType": this.offerForm.controls.immo_heating.value,
      "baujahr": this.offerForm.controls.immo_baujahr.value,
      "features": this.offerForm.controls.immo_features.value,
      "address": this.offerForm.controls.immo_address.value,
      "postal": this.offerForm.controls.city_plz.value,
      "city": this.offerForm.controls.city_name.value,
      "floors": this.offerForm.controls.immo_floors.value,
      "rooms": this.offerForm.controls.immo_rooms.value,
      "size": this.offerForm.controls.immo_qm.value,
      "offerType": this.offerForm.controls.offer_type.value,
      "price": this.offerForm.controls.offer_pricing.value,
      "bail": this.offerForm.controls.offer_bail.value,
      "provision": this.offerForm.controls.offer_provision.value,
      "utilities": this.offerForm.controls.offer_utilcosts.value,
      "startdate": this.offerForm.controls.offer_startdate.value,
      "enddate": this.offerForm.controls.offer_enddate.value,
      "Attachments": [],
      "HasFiles": false,
      "isLocal": false
    };
    this.resthandler.pushEstate(estate).subscribe(success => {
        console.log(success);
      },
      (error) => {
        console.log(error)
      },
      () => {
      console.log('new offer comitted?')
      });
  }

  manageFiles() {

  }

}
