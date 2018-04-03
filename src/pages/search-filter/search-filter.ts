import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EstateFilterModel } from '../../providers/resthandler/estate-filter.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the SearchFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html',
})
export class SearchFilterPage {
  filter: EstateFilterModel;
  alreadySearched = false;
  searchFormular = new FormGroup({
    'requestType': new FormControl(
      'buy',
      [
        Validators.required
      ]),
    'city': new FormControl(
      null,
      []
    ),
    'type': new FormControl(
      'Estate',
      [
        Validators.required
      ]
    ),
    'qm': new FormControl(
      null,
      [
        Validators.required
      ]
    ),
    'price': new FormControl(
      null,
      [
        Validators.required
      ]
    ),
    'rooms': new FormControl(
      1,
      [
        Validators.required
      ]
    )
  });
  filterFormular = new FormGroup({
    'minprice': new FormControl(
      null,
      []),
    'maxprice': new FormControl(
      null,
      []),
    'minqm': new FormControl(
      null,
      []),
    'maxqm': new FormControl(
      null,
      []),
    'year': new FormControl(
      null,
      []),
    'heating': new FormControl(
      null,
      []),
    'agency': new FormControl(
      null,
      [])
  });

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.alreadySearched = this.navParams.get('gen');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SearchFilterPage');
  }

  dismiss(newSearch: boolean) {
    this.filter = new EstateFilterModel();
    this.filter.newSearch = newSearch;
    // Search Params
    this.filter.angebot_art = this.searchFormular.value.requestType;
    this.filter.ort = this.searchFormular.value.city;
    this.filter.objektart = this.searchFormular.value.type;
    this.filter.qm = this.searchFormular.value.qm
    this.filter.preis = this.searchFormular.value.price;
    this.filter.zimmeranzahl = this.searchFormular.value.rooms;
    // Filter Params
    this.filter.maxQm = this.filterFormular.value.maxqm === null ? 1000000 : this.filterFormular.value.maxqm;
    this.filter.minQm = this.filterFormular.value.minqm === null ? 0 : this.filterFormular.value.minqm;
    this.filter.maxPreis = this.filterFormular.value.maxprice === null ? 5000000 : this.filterFormular.value.maxprice;
    this.filter.minPreis = this.filterFormular.value.minprice === null ? 0 : this.filterFormular.value.minprice;
    this.filter.bauJahr = this.filterFormular.value.year === null ? 1900 : this.filterFormular.value.year;
    this.filter.heizungs_art = this.filterFormular.value.heating === null ? '' : this.filterFormular.value.heating;
    this.filter.agencyID = this.filterFormular.value.agency === null ? '' : this.filterFormular.value.agency;
    // Filter Test
    console.log('Filter Test')
    console.log(this.filter);
    // Empty Parameters are null!
    this.viewCtrl.dismiss(this.filter);
  }

}
