import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core/directives/map';
import { google } from '@agm/core/services/google-maps-types';
import { Venue } from '../../models/venue';
import { VenueService } from '../../services/venue.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  public venues: Venue[];
  public currentVenue: Venue;

  // google maps zoom level
  public zoom: number = 8;

  constructor(
    private _venueService: VenueService
  ) { }

  ngOnInit() {
    // this.getUserLocation();
    this.getVenuesLocation();
  }

  getVenuesLocation() {
    this._venueService.get_all_venues()
      .then(data  => {
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

  // private getUserLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //     });
  //   }
  // }

  

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}