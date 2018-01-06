import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class VenueService {

  constructor(private _http: Http) { }

  get_venues() {
    return this._http.get('/venues')
      .map(data => data.json())
      .toPromise()
  }

  post_venue(form_data) {
    return this._http.post("/venues/add", form_data)
      .map(data => data.json())
      .toPromise()
  }
  destroy_venue(venue) {
    console.log("*** Hit venues service")
    return this._http.post('/venues/destroy', venue)
      .map(data => data.json())
      .toPromise()
  }

  update_venue(venue) {
    return this._http.post('/venues/update', venue)
      .map(data => data.json())
      .toPromise()
  }

  get_one(venue_id) {
    console.log("venue_id from service", venue_id)
    return this._http.post('/venues/id', { venue_id: venue_id })
      .map(data => data.json())
      .toPromise()
  }

}
