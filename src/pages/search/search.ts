import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { SearchFilterPage } from '../search-filter/search-filter';
import { EstateFilterModel } from '../../providers/resthandler/estate-filter.model';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  estates: any[];
  newSearch = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private resthandler: ResthandlerProvider) {
  }

  ionViewDidLoad() {
    // this.estates = [[{imgUrl: 'house.png', price: '42' , id: 'test', name: 'Top Estate'}]];
    console.log('ionViewDidLoad SearchPage');
  }

  loadEstates(searchParams) {
    // Check Params
    // Convert Params
    // Send Rest Call
    // in subscribe Block =
    // const result = this.estates;
    // for (let i = 0; i < result.length; i++) {
    //   for (const estate of result) {
    //
    //   }
    // }
  }

  //
  updateEstateList(event: any) {
    // muss
    this.estates = [{
      imgUrl: 'https://thumb1.shutterstock.com/display_pic_with_logo/911164/162839450/stock-photo-modern-office-buildings-bottom-up-view-162839450.jpg',
      price: '42', id: 'test', name: 'Top Estate'
    }];
  }

  toEstateDetail(angebot_id: number) {
    // loading alert bauen
    // console.log(event);
    this.navCtrl.push('EstateDetailPage',{angebot_id: angebot_id})
  }

  presentFilterModal() {
    console.log(this.newSearch);
    let filterModal = this.modalCtrl.create(SearchFilterPage, {gen: this.newSearch});
    filterModal.onDidDismiss((filter: EstateFilterModel) => {

      let sub: Observable<any>;
      if (filter.newSearch) {
        sub = this.resthandler.searchEstates(filter);
      } else {
        sub = this.resthandler.filterEstates(filter);
      }
      sub.subscribe((data) => {
        console.log(data);
        this.estates = data;
      })
      this.newSearch = filter.newSearch;
    });
    filterModal.present();
  }
}
