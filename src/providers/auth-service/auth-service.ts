import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User {
  username: string;
  email: string;
  id: number;
  role: number;

  constructor(name: string, email: string, id: number, role: number) {
    this.username = name;
    this.email = email;
    this.id = id;
    this.role = role;
  }
}

@Injectable()
export class AuthServiceProvider {
  private currentUser: User;
  // local
  // public backendURL = 'localhost:17017';
  // server
  // public Domain : mpfa17.de
  public backendURL = '79.143.180.221:80';
  public userInfo: any;
  constructor(
    private http: HttpClient
  ) {}

  public login(credentials, callback) {
    if(credentials.email === null || credentials.password === null) {
      this.currentUser = {username: '', email: '', id: 0, role: 1};
      callback(false);
    } else {
      // worked
      this.http.post('http://' + this.backendURL + '/fa17g17/user/login', {
         user: credentials.email, password: credentials.password}).subscribe(
          (response: any) => {
            if(response.login === "true") {
              this.currentUser = new User(
                response.UserID.user,
                response.UserID.user,
                response.UserID.id,
                response.UserID.role);
              // console.log(this.currentUser);
              callback(true);
            } else {
              callback(false);
            }
          },
        (error) => {
            callback(false);
        });
      // this.currentUser = {username: credentials.email, email: credentials.email};
      // callback(true);
    }
  }

  public register(registerInfos, callback) {
    this.http.post('http://' + this.backendURL + '/fa17g17/user/registration', {
      firstName: registerInfos.firstName,
      lastName: registerInfos.lastName,
      email: registerInfos.email,
      password: registerInfos.password,
      passwordRepeat: registerInfos.passwordRepeat,
      street: registerInfos.street,
      city: registerInfos.city,
      postalcode: registerInfos.postalcode,
      country: registerInfos.country}).subscribe(
      (response: any) => {
        // console.log(response);
        callback(response.created === 'true'? true : false);
      },
      (error) => {
        callback(false);
      });
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    // Say What?
  }

}
