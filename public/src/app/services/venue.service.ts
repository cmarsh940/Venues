import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MessageService } from './messages.service';
import { Venue } from '../models/venue';

@Injectable()
export class VenueService {

  constructor(
    private _messageService: MessageService,
    private _http: Http
  ) { }

  getVenues(callback) {
    this._http.get('/venues').subscribe(
      res => callback(res.json()),
      err => console.error(err)
    );
  }

  createVenue(newVenue: Venue, callback) {
    return this._http.post('/upload', newVenue).subscribe(
      res => {
        const venue = res.json();
        callback(venue);
      },
      err => console.log(err)
    );
  }

  destroy(id: string, callback) {
    this._http.delete(`venues/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  showVenue(id: string, callback) {
    this._http.get(`venues/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  getImages(id: string, callback) {
    this._http.get(`venues/${id}/images`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  updateVenue(newVenue: Venue, callback) {
    this._http.put(`venues/${newVenue._id}`, newVenue).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }
  

}
