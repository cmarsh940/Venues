import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, catchError } from 'rxjs/operators';
import { MessageService } from './messages.service';
import { Venue } from '../models/venue';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

const API_URL = "/venues/";
@Injectable()
export class VenueService {
  constructor(private _messageService: MessageService, private _http: Http) {}

  getVenues(callback) {
    this._http
      .get(API_URL)
      .subscribe(res => callback(res.json()), err => console.error(err));
  }

  createVenue(newVenue: Venue, callback) {
    return this._http.post(API_URL, newVenue).subscribe(
      res => {
        const venue = res.json();
        callback(venue);
      },
      err => console.log(err)
    );
  }

  // post_to_s3(venue: Venue, formData, callback) {
  //   console.log("**** HIT SERVICE", formData);
  //   var URL = API_URL + "upload" + "/" + venue._id;
  //   return this._http.post(URL, formData).subscribe(
  //     res => {
  //       console.log("**** THIS IS THE RESPONSE:", res.json());
  //       // const venue = res.json();
  //       callback(res.json());
  //     },
  //     err => console.log(err)
  //   );
  // }
  post_to_s3(formData, id: string, callback) {
    console.log("**** HIT SERVICE", formData);
    var URL = API_URL + "upload" + "/" + id;
    return this._http.put(URL, formData).subscribe(
      res => {
        // const venue = res.json();
        callback(res.json());
      },
      err => console.log(err)
    );
  }
  post_multiple_to_s3(formData, id: string, callback) {
    console.log("**** HIT SERVICE", formData);
    var URL = API_URL + "upload" + "/" + "multiple" + "/" + id;
    return this._http.put(URL, formData).subscribe(
      res => {
        // const venue = res.json();
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  destroy(id: string, callback) {
    var URL = API_URL + id;
    this._http
      .delete(URL)
      .subscribe(res => callback(res.json()), err => console.log(err));
  }

  showVenue(id: string, callback) {
    var URL = API_URL + id;
    this._http
      .get(URL)
      .subscribe(res => callback(res.json()), err => console.log(err));
  }

  updateVenue(newVenue: Venue, callback) {
    var URL = API_URL + newVenue._id;
    this._http
      .put(URL, newVenue)
      .subscribe(res => callback(res.json()), err => console.log(err));
  }

  getImages(id: string, callback) {
    var URL = API_URL + "images/" + id;
    return this._http.get(URL).subscribe(
      res => {
        console.log("*** SERVICE IMAGE RES:", res);
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
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
    this._messageService.add("VenueService: " + message);
  }
}
