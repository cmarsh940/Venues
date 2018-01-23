import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../models/user';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable()
export class UserService {
  observedUser = new BehaviorSubject(null);
  currentUser: User = null;
  users: Array<User>;

  constructor(
    private _http: Http,
    private _httpClient: HttpClient,
    private _messageService: MessageService
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

  destroy_user(user) {
    console.log('*** Hit users service');
    return this._http.post('/users/destroy', user)
      .map(data => data.json())
      .toPromise();
  }

  // get_all_users() {
  //   return this._http.get('/all_users')
  //     .map(data => data.json())
  //     .toPromise();
  // }
  get_all_users(): Observable<User[]> {
    return this._httpClient.get<User[]>('/all_users')
      .pipe(
        tap(users => this.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  get_logged_in_user() {
    return this._http.get('/get_logged_in_user')
      .map(data => data.json())
      .toPromise();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this._messageService.add('UserService: ' + message);
  }
}


