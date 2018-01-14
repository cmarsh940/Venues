import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VenueService } from '../../services/venue.service';
import { MatSidenav } from '@angular/material';
import { Venue } from '../../models/venue';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-venue-search',
  templateUrl: './venue-search.component.html',
  styleUrls: ['./venue-search.component.css']
})
export class VenueSearchComponent implements OnInit {
  venue_list: Array<Venue>;
  venues: Venue[] = [];
  currentVenue = [];

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private _venueService: VenueService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getVenues();
  }

  // getVenues(): void {
    // this._venueService.get_venues().subscribe(
      // venues => (this.venues = venues)
      // venues => (this.venues = venues.slice(1, 5)
    // );
  // }

  getVenues() {
    this._venueService.get_all_venues()
      .then(data => {
        this.venue_list = data;
      })
      .catch((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  }

  showVenue(venue) {
    this.currentVenue = venue;
    this.sidenav.open();
  }
}
