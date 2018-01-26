import { Component, OnInit } from '@angular/core';
import { AgmMap } from '@agm/core/directives/map';
import { google } from '@agm/core/services/google-maps-types';

import { VenueService } from '../../services/venue.service';
import { VenderService } from './../../services/vender.service';
import { Venue } from '../../models/venue';
import { Vender } from '../../models/vender';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  venders: Array<Vender>;
  venues: Array<Venue>;

  zoom: number = 8;
  latitude: number;
  longitude: number;

  constructor(
    private _venderService: VenderService,
    private _venueService: VenueService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getVenues();
    this.getVenders();
  }

  getVenders(): void {
    this._venderService.getVenders((venders) => this.venders = venders);
  }

  getVenues(): void {
    this._venueService.getVenues((venues) => this.venues = venues)
  }
}


interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}