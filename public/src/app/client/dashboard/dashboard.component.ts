import { VenueService } from './../../services/venue.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../../models/venue';
import { Vender } from '../../models/vender';
import { VenderService } from '../../services/vender.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  venues: Venue[] = [];
  venders: Array<Vender>
  value = '';

  constructor(
    private _venueService: VenueService,
    private _venderService: VenderService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getVenues();
    this.getVenders()
  }

  // getVenues() {
  //   this._venueService.get_venues()
  //     .then(data => {
  //       this.venue_list = data;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  getVenues(): void {
    this._venueService.get_venues()
      .subscribe(venues => (this.venues = venues.slice(1, 5)));
  }
  getVenders(): void {
    this._venderService.get_venders()
      .subscribe(venders => (this.venders = venders.slice(0, 5)));
  }
}
