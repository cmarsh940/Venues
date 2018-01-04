import { User } from './../classes/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  observedUser = new BehaviorSubject(null);
  currentUser: User = null;

  constructor(
    private _http: Http
  ) { }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  setCurrentUser(user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  createUser(user) {
    return this._http.post('/users', user)
      .map(data => data.json())
      .toPromise();
  }

  authenticate(user: User, callback) {
    this._http.post('/login', user).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  session(callback) {
    this._http.get('/session').subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  updateUser(user) {
    this.observedUser.next(user)
  }

  getUsers() {
    console.log(" Service get users service")
    return this._http.get('/get_users')
      .map(data => data.json())
      .toPromise()
  }

  logout(callback) {
    this._http.delete('/users').subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }
  get_all_users() {
    return this._http.get('/all_users')
      .map(data => data.json())
      .toPromise()
  }

  get_logged_in_user() {
    return this._http.get('/get_logged_in_user')
      .map(data => data.json())
      .toPromise()
  }
}


