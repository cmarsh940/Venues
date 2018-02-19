import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MessageService } from './messages.service';
import { Vender } from '../models/vender';

@Injectable()
export class VenderService {
  constructor(private _messageService: MessageService, private _http: Http) {}

  getVenders(callback) {
    this._http
      .get("/venders")
      .subscribe(res => callback(res.json()), err => console.error(err));
  }

  getRandomVender(num: number, callback) {
    this._http
      .get(`/venders/random/${num}`)
      .subscribe(res => callback(res.json()), err => console.error(err));
  }

  createVender(newVenue: Vender, callback) {
    return this._http.post("/venders", newVenue).subscribe(
      res => {
        const vender = res.json();
        callback(vender);
      },
      err => console.log(err)
    );
  }

  post_to_s3(form_data, callback) {
    console.log("**** HIT SERVICE", form_data);
    return this._http.post("/venders/upload", form_data).subscribe(
      res => {
        callback(res.json());
      },
      err => console.log(err)
    );
  }

  destroy(id: string, callback) {
    this._http
      .delete(`venders/${id}`)
      .subscribe(res => callback(res.json()), err => console.log(err));
  }

  showVender(id: string, callback) {
    this._http
      .get(`venders/${id}`)
      .subscribe(res => callback(res.json()), err => console.log(err));
  }

  updateVender(newVender: Vender, callback) {
    this._http
      .put(`venders/${newVender._id}`, newVender)
      .subscribe(res => callback(res.json()), err => console.log(err));
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
    this._messageService.add("VenderService: " + message);
  }
}
