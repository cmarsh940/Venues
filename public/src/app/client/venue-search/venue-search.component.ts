import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VenueService } from '../../services/venue.service';
import { MatSidenav } from '@angular/material';
import { Venue } from '../../models/venue';

@Component({
  selector: "app-venue-search",
  templateUrl: "./venue-search.component.html",
  styleUrls: ["./venue-search.component.css"]
})
export class VenueSearchComponent implements OnInit {
  venue_list: Array<Venue>;
  currentVenue = []

  @ViewChild('sidenav') sidenav: MatSidenav

  constructor(
    private _venueService: VenueService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getVenues();
  }

  getVenues() {
    this._venueService
      .get_venues()
      .then(data => {
        this.venue_list = data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  showVenue(venue) {
    this.currentVenue = venue;
    this.sidenav.open();
  }
}
