import { VenueService } from './../../services/venue.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../../models/venue';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  venues: Venue[] = [];

  constructor(private _venueService: VenueService, private _router: Router) {}

  ngOnInit() {
    this.getVenues();
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
    this._venueService
      .get_venues()
      .subscribe(venues => (this.venues = venues.slice(1, 5)));
  }
}
