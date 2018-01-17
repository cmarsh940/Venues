import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, catchError } from 'rxjs/operators';

import { Venue } from './../models/venue';
import { MessageService } from './message.service';

@Injectable()
export class VenueService {
  constructor(
    private _http: Http,
    private _httpClient: HttpClient,
    private _messageService: MessageService
  ) {}

  get_all_venues() {
    return this._http
      .get('/venues')
      .map(data => data.json())
      .toPromise();
  }

  get_venues(): Observable<Venue[]> {
    return this._httpClient
      .get<Venue[]>('/venues')
      .pipe(
        tap(venues => this.log(`fetched venues`)),
        catchError(this.handleError('getVenues', []))
      );
  }

  post_venue(form_data) {
    return this._http
      .post('/venues/create', form_data)
      .map(data => data.json())
      .toPromise();
  }
  // post_to_s3(form_data) {
  //   return this._http
  //     .post('/venues/upload', form_data)
  //     .map(data => data.json())
  //     .toPromise();
  // }

  destroy_venue(venue) {
    console.log('*** Hit venues service');
    return this._http
      .post('/venues/destroy', venue)
      .map(data => data.json())
      .toPromise();
  }

  update_venue(venue) {
    return this._http
      .post('/venues/update', venue)
      .map(data => data.json())
      .toPromise();
  }

  // get_venue<Data>(id: number): Observable<Venue> {
  //   return this._httpClient
  //     .get<Venue[]>('/venues/id', { Data })
  //     .pipe(
  //       map(venues => venues[0]), // returns a {0|1} element array
  //       tap(v => {
  //         const outcome = v ? `fetched` : `did not find`;
  //         this.log(`${outcome} venue id=${id}`);
  //       }),
  //       catchError(this.handleError<Venue>(`getVenue id=${id}`))
  //     );
  // }

  get_one(venue_id) {
    console.log('venue_id from service', venue_id);
    return this._http
      .post('/venues/id', { venue_id: venue_id })
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this._messageService.add('VenueService: ' + message);
  }
}
