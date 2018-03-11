import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';
import { OfferEditPage } from '../offer-edit/offer-edit';

/**
 * Generated class for the OffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {
  offers = [{}];
  constructor(public navCtrl: NavController, public navParams: NavParams, public resthandler: ResthandlerProvider) {
  }

  ionViewDidLoad() {
    this.loadOwnOffers();
  }
  loadOwnOffers() {
    this.resthandler.getEstateByUser().subscribe( (offers: any) =>{
      console.log(offers);
      this.offers = offers.data.Offers;
    })
  }
  editOffer(offerId) {
    // new route to the offer
    this.navCtrl.push('OfferEditPage', {id: offerId})
  }
  deactivateOffer(offerId) {
    // RestCall to deactivate
  }

}
