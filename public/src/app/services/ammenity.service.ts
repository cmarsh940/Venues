import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs';

@Injectable()
export class AmmenityService {
  constructor(private _http: Http) {}

  get_ammenities() {
    return this._http.get("/ammenities")
      .map(data => data.json())
      .toPromise();
  }

  post_ammenity(form_data) {
    console.log("*** Hit ammenity post in service");
    return this._http.post("/ammenities/add", form_data)
      .map(data => data.json())
      .toPromise();
  }

  destroy_ammenity(ammenity) {
    console.log("*** Hit ammenity destroy in service");
    return this._http.post("/ammenities/destroy", ammenity)
      .map(data => data.json())
      .toPromise();
  }

  update_ammenity(ammenity) {
    return this._http.post("/ammenities/update", ammenity)
      .map(data => data.json())
      .toPromise();
  }

  get_one(ammenity_id) {
    console.log("ammenity_id from service", ammenity_id);
    return this._http.post("/ammenities/id", { ammenity_id: ammenity_id })
      .map(data => data.json())
      .toPromise();
  }
}
