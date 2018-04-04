import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';
import { OfferEditPage } from '../offer-edit/offer-edit';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DomSanitizer} from '@angular/platform-browser';

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
export class OffersPage implements OnDestroy{
  restUrl;
  offers = [{}];
  constructor(public navCtrl: NavController, public navParams: NavParams, public resthandler: ResthandlerProvider, private authService: AuthServiceProvider, private sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.restUrl = this.authService.backendURL;
    this.restUrl = this.authService.backendURL;
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
  newOffer() {
    this.navCtrl.push('OfferNewPage');
  }
  deactivateOffer(estate_id) {
    this.resthandler.deleteEstate(estate_id).subscribe((data)=>{})
  }
  ngOnDestroy() {
    // this.navCtrl.push('OffersPage')
  }

  sanitizeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
