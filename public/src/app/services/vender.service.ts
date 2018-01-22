import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, catchError } from 'rxjs/operators';

import { Vender } from './../models/vender';
import { MessageService } from './message.service';

@Injectable()
export class VenderService {
  constructor(
    private _http: Http,
    private _httpClient: HttpClient,
    private _messageService: MessageService
  ) { }

  get_all_venders() {
    return this._http
      .get('/venders')
      .map(data => data.json())
      .toPromise();
  }

  get_venders(): Observable<Vender[]> {
    return this._httpClient.get<Vender[]>('/venders')
      .pipe(
        tap(venders => this.log(`fetched venders`)),
        catchError(this.handleError('getVenders', []))
      );
  }

  post_vender(form_data) {
    return this._http.post('/venders/create', form_data)
      .map(data => data.json())
      .toPromise();
  }

  // post_to_s3(form_data) {
  //   return this._http
  //     .post('/venders/upload', form_data)
  //     .map(data => data.json())
  //     .toPromise();
  // }

  destroy_vender(vender) {
    console.log('*** Hit venders service');
    return this._http.post('/venders/destroy', vender)
      .map(data => data.json())
      .toPromise();
  }

  update_vender(vender) {
    return this._http
      .post('/venders/update', vender)
      .map(data => data.json())
      .toPromise();
  }

  get_one(vender_id) {
    console.log('vender_id from service', vender_id);
    return this._http.post('/venders/id', { vender_id: vender_id })
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
    this._messageService.add('VenderService: ' + message);
  }
}
