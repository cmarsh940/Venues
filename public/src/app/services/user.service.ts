import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../models/user';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {
  observedUser = new BehaviorSubject(null);
  currentUser: User = null;

  constructor(
    private _http: Http,
    private _httpClient: HttpClient,
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
    this.observedUser.next(user);
  }

  getUsers() {
    console.log("Service get users service");
    return this._http.get('/get_users')
      .map(data => data.json())
      .toPromise();
  }

  logout(callback) {
    this._http.delete('/users').subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }
  // get_all_users() {
  //   return this._http.get('/all_users')
  //     .map(data => data.json())
  //     .toPromise();
  // }

  get_all_users(): Observable<User[]> {
    return this._httpClient.get<User[]>('/all_users')
      .pipe(
        tap(ammenities => this.log(`fetched ammenities`)),
        catchError(this.handleError('getAmmenities', []))
      );
  }

  get_logged_in_user() {
    return this._http.get('/get_logged_in_user')
      .map(data => data.json())
      .toPromise();
  }
}


