import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { VenueService } from '../../services/venue.service';
import { MatSidenav } from '@angular/material';
import { Venue } from '../../models/venue';
import { HttpErrorResponse } from '@angular/common/http';
import { AgmMap } from '@agm/core/directives/map';
import { google } from '@agm/core/services/google-maps-types';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-venue-search',
  templateUrl: './venue-search.component.html',
  styleUrls: ['./venue-search.component.css']
})
export class VenueSearchComponent implements OnInit {
  venue$: Observable<Venue[]>;
  venue_list: Array<Venue>;
  // venues: Venue[] = [];
  venues: Venue[];
  currentVenue: Venue[] = [];

  private searchTerms = new Subject<string>();
  zoom: number = 8;

  @Input() venue: Venue;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private _venueService: VenueService,
    private _router: Router
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.getVenues();
  }

  getVenues() {
    this._venueService.get_all_venues()
      .then(data => {
        this.venues = data;
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

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}