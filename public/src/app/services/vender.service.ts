import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MessageService } from './messages.service';
import { Vender } from '../models/vender';

@Injectable()
export class VenderService {

  constructor(
    private _messageService: MessageService,
    private _http: Http
  ) { }

  getVenders(callback) {
    this._http.get('/venders').subscribe(
      res => callback(res.json()),
      err => console.error(err)
    );
  }

  getRandomVender(num: number, callback) {
    this._http.get(`/venders/random/${num}`).subscribe(
      res => callback(res.json()),
      err => console.error(err)
    );
  }

  createVender(newVenue: Vender, callback) {
    return this._http.post('/venders', newVenue).subscribe(
      res => {
        const vender = res.json();
        callback(vender);
      },
      err => console.log(err)
    );
  }

  destroy(id: string, callback) {
    this._http.delete(`venders/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  showVender(id: string, callback) {
    this._http.get(`venders/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }

  updateVender(newVender: Vender, callback) {
    this._http.put(`venders/${newVender._id}`, newVender).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }
}
