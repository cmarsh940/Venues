import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { Ammenity } from "./../models/ammenity";

import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

@Injectable()
export class AmmenityService {
  constructor(
    private _http: Http,
    private _httpClient: HttpClient,
    private _messageService: MessageService
  ) {}

  get_ammenities(): Observable<Ammenity[]> {
    return this._httpClient
      .get<Ammenity[]>("/ammenities")
      .pipe(
        tap(ammenities => this.log(`fetched ammenities`)),
        catchError(this.handleError("getAmmenities", []))
      );
  }
  // get_ammenities() {
  //   return this._http.get("/ammenities")
  //     .map(data => data.json())
  //     .toPromise();
  // }

  post_ammenity(ammenity: Ammenity): Observable<Ammenity> {
    return this._httpClient
      .post<Ammenity>("/ammenities/add", ammenity)
      .pipe(
        tap((ammenity: Ammenity) =>
          this.log(`added ammenity w/ id=${ammenity._id}`)
        ),
        catchError(this.handleError<Ammenity>("addAmmenity"))
      );
  }

  // post_ammenity(form_data) {
  //   console.log("*** Hit ammenity post in service");
  //   return this._http
  //     .post("/ammenities/add", form_data)
  //     .map(data => data.json())
  //     .toPromise();
  // }

  // post_ammenity(form_data: Ammenity, callback) {
  //   this._http.post("/ammenities/add", form_data).subscribe(
  //     res => callback(res.json()),
  //     err => console.error(err)
  //   );
  // }

  // delete_ammenity(ammenity: Ammenity | number): Observable<Ammenity> {
  //   const id = typeof ammenity === "number" ? ammenity : ammenity._id;

  //   return this._httpClient.delete<Ammenity>("/ammenities/destroy")
  //     .pipe(
  //       tap(_ => this.log(`deleted ammenity id=${id}`)),
  //       catchError(this.handleError<Ammenity>("deleteAmmenity"))
  //     );
  // }
  destroy_ammenity(ammenity) {
    console.log("*** Hit ammenity destroy in service");
    return this._http
      .post("/ammenities/destroy", ammenity)
      .map(data => data.json())
      .toPromise();
  }

  update_ammenity(ammenity) {
    return this._http
      .post("/ammenities/update", ammenity)
      .map(data => data.json())
      .toPromise();
  }

  get_one(ammenity_id) {
    console.log("ammenity_id from service", ammenity_id);
    return this._http
      .post("/ammenities/id", { ammenity_id: ammenity_id })
      .map(data => data.json())
      .toPromise();
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this._messageService.add("AmmenityService: " + message);
  }
}
