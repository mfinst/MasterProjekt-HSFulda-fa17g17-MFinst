import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';

/**
 * Generated class for the EstateDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estate-detail',
  templateUrl: 'estate-detail.html',
})
export class EstateDetailPage {
  offer = {data: {}};
  featureslist = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private resthandler: ResthandlerProvider) {
  }

  ionViewDidLoad() {
    const angebot_id = this.navParams.get('angebot_id');
    console.log(angebot_id);
    this.resthandler.getEstateById(angebot_id).subscribe((estate: any) => {
      console.log(estate.data.immo_type);
      /*
      agent_agency: "SFStateHomes"
      agent_firstname: "Sebastian"
      agent_id: 2
      agent_lastname: "Drechsler"
      agent_nick: "admin@admin2.de"
      angebot_id: 6
      city_name: "Fulda"
      city_plz: "36037"
      immo_address: "Heinrich-von-Bibra-Platz 5"
      immo_baujahr: 1997
      immo_condition: "Maintained"
      immo_desc: "Today we can offer you a versatile, massive and detached house. The situation can be described as good. City bus stop only a few minutes away. All things of daily life within easy reach. Due to its flexible layout, the residential building offers a wide range of possible uses."
      immo_features: "Guest toilet,Basement,Granny flat"
      immo_floors: 2
      immo_heating: "Centralized (Gas)"
      immo_media: "haus1.jpg,haus2.jpg,haus3.jpg"
      immo_owner: 5
      immo_purpose: "Private"
      immo_qm: 210
      immo_rooms: 9
      immo_type: "House"
      offer_bail: "1,200.00 €"
      offer_enddate: "2018-11-23"
      offer_pricing: "650.00 €"
      offer_provision: "0.00 %"
      offer_startdate: "2017-12-05"
      offer_title: "Viewpoint. 2-3 residential units - level plot - good infrastructure"
      offer_type: "Rent"
      offer_utilcosts: "250.00 €"
      */
      this.offer = estate;
      const featureString = estate.data.immo_features;
      this.featureslist = featureString.split(',')
    })
  }

}
