import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../auth-service/auth-service';
import { MessageModel } from './msg.model';
import { EstateFilterModel } from './estate-filter.model';

/*
  Generated class for the ResthandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResthandlerProvider {
  constructor(public http: HttpClient, public authServive: AuthServiceProvider) {

  }

  pushEstate(estate) {}
  updateEstate(updatedEstate: any) {
    return this.http.post('http://' + this.authServive.backendURL + '/fa17g17/estatehandling/update', updatedEstate);
  }
  getUserdata(userID) {
    return this.http.post('http://' + this.authServive.backendURL + '/fa17g17/user/profile', {id: userID});
  }
  updateUsercredentials(userID, mail: string, password: string) {
    return this.http.post('http://' + this.authServive.backendURL + '/fa17g17/user/update/credentials', {id: userID, mail: mail, password: password});
  }
  updateUseragencystatus(userID, agency: string, agentID: string) {
    return this.http.post('http://' + this.authServive.backendURL + '/fa17g17/user/update/role', {id: userID, agency: agency, agentID: agentID});
  }
  updateUserContact(userID, firstname: string, lastname: string, telephone: string, street: string, city: string, postalcode: string) {
    return this.http.post('http://' + this.authServive.backendURL + '/fa17g17/user/update/contactInfo', {
      id: userID,
      firstname: firstname,
      lastname: lastname,
      telephone: telephone,
      street: street,
      city: city,
      postalcode: postalcode
    });
  }
  searchEstates(filter: EstateFilterModel) {
    return this.http.post( 'http://' + this.authServive.backendURL + '/fa17g17/estatesearch/search', filter.toJsonRequiredFilter());
  }
  filterEstates(filter: EstateFilterModel) {
    return this.http.post( 'http://' + this.authServive.backendURL + '/fa17g17/estatesearch/filter', filter.toJsonAdditionalFilter());
  }
  getEstateByUser() {
    return this.http.post( 'http://' + this.authServive.backendURL + '/fa17g17/estatehandling/render/offers', {"userID": this.authServive.getUserInfo().id});
  }
  getEstateById(estateId) {
    return this.http.post( 'http://' + this.authServive.backendURL + '/fa17g17/estatesearch/profile', {"immoID": estateId});
  }
  sendMessage(msg: MessageModel): Observable<any> {
    return this.http.post('http://' + this.authServive.backendURL + '/fa17g17/messaging/send', msg.toJson())
  }
  getMessages(filter: string, singleFilter: string) {
    return this.http.post('http://' + this.authServive.backendURL + '/fa17g17/messaging/render', {
       "UserId": + this.authServive.getUserInfo().id,
       "FilterType": filter,
       "SingleFilter": singleFilter,
       "FilterDate": 'DSC' })
  }
  // Nicht sicher ob das Überhaupt funktioniert
  deleteMessage() {}
}
