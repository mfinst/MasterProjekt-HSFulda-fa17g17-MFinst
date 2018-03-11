import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the OfferEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer-edit',
  templateUrl: 'offer-edit.html',
})
export class OfferEditPage {
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
      [
        Validators.required
      ]),
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
  })
  offer = {data: {angebot_id: ''}}

  constructor(public navCtrl: NavController, public navParams: NavParams, private resthandler: ResthandlerProvider) {
  }

  ionViewDidLoad() {
    this.resthandler.getEstateById(this.navParams.get('id')).subscribe((offer: any) => {
      this.offer = offer;
      this.offerForm.patchValue({
        'immo_address': offer.data.immo_address,
        'immo_baujahr': offer.data.immo_baujahr,
        'immo_condition': offer.data.immo_condition,
        'offer_title': offer.data.offer_title,
        'immo_desc': offer.data.immo_desc,
        'immo_features': offer.data.immo_features,
        'immo_floors': offer.data.immo_floors,
        'immo_heating': offer.data.immo_heating,
        // File selection dialog?
        'immo_media': offer.data.immo_media,
        'immo_purpose': offer.data.immo_purpose,
        'immo_qm': offer.data.immo_qm,
        'immo_rooms': offer.data.immo_rooms,
        'immo_type': offer.data.immo_type,
        'offer_pricing': offer.data.offer_pricing,
        'offer_provision': offer.data.offer_provision,
        'offer_utilcosts': offer.data.offer_utilcosts,
        'city_name': offer.data.city_name,
        'city_plz': offer.data.city_plz,
        'offer_type': offer.data.offer_type,
        'offer_bail': offer.data.offer_bail,
        'offer_startdate': offer.data.offer_startdate,
        'offer_enddate': offer.data.offer_enddate
      });
    });
  }

  saveChanges() {
    const updatedEstate = {
      "immoID": this.offer.data.angebot_id,
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
      "enddate":  this.offerForm.controls.offer_enddate.value
    };
    console.log(updatedEstate);
    this.resthandler.updateEstate(updatedEstate).subscribe(success => {
      console.log('success!!!')
      // this.navCtrl.push('OffersPage');
    });
    // no fall back!
  }

  resetChanges() {
  }
}
